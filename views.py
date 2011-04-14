from django.http import HttpResponse, Http404
from django.conf import settings
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from kral.views import *

def index(request,mode='default',query='default'):
    try:
        query = request.REQUEST['query']
        add_query_result = add_query(query)
    except:
        query = query
    query = query.replace(' ','_')
    queries = fetch_queries()
    all_queries = {}
    for this_query in queries[:5]:
        all_queries[this_query] = this_query.replace('_',' ')
    print(query,mode)
    if mode == 'grid':
        template = 'grid.html'
    else:
        template = 'index.html'
    return render_to_response(template, {
        "site_name": settings.SITE_NAME,
        "orbited_server": settings.ORBITED_SERVER,
        "orbited_port": settings.ORBITED_PORT,
        "orbited_stomp_port": settings.ORBITED_STOMP_PORT,
        "all_queries": all_queries,
        "query": query,
        "csrf_token": get_token(request),
    })
