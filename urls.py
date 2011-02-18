import os
from django.conf.urls.defaults import *
from django.conf import settings
from views import *
from kral.views import *

urlpatterns = patterns('',
  (r'^$', index),
  (r'^(?P<query>\w+)$', index),
  (r'^(?P<query>\w+)/(?P<mode>\w+)$', index),
  (r'^feeds/(?P<service>\w+)/(?P<query>\w+).json$', fetch_cache),
  (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': os.path.join(os.path.dirname(__file__), 'static')}),
)

# vim: ai ts=4 sts=4 et sw=4
