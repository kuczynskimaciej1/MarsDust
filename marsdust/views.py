from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
import requests
from django.http import JsonResponse

NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"
NASA_API_KEY = "F4WTU9mu2ockzIfqcBwCKWkYdsh2pPawwDDLTghJ"


def user_login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('dashboard')
        else:
            return render(request, 'login.html', {'form': form, 'error': 'Invalid credentials'})

    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

@login_required
def dashboard(request):
    if request.user.user_type == 'admin':
        return render(request, 'admin_dashboard.html')
    return render(request, 'standard_dashboard.html')

@login_required
def mars_rover_photos(request):
    sol = request.GET.get('sol', 1000)
    params = {
        'sol': sol,
        'api_key': NASA_API_KEY
    }
    response = requests.get(NASA_API_URL, params=params)

    if response.status_code == 200:
        return JsonResponse(response.json())
    else:
        return JsonResponse({'error': 'Unable to fetch data from NASA API'}, status=response.status_code)