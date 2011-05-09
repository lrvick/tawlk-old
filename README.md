# Tawlk #
  
  <http://github.com/lrvick/tawlk>

## About ##

   A flexible framework for searching, collecting, archiving, 
   interpreting, and responding to public social media, with a
   scalable web interface.

   To learn more about the overall concept check out: 
   
   Vision and Direction 
    - <https://github.com/lrvick/tawlk/wiki/Vision-and-direction>

   To learn more about what is under the hood so far take a
   look at the breakdown of the libraries:
   
   Tawlk Foundation Libraries (TFL) 
    - <https://github.com/lrvick/tawlk/wiki/Tawlk-Foundation-Libraries-(TFL)>

## Current Features ##
 
  * Ability to watch/store public mentions of a given keyword across many 
    major social media sites.
  * Format all data into the Unified Social Media Format (USMF) 
    - <https://github.com/lrvick/tawlk/wiki/Unified-Social-Media-Format-%28USMF%29>
  * Other stuff!

## Usage / Installation ##

  There are many different "recipes" to get Tawlk going depending on your needs.

  Links to some of the most common configurations are detailed below:

* Local Developer - <https://github.com/lrvick/tawlk/wiki/Local-developer>
    * Intended for people just wanting the shortest path to seeing the 
      stack work on a local system, even if speed is less than ideal.
      Perfect for pulling the repo down and having what you need to 
      implement and test some new changes.

* Single Server - <https://github.com/lrvick/tawlk/wiki/Single-server>
    * For those wanting to run the stack as a dedicated service on a 
      single server. This is ideal for projects that will require Tawlk 
      stack to be able to run reliably for long periods of time.
      If you are only granting the general public access to data on a 
      small set of pre-defined terms, or are only going to be using Tawlk 
      internally, then this setup should take a moderate beating.

* Cloud Controller - <https://github.com/lrvick/tawlk/wiki/Cloud-controller>
    * If you intend to use tawlk in a way that you expect large amounts 
      of web traffic then a cloud setup might be in order.
      This will get you set up with a master server capable of creating
      and managing cloud instances to deal with a large amount of 
      users/simultaneous search terms.

* Cloud Instance - <https://github.com/lrvick/tawlk/wiki/Cloud-instance>
    * The setup one should have to do nothing but collect and save data, and 
      accept instructions from a "Cloud Contoller"
  
## Notes ##
    
  Use at your own risk. You may be eaten by a grue.

  Questions/Comments? Please check us out on IRC via <irc://udderweb.com/#uw>

  If you are a developer and want to help please have a peek at our Todo 
  - <https://github.com/lrvick/tawlk/wiki/Todo>

  Also, for more insight into design decisions and the related material we 
  are reading as well as competing solutions, take a look at our 
  Research Resources - <https://github.com/lrvick/tawlk/wiki/Research-resources>
