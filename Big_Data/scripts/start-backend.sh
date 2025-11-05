#!/bin/bash

# Start Django backend development server
echo "Starting Django backend server..."
cd backend

# Create static directory if it doesn't exist
mkdir -p static

# Run database migrations
echo "Running database migrations..."
python manage.py migrate

# Create superuser if it doesn't exist
echo "Creating superuser (if not exists)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"

# Start development server
echo "Starting Django development server on http://localhost:8000"
python manage.py runserver 0.0.0.0:8000