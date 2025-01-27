from db.models import Storm, Speciality, Staff, ConservationSchedule, Part, Installation, Sector, PartsUsage, Damage

def get_storm_info(id):
    if Storm:
        return Storm.objects.get(storm_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_speciality_info(id):
    if Speciality:
        return Speciality.objects.get(speciality_id=id)
    else:
        print("Nie znaleziono bazy danych.")

def get_staff_info(id):
    if Staff:
        return Staff.objects.get(staff_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_conservationschedule_info(id):
    if ConservationSchedule:
        return ConservationSchedule.objects.get(task_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_part_info(id):
    if Part:
        return Part.objects.get(part_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_installation_info(id):
    if Installation:
        return Installation.objects.get(installation_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_sector_info(id):
    if Sector:
        return Sector.objects.get(sector_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_partsusage_info(id):
    if PartsUsage:
        return PartsUsage.objects.get(part_usage_id=id)
    else:
        print("Nie znaleziono bazy danych.")
        
def get_damage_info(id):
    if Damage:
        return Damage.objects.get(damage_id=id)
    else:
        print("Nie znaleziono bazy danych.")