from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Renderowanie strony głównej
    path('admin.html', views.admin_dashboard, name='admin_dashboard'),  # Strona administracyjna
]