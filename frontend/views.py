from django.shortcuts import render

def home(request):
    return render(request, 'index.html')  # Strona główna

def admin_dashboard(request):
    # Przykład: sprawdź, czy użytkownik jest zalogowany jako admin
    if request.user.is_authenticated and request.user.username == 'admin':
        return render(request, 'admin.html')  # Strona administratora
    else:
        return render(request, 'index.html')  # Jeśli nie jest adminem, wróć do strony głównej
