from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

import requests

# Create your views here.

def hello(request):
    return render(request, 'index.html')
    
def randtitle(request):
    headers = { 'Content-Type': 'application/json' }

    response = requests.post(
        'https://fish-text.ru/get?type=title&format=json',
        headers=headers)

    if response.status_code == 200:
        data = response.json()
        return HttpResponse(f'<p>{data['text']}</p>')