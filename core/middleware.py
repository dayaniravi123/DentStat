from django.conf import settings


class GoogleAnalyticsMiddleware:
    """Inject the GA4 tag into public HTML responses."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        measurement_id = getattr(settings, 'GA_MEASUREMENT_ID', '').strip()
        if not measurement_id:
            return response

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

        if '</head>' not in content or 'googletagmanager.com/gtag/js' in content:
            return response

        snippet = (
            '\n    <!-- Google Analytics 4 -->\n'
            f'    <script async src="https://www.googletagmanager.com/gtag/js?id={measurement_id}"></script>\n'
            '    <script>\n'
            '      window.dataLayer = window.dataLayer || [];\n'
            '      function gtag(){dataLayer.push(arguments);}\n'
            "      gtag('js', new Date());\n"
            f"      gtag('config', '{measurement_id}');\n"
            '    </script>\n'
        )

        response.content = content.replace('</head>', f'{snippet}</head>', 1).encode(charset)
        response.headers.pop('Content-Length', None)
        return response
