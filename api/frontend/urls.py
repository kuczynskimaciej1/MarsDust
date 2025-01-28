from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name='home'),
  path('admin.html', views.admin_dashboard, name='admin_dashboard'),
  path('gallery.html', views.gallery, name='gallery'),
  path('info.html', views.information, name='information'),
  path('api/login/', views.LoginView.as_view(), name='api_login'),
  path('api/logout/', views.LogoutView.as_view(), name='api_logout'),
  path('api/register/', views.RegisterAPIView.as_view(), name='register'),
  path('api/storms/<int:storm_id>/', views.storm_details, name='storm_details'),
  path('api/sectors/<int:sector_id>/', views.sector_details, name='sector_details'),
  path('api/specialities/<int:speciality_id>/', views.speciality_details, name='speciality_details'),
  path('api/staff/<int:staff_id>/', views.staff_details, name='staff_details'),
  path('api/conservation_schedules/<int:task_id>/', views.conservation_schedule_details, name='conservation_schedule_details'),
  path('api/parts/<int:part_id>/', views.part_details, name='part_details'),
  path('api/installations/<int:installation_id>/', views.installation_details, name='installation_details'),
  path('api/parts_usages/<int:part_usage_id>/', views.part_usage_details, name='part_usage_details'),
  path('api/damages/<int:damage_id>/', views.damage_details, name='damage_details')
]