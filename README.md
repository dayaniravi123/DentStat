# Clinic (Django) — Minimal scaffold

This is a minimal Django project scaffold named `clinic` with a single app `core`.

Quick start (macOS / zsh):

1. Create and activate a virtualenv

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Apply migrations and run the development server

```bash
python manage.py migrate
python manage.py runserver
```

Visit http://127.0.0.1:8000 to see the default page.

Notes:
- This project uses SQLite and a simple index view. Change settings for production use.
