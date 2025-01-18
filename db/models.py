from django.db import models

class Storm(models.Model):
    storm_id = models.AutoField(primary_key=True)  # Auto-increment ID
    mars_year = models.IntegerField()  # Integer, NOT NULL
    sol = models.CharField(max_length=3)  # String with max length of 3
    mission_subphase = models.CharField(max_length=255)  # String with max length of 255
    solar_longitude_ls = models.DecimalField(max_digits=14, decimal_places=6)  # Decimal with precision 14, scale 6
    centroid_longitude = models.DecimalField(max_digits=14, decimal_places=6)
    centroid_latitude = models.DecimalField(max_digits=14, decimal_places=6)
    area = models.DecimalField(max_digits=14, decimal_places=6)
    member_id = models.CharField(max_length=255)
    sequence_id = models.CharField(max_length=20, null=True, blank=True)  # Nullable field
    max_latitude = models.DecimalField(max_digits=14, decimal_places=6)
    min_latitude = models.DecimalField(max_digits=14, decimal_places=6)

    def __str__(self):
        return f"Storm {self.storm_id} - Year {self.mars_year}"


class Speciality(models.Model):
    speciality_id = models.AutoField(primary_key=True)  # Auto-increment field
    name = models.CharField(max_length=255)  # Name, NOT NULL

    def __str__(self):
        return self.name


class Staff(models.Model):
    staff_id = models.AutoField(primary_key=True)  # Auto-increment field
    name = models.CharField(max_length=255)  # Staff name, NOT NULL
    surname = models.CharField(max_length=255)  # Surname, NOT NULL
    speciality = models.OneToOneField('Speciality', on_delete=models.CASCADE)  # ForeignKey to Specialities
    traits = models.CharField(max_length=255)  # Traits, NOT NULL

    def __str__(self):
        return f"{self.name} {self.surname}"


class ConservationSchedule(models.Model):
    task_id = models.AutoField(primary_key=True)  # Auto-increment field
    staff = models.OneToOneField('Staff', on_delete=models.CASCADE)  # ForeignKey to Staff
    start_time = models.DateTimeField()  # Start timestamp, NOT NULL
    end_time = models.DateTimeField()  # End timestamp, NOT NULL

    def __str__(self):
        return f"Task {self.task_id} - Staff {self.staff.name}"


class Part(models.Model):
    part_id = models.AutoField(primary_key=True)  # Primary key
    installation = models.OneToOneField('Installation', on_delete=models.CASCADE)
    name = models.TextField(max_length=255)

    def __str__(self):
        return f"Part {self.part_id}"


class Installation(models.Model):
    installation_id = models.AutoField(primary_key=True)  # Placeholder for "Installation_Obj"
    sector_id = models.OneToOneField('Sector', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.installation_id
    

class Sector(models.Model):
    sector_id = models.AutoField(primary_key=True)
    max_latitude = models.IntegerField()
    min_latitude = models.IntegerField()
    max_longitude = models.IntegerField()
    min_longitude = models.IntegerField()

    def __str__(self):
        return self.sector_id


class PartsUsage(models.Model):
    part_usage_id = models.AutoField(primary_key=True)
    installation = models.OneToOneField('Installation', on_delete=models.CASCADE)  # Foreign key to Installation
    part = models.OneToOneField('Part', on_delete=models.CASCADE)  # Foreign key to PartsInternalCode

    def __str__(self):
        return f"Usage: Installation {self.installation} - Part {self.part}"


class Damage(models.Model):
    damage_id = models.AutoField(primary_key=True)
    part = models.OneToOneField('Part', on_delete=models.CASCADE)  # Foreign key to PartsInternalCode
    presumpted_or_reported = models.BooleanField()  # Converted from NUMBER(1)
    queued_task = models.OneToOneField('ConservationSchedule', null=True, blank=True, on_delete=models.SET_NULL)
    cause_id = models.OneToOneField('Storm', null=True, blank=True, on_delete=models.SET_NULL)
    severity = models.IntegerField()  # Severity level, NOT NULL

    def __str__(self):
        return f"Damaged Part {self.part} - Severity {self.severity}"