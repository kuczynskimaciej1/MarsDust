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
    speciality = models.ForeignKey('Speciality', on_delete=models.CASCADE)  # ForeignKey to Specialities
    traits = models.CharField(max_length=255)  # Traits, NOT NULL

    def __str__(self):
        return f"{self.name} {self.surname}"


class ConservationSchedule(models.Model):
    task_id = models.AutoField(primary_key=True)  # Auto-increment field
    staff = models.ForeignKey('Staff', on_delete=models.CASCADE)  # ForeignKey to Staff
    start_time = models.DateTimeField()  # Start timestamp, NOT NULL
    end_time = models.DateTimeField()  # End timestamp, NOT NULL

    def __str__(self):
        return f"Task {self.task_id} - Staff {self.staff.name}"


class PartsInternalCode(models.Model):
    part_id = models.IntegerField(primary_key=True)  # Primary key
    internal_id = models.IntegerField()  # Internal ID

    def __str__(self):
        return f"Part {self.part_id} - Internal {self.internal_id}"


class PartExternalCode(models.Model):
    part_id = models.AutoField(primary_key=True)  # Auto-increment primary key
    name = models.CharField(max_length=255)  # Name, NOT NULL

    def __str__(self):
        return self.name


class Installation(models.Model):
    installation = models.TextField()  # Placeholder for "Installation_Obj"
    sector_table_varname = models.TextField()  # Placeholder for "Sector_Table"

    def __str__(self):
        return self.installation


class PartsUsage(models.Model):
    installation = models.ForeignKey('Installation', on_delete=models.CASCADE)  # Foreign key to Installation
    part = models.ForeignKey('PartsInternalCode', on_delete=models.CASCADE)  # Foreign key to PartsInternalCode
    internal_id = models.IntegerField()


    class Meta:
        unique_together = ('installation', 'part')  # Composite primary key equivalent

    def __str__(self):
        return f"Usage: Installation {self.installation} - Part {self.part}"


class DamagedPart(models.Model):
    part = models.ForeignKey('PartsInternalCode', on_delete=models.CASCADE)  # Foreign key to PartsInternalCode
    internal_id = models.IntegerField()
    presumpted_or_reported = models.BooleanField()  # Converted from NUMBER(1)
    queued_task = models.ForeignKey('ConservationSchedule', null=True, blank=True, on_delete=models.SET_NULL)
    cause_id = models.CharField(max_length=7, null=True, blank=True)  # Nullable VARCHAR(7)
    severity = models.IntegerField()  # Severity level, NOT NULL

    class Meta:
        unique_together = ('part', 'internal_id')  # Composite primary key equivalent

    def __str__(self):
        return f"Damaged Part {self.part} - Severity {self.severity}"