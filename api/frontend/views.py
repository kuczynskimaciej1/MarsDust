from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def admin_dashboard(request):
    if request.user.is_authenticated and request.user.username == 'admin':
        return render(request, 'admin.html')
    else:
        return render(request, 'index.html')
    
def gallery(request):
    return render(request, 'gallery.html')

def information(request):
    return render(request, 'information.html')  