# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('adminmars/', views.admin_dashboard, name='admin_dashboard'), 
    path('', views.home, name='home'),  
]
