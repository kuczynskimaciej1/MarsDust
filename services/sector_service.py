from db.models import Storm, Speciality, Staff, ConservationSchedule, Part, Installation, Sector, PartsUsage, Damage

def get_storm_info(id):
    try:
        storm = Storm.objects.get(storm_id=id)
        damage = Damage.objects.filter(cause=storm.storm_id).first()

        return {
            "Centroid latitude": storm.centroid_latitude,
            "Centroid longitude": storm.centroid_longitude,
            "Duration": storm.duration,
            "Mars year": storm.mars_year,
            "Member ID": storm.member_id,
            "Mission subphase": storm.mission_subphase,
            "Power": storm.power,
            "Sol": storm.sol,
            "Spread latitude": storm.spread_latitude,
            "Spread longitude": storm.spread_longitude,
            "Stone damage": storm.stone_damage,
            "Damage": damage.__str__() if damage else "Brak uszkodzeń",
            "Damage ID": damage.damage_id if damage else "Brak uszkodzeń"
        }
    except Storm.DoesNotExist:
        return {"error": "Burza nie istnieje"}
        
        
def get_speciality_info(id):
    try:
        speciality = Speciality.objects.get(speciality_id=id)
        staff = Staff.objects.filter(speciality=speciality.speciality_id).first()

        return {
            "Name": speciality.name,
            "Staff": staff.__str__() if staff else "Brak personelu",
            "Staff ID": staff.staff_id if staff else "Brak personelu"
        }
    except Speciality.DoesNotExist:
        return {"error": "Specjalizacja nie istnieje"}


def get_staff_info(id):
    try:
        staff = Staff.objects.get(staff_id=id)
        conservation_schedule = ConservationSchedule.objects.filter(staff=staff.staff_id).first()

        return {
            "Speciality": staff.speciality.__str__() if staff.speciality else "Brak specjalizacji",
            "Speciality ID": staff.speciality.speciality_id if staff.speciality else "Brak specjalizacji",
            "Name": staff.name,
            "Surname": staff.surname,
            "Traits": staff.traits,
            "Conservation schedule": conservation_schedule.__str__() if conservation_schedule else "Brak napraw",
            "Conservation schedule ID": conservation_schedule.task_id if conservation_schedule else "Brak napraw"
        }
    except Staff.DoesNotExist:
        return {"error": "Osoba nie istnieje"}
        
        
def get_conservationschedule_info(id):
    try:
        conservation_schedule = ConservationSchedule.objects.get(task_id=id)
        damage = Damage.objects.filter(queued_task=conservation_schedule.task_id).first()

        return {
            "Staff": conservation_schedule.staff.__str__() if conservation_schedule.staff else "Brak personelu",
            "Staff ID": conservation_schedule.staff.staff_id if conservation_schedule.staff else "Brak personelu",
            "Start time": conservation_schedule.start_time,
            "End time": conservation_schedule.end_time,
            "Damage": damage.__str__() if damage else "Brak uszkodzeń",
            "Damage ID": damage.damage_id if damage else "Brak uszkodzeń"
        }
    except ConservationSchedule.DoesNotExist:
        return {"error": "Naprawa nie istnieje"}
        
        
def get_part_info(id):
    try:
        part = Part.objects.get(part_id=id)
        part_usage = PartsUsage.objects.filter(part=part).first()
        damage = Damage.objects.filter(part = part).first()

        return {
            "Installation": part.installation.__str__() if part.installation else "Brak instalacji",
            "Installation ID": part.installation.installation_id if part.installation else "Brak instalacji",
            "Name": part.name,
            "Part Usage": part_usage.__str__() if part_usage else "Brak użycia części",
            "Part Usage ID": part_usage.part_usage_id if part_usage else "Brak użycia części",
            "Damage": damage.__str__() if damage else "Brak napraw",
            "Damage ID": damage.damage_id if damage else "Brak napraw"
        }
    except Part.DoesNotExist:
        return {"error": "Część nie istnieje"}
        
        
def get_installation_info(id):
    try:
        installation = Installation.objects.get(installation_id=id)
        part_usage = PartsUsage.objects.filter(installation=installation.installation_id).first()

        return {
            "Sector": installation.sector.__str__() if installation.sector else "Brak sektora",
            "Sector ID": installation.sector.sector_id if installation.sector else "Brak sektora",
            "Name": installation.name,
            "Part usage": part_usage.__str__() if part_usage else "Brak użycia części",
            "Part usage ID": part_usage.part_usage_id if part_usage else "Brak użycia części",
        }
    except Installation.DoesNotExist:
        return {"error": "Instalacja nie istnieje"}
        
        
def get_sector_info(id):
    try:
        sector = Sector.objects.get(sector_id=id)
        installation = Installation.objects.filter(sector=sector).first()

        return {
            "Sector name": sector.name,
            "Description": sector.description,
            "Min latitude": sector.min_latitude,
            "Max latitude": sector.max_latitude,
            "Min longitude": sector.min_longitude,
            "Max longitude": sector.max_longitude,
            "Installation": installation.__str__() if installation else "Brak instalacji",
            "Installation ID": installation.installation_id if installation else "Brak instalacji"
        }
    except Sector.DoesNotExist:
        return {"error": "Sektor nie istnieje"}
        
        
def get_partsusage_info(id):
    try:
        part_usage = PartsUsage.objects.get(part_usage_id=id)

        return {
            "Part": part_usage.part.__str__() if part_usage.part else "Brak części",
            "Part ID": part_usage.part.part_id if part_usage.part else "Brak części",
            "Installation": part_usage.installation.__str__() if part_usage.installation else "Brak instalacji",
            "Installation ID": part_usage.installation.installation_id if part_usage.installation else "Brak instalacji",
        }
    except PartsUsage.DoesNotExist:
        return {"error": "Użycie części nie istnieje"}
        
        
def get_damage_info(id):
    try:
        damage = Damage.objects.get(damage_id=id)

        return {
            "Cause": damage.cause.__str__() if damage.cause else "Brak burzy",
            "Cause ID": damage.cause.storm_id if damage.cause else "Brak burzy",
            "Part": damage.part.__str__() if damage.part else "Brak części",
            "Part ID": damage.part.part_id if damage.part else "Brak części",
            "Queued task": damage.queued_task.__str__() if damage.queued_task else "Brak napraw",
            "Queued task ID": damage.queued_task.task_id if damage.queued_task else "Brak napraw",
            "Presumpted or reported": damage.presumpted_or_reported,
            "Severity": damage.severity
        }
    except Damage.DoesNotExist:
        return {"error": "Uszkodzenie nie istnieje"}