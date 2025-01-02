from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login as django_login, logout as django_logout, authenticate as django_authenticate
from django.contrib.auth.models import User
from .models import UserStats

import requests

# Create your views here.

def index(request):
    return render(request, 'index.html')
    
def randtitle(request):
    headers = { 'Content-Type': 'application/json' }

    response = requests.post(
        'https://fish-text.ru/get?type=title&format=json',
        headers=headers)

    if response.status_code == 200:
        data = response.json()
        return HttpResponse(f'<p>{data['text']}</p>')
    
def randtext(request):
    headers = { 'Content-Type': 'application/json' }

    response = requests.post(
        'https://fish-text.ru/get?sentence=sentence&number=10&format=json',
        headers=headers)

    if response.status_code == 200:
        data = response.json()
        words = str(data['text']).split(' ')
        return render(request, 'text-to-type.html', { 'words': words })
    
def results(request):
    return render(request, 'results.html', request.GET)

def login_form(request):
    return render(request, 'login-form.html')

def register_form(request):
    return render(request, 'register-form.html')

def profile(request):
    user_stats = UserStats.objects.filter(user_id=request.user.id).first()

    data = {}

    if user_stats is None:
        data['words'] = 0
        data['mistakes'] = 0
    else:
        data['words'] = user_stats.max_words_typed
        data['mistakes'] = user_stats.mistakes_made

    return render(request, 'profile.html', data)

def login(request):
    login = request.POST['login']
    password = request.POST['password']
    
    print(login)
    print(password)

    user = django_authenticate(username=login, password=password)

    if user is None:
        return JsonResponse({ 'message': "User not found" }, status=404)

    django_login(request, user)        

    return redirect('/')

def logout(request):
    django_logout(request)
    return redirect('/')

def create_user(request):
    login = request.POST['login']
    password = request.POST['password']
    name = request.POST['name']

    user = User.objects.create_user(username=login, email="n/a", password=password, first_name=name)
    return redirect('/')

def leaderboard(request):
    user_stats = UserStats.objects.order_by('-max_words_typed', 'mistakes_made')[:50]
    
    return render(request, 'leaderboard.html', { 'user_stats': user_stats })

def update_user_stats(request):
    if request.user is None:
        return JsonResponse({ 'message': 'Без входа в профиль результаты не сохраняются' }, status=200)

    user_id = request.user.id

    total_words = request.GET['words']
    total_mistakes = request.GET['mistakes']

    user_stats = UserStats.objects.filter(user_id=user_id).first()

    try:
        if user_stats is None:
            user_stats = UserStats.objects.create(
                user_id = request.user.id,
                max_words_typed = total_words,
                mistakes_made = total_mistakes
            )
        elif user_stats.max_words_typed <= total_words:
            user_stats.max_words_typed = total_words
            user_stats.mistakes_made = total_mistakes
            user_stats.save()

        return JsonResponse({ 'message': 'Результаты успешно сохранены.' }, status=200)
    except Exception as e:
        return JsonResponse({ 'message': str(e) }, status=500)