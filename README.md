# Kralit #

A sample social media search engine, using Kral at its core.


## Starting Kral ##

In order to start collecting data with Kral, you just need to run celery, and celery will do the rest. 

The usual ways of starting celery are as follows.

### Start celery with heartbeat ###

Example:

    ./manage.py celeryd -B --purge

### Start celery with heartbeat verbose output ###

Example:

    ./manage.py celeryd -B --purge --verbosity=2 --loglevel=INFO

To run celery in production we recommend running it as a daemon.

You can read more about this at: http://celeryproject.org/docs/cookbook/daemonizing.html


## Starting Kralit ##

We've been investigating several types of Comet setup to run this efficiently. We'll document using Kralit when we've settled on something.


## Notes ##

This is by no means production-ready code. Do not actually use it in
production unless you wish to be eaten by a grue.

Questions/Comments? Please check us out on IRC via irc://udderweb.com/#uw

http://github.com/UdderWeb/kralit
