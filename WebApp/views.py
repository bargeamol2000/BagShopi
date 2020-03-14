from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
   return render(request, "index.html", {})

def account(request):
   return render(request, "account.html", {"userid" : str(request.session.items())})