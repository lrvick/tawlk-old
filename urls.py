from django.conf.urls.defaults import *
from django.conf import settings
import os
from kral.views import *

urlpatterns = patterns('',
  (r'^$', 'django.views.generic.simple.direct_to_template', {'template':'index.html', 'extra_context': {  
        "orbited_server": settings.ORBITED_SERVER,
        "orbited_port": settings.ORBITED_PORT,
        "orbited_stomp_port": settings.ORBITED_STOMP_PORT,
    }}),
  (r'^feeds/(?P<cache_name>\w+).json$', fetch_cache),
  (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': os.path.join(os.path.dirname(__file__), 'static')}),
)

# vim: ai ts=4 sts=4 et sw=4
