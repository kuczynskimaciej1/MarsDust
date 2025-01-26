from django.shortcuts import render
from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework import status
from services.auth_service import login_user, logout_user, register_user
from api.serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
import json

def home(request):
    return render(request, 'index.html')

def admin_dashboard(request):
    if request.user.is_authenticated and request.user.username == 'admin':
        return render(request, 'admin.html')
    else:
        return render(request, 'index.html')

def gallery(request):
    return render(request, 'gallery.html')

def information(request):
    return render(request, 'information.html')

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        """Handle user login via AJAX."""
        data = json.loads(request.body.decode("utf-8"))
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({"message": "Login successful", "username": user.username})
        return JsonResponse({"error": "Invalid credentials"}, status=401)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        """Handle user logout via AJAX."""
        logout(request)
        return JsonResponse({"message": "Logout successful"})


class RegisterAPIView(APIView):
    def post(self, request):
        """Handle user registration."""
        username = request.data.get('username')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        email = request.data.get('email')

        if not username or not password or not confirm_password or not email:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = register_user(username, password, email)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
