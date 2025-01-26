from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def login_user(request, username, password):
    """Authenticate and log in a user."""
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return user
    return None

def logout_user(request):
    """Log out a user."""
    logout(request)

def register_user(username, password, email=None):
    """Register a new user."""
    if not username or not password or not email:
        raise ValueError("Username, password, and email are required.")

    if User.objects.filter(username=username).exists():
        raise ValueError("User with this username already exists")

    if User.objects.filter(email=email).exists():
        raise ValueError("User with this email already exists")

    user = User.objects.create_user(username=username, password=password, email=email)
    return user
