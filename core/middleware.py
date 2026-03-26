from django.conf import settings


class GoogleAnalyticsMiddleware:
    """Inject shared site branding and the GA4 tag into public HTML responses."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.path.startswith('/admin/'):
            return response

        if request.method not in {'GET', 'HEAD'} or response.streaming:
            return response

        content_type = response.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            return response

        try:
            charset = response.charset or 'utf-8'
            content = response.content.decode(charset)
        except Exception:
            return response

        if '</head>' not in content:
            return response

        snippets = []
        static_url = getattr(settings, 'STATIC_URL', '/static/').rstrip('/')
        favicon_url = f'{static_url}/images/dentalstats-logo.svg'
        has_favicon = 'rel="icon"' in content or "rel='icon'" in content

        if not has_favicon:
            snippets.append(
                '\n    <!-- DentalStats Brand Icon -->\n'
                f'    <link rel="icon" type="image/svg+xml" href="{favicon_url}">\n'
                f'    <link rel="shortcut icon" href="{favicon_url}">\n'
                '    <meta name="theme-color" content="#0f766e">\n'
            )

        measurement_id = getattr(settings, 'GA_MEASUREMENT_ID', '').strip()
        if measurement_id and 'googletagmanager.com/gtag/js' not in content:
            snippets.append(
                '\n    <!-- Google Analytics 4 -->\n'
                f'    <script async src="https://www.googletagmanager.com/gtag/js?id={measurement_id}"></script>\n'
                '    <script>\n'
                '      window.dataLayer = window.dataLayer || [];\n'
                '      function gtag(){dataLayer.push(arguments);}\n'
                "      gtag('js', new Date());\n"
                f"      gtag('config', '{measurement_id}');\n"
                '    </script>\n'
            )

        if not snippets:
            return response

        response.content = content.replace('</head>', f'{"".join(snippets)}</head>', 1).encode(charset)
        response.headers.pop('Content-Length', None)
        return response
