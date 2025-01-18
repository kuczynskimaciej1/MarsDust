from django.contrib import admin
from db.models import Sector, Storm, Speciality, Staff, ConservationSchedule, Part, Installation, PartsUsage, Damage

#import os
#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'marsdust.settings')

#import django
#django.setup()

admin.site.register(Storm)
admin.site.register(Sector)
admin.site.register(Speciality)
admin.site.register(Staff)
admin.site.register(ConservationSchedule)
admin.site.register(Part)
admin.site.register(Installation)
admin.site.register(PartsUsage)
admin.site.register(Damage)
