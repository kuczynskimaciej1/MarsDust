from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin.html', views.admin_dashboard, name='admin_dashboard'),
    path('gallery.html', views.gallery, name='gallery'),
    path('info.html', views.information, name='information'),  # Nowa strona
]
