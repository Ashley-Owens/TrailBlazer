from django.shortcuts import render, render_to_response

# Create your views here.
def index(request):
    return render_to_response('index.html')

def navigation(request):
    return render_to_response('navigation.html')

def profile(request):
    return render_to_response('profile.html')

def search(request):
    return render_to_response('search.html')

def trails(request):
    return render_to_response('trails.html')
