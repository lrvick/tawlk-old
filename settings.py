import djcelery,os

djcelery.setup_loader()

PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))

DEBUG = False
TEMPLATE_DEBUG = False

ADMINS = (
    ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'postgresql_psycopg2', 
        'NAME': 'your_db_name',                      
        'USER': 'your_db_user',                     
        'PASSWORD': 'your_pass',          
    }
}

TIME_ZONE = 'America/New_York'

LANGUAGE_CODE = 'en-us'

SITE_ID = 1

USE_I18N = True

MEDIA_ROOT = os.path.join(PROJECT_PATH,'media')

MEDIA_URL = '/media/'

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
)

ROOT_URLCONF = 'urls'

TEMPLATE_DIRS = (
		os.path.join(PROJECT_PATH,'templates'),
)

INSTALLED_APPS = (
    'djcelery',
    'kral',
)

# What Kral plugins to enable
KRAL_PLUGINS = ['Buzz', 'Identica', 'Twitter', 'Facebook', 'Youtube']
# Minimum amount of time queries will get before rotation happens
KRAL_WAIT = 5
# Maximum number of queries to have running simultaneously
KRAL_SLOTS = 2
# Default queries to search
KRAL_QUERIES = ['iphone','apple','google','android','tech']

#Celery settings
CELERY_CACHE_BACKEND = 'memcached://127.0.0.1:11211/'

#AMPQ Server Info
BROKER_HOST = "127.0.0.1"
BROKER_PORT = 5672
BROKER_VHOST = "/"
BROKER_USER = "guest"
BROKER_PASSWORD = "guest"

CELERYBEAT_SCHEDULER="djcelery.schedulers.DatabaseScheduler"

ORBITED_SERVER = "localhost"
ORBITED_PORT = "9000"
ORBITED_STOMP_PORT = "61613"

#DJANGO 1.3
#CACHES = {
#    'default': {
#        #'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
#        'LOCATION': 'ponies_cache',
#    }
#}

#DJANGO 1.2
CACHE_BACKEND = 'memcached://127.0.0.1:11211/'

#Load installation specific settings/passwords from external file with restrictive permissions
execfile(os.path.join(PROJECT_PATH,'.private-settings'))


# vim: ai ts=4 sts=4 et sw=4
