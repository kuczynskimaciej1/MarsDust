from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class LoginForm(AuthenticationForm):
    username = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))