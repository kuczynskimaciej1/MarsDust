from django.shortcuts import render
from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework import status
from services.auth_service import login_user, logout_user, register_user
from services.sector_service import *
from api.serializers import UserSerializer
from db.models import Sector
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
from services.sector_service import *

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
        
        
        

@login_required
def sector_details(request, sector_id):
    try:
        data = get_sector_info(sector_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono sektora."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@login_required
def storm_details(request, storm_id):
    try:
        data = get_storm_info(storm_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono burzy."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
def speciality_details(request, speciality_id):
    try:
        data = get_speciality_info(speciality_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono specjalności."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@login_required
def staff_details(request, staff_id):
    try:
        data = get_staff_info(staff_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono pracownika."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@login_required
def conservation_schedule_details(request, task_id):
    try:
        data = get_conservationschedule_info(task_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono naprawy."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@login_required
def part_details(request, part_id):
    try:
        data = get_part_info(part_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono części."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@login_required
def installation_details(request, installation_id):
    try:
        data = get_installation_info(installation_id)
        print(data)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono instalacji."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@login_required
def part_usage_details(request, part_usage_id):
    try:
        data = get_partsusage_info(part_usage_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono użycia części."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@login_required
def damage_details(request, damage_id):
    try:
        data = get_damage_info(damage_id)
        if data:
            return JsonResponse(data)  # Zwracanie szczegółów w formacie JSON
        else:
            return JsonResponse({"error": "Nie znaleziono uszkodzenia."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)