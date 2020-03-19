from django.shortcuts import render
from django.http import HttpResponse
import html


# Create your views here.

# algolia
from algoliasearch.search_client import SearchClient
client = SearchClient.create('FH77JFLH73', 'f0bace7b97eec1efdf4f69f8ac1ceb1e')
algo_index = client.init_index('links')


def index(request):
    res = res = algo_index.search(
        '',
        {
            'filters': 'sponsored=1'
        }
    )
    return render(request, "index.html", {"nbHits": res["nbHits"], "cards": res["hits"]})


def search(request):
    res = algo_index.search(request.GET.get('query'))
    return render(request, "search.html", {"nbHits": res["nbHits"], "cards": res["hits"]})


def account(request):
    return render(request, "account.html", {})

def checkout(request):
    return render(request, "checkout.html", {})

def bag(request):
    res= algo_index.search(
        '',
        {
            'filters': 'sponsored=1'
        }
    )
    obj= algo_index.get_object(str(request.GET.get('id')))
    return render(request, "bag.html", {"nbHits": res["nbHits"], "cards": res["hits"], "obj":obj})
