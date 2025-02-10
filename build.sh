#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the project base directory
BASE_DIR=$(dirname "$0")

# Navigate to the project base directory
cd "$BASE_DIR"

# Create and activate a virtual environment using Python 3.9.6
python3.9 -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Run tests - when tests are ready
# python manage.py test

# Deactivate the virtual environment
deactivate

echo "Build completed successfully."