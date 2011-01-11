from django.conf.urls.defaults import *
from django.conf import settings

import os.path


urlpatterns = patterns('',
  (r'^$', 'django.views.generic.simple.direct_to_template', {'template':'main.html'}),
  (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': os.path.join(os.path.dirname(__file__), 'static')}),
)

# vim: ai ts=4 sts=4 et sw=4
