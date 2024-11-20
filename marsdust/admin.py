from django.contrib import admin
from .models import Storm, Speciality, Staff, ConservationSchedule, PartsInternalCode, PartExternalCode, Installation, PartsUsage, DamagedPart

#import os
#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'marsdust.settings')

#import django
#django.setup()

admin.site.register(Storm)
admin.site.register(Speciality)
admin.site.register(Staff)
admin.site.register(ConservationSchedule)
admin.site.register(PartExternalCode)
admin.site.register(PartsInternalCode)
admin.site.register(Installation)
admin.site.register(PartsUsage)
admin.site.register(DamagedPart)
