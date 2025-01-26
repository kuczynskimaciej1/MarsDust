from rest_framework import serializers
from db.models import (
    Storm, Speciality, Staff, ConservationSchedule, 
    Part, Installation, Sector, PartsUsage, Damage
)
from django.contrib.auth.models import User

class StormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storm
        fields = '__all__'

class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()

    class Meta:
        model = Staff
        fields = '__all__'

class ConservationScheduleSerializer(serializers.ModelSerializer):
    staff = StaffSerializer()

    class Meta:
        model = ConservationSchedule
        fields = '__all__'

class PartSerializer(serializers.ModelSerializer):
    installation = serializers.StringRelatedField()

    class Meta:
        model = Part
        fields = '__all__'

class InstallationSerializer(serializers.ModelSerializer):
    sector = serializers.StringRelatedField()

    class Meta:
        model = Installation
        fields = '__all__'

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class PartsUsageSerializer(serializers.ModelSerializer):
    installation = InstallationSerializer()
    part = PartSerializer()

    class Meta:
        model = PartsUsage
        fields = '__all__'

class DamageSerializer(serializers.ModelSerializer):
    part = PartSerializer()
    queued_task = ConservationScheduleSerializer()
    cause = StormSerializer()

    class Meta:
        model = Damage
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']