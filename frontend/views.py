# views.py
from django.shortcuts import render

def home(request):
    return render(request, 'index.html') 

def admin_dashboard(request):
    return render(request, 'admin.html')  
