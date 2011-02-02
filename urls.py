from django.conf.urls.defaults import *
from django.conf import settings
import os
from kral.views import *

queries = fetch_queries()

extra_context = {
    "orbited_server": settings.ORBITED_SERVER,
    "orbited_port": settings.ORBITED_PORT,
    "orbited_stomp_port": settings.ORBITED_STOMP_PORT,
    "all_queries": queries,
}
urlpatterns = patterns('',
  (r'^$', 'django.views.generic.simple.direct_to_template', {'template':'index.html', 'extra_context': extra_context}),
  (r'^(?P<query>\w+)$', 'django.views.generic.simple.direct_to_template', {'template':'index.html', 'extra_context': extra_context}),
  (r'^feeds/(?P<service>\w+)/(?P<query>\w+).json$', fetch_cache),
  (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': os.path.join(os.path.dirname(__file__), 'static')}),
)

# vim: ai ts=4 sts=4 et sw=4
