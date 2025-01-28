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
  path('api/storms/', views.StormView.as_view(), name='storm'),
  path('api/sector/<int:sector_id>/', views.sector_details, name='sector_details'),
  path('api/specialities', views.SpecialityView.as_view(), name='speciality'),
  path('api/staff', views.StaffView.as_view(), name='staff'),
  path('api/conservation_schedules', views.ConservationScheduleView.as_view(), name='conservation_schedule'),
  path('api/parts', views.PartView.as_view(), name='part'),
  path('api/installations', views.InstallationView.as_view(), name='installation'),
  path('api/parts_usages', views.PartsUsageView.as_view(), name='parts_usage'),
  path('api/damages', views.DamageView.as_view(), name='damage')
]