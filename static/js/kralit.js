document.domain = document.domain;

function processMsg(msg){
  if (msg['service'] in {'facebook':'', 'twitter':'', 'identica':''}) {
    status_update(msg);
  } else if (msg['service'] in {'youtube':''}) {
    video_update(msg);
  } else if (msg['service'] in {'flickr':''}) {
    picture_update(msg);
  } else if (msg['service'] in {'wordpress':''}) {
    blog_update(msg);
  }
}
function status_update(msg){
  if ($("#microblogs").data("paused") === false){
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\">" + msg["service"] + "</span><img src=\"" + msg['user']['avatar'] + "\"/><p class=\"title\"><a href=\"http://twitter.com/#!/" + msg['user']['name'] + "/status/" + msg['id'] + "\" onclick=\"window.open(this.href);return false;\" >" + msg["text"] + "</a></p><span class=\"statusfooter\">by <a href=\"http://twitter.com/" + msg["user"]['name'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time> </span></li>").hide().prependTo("#microblogs ul").fadeIn('slow');
      if ( $("#microblogs ul > li").size() > 20 ) {
        $('#microblogs li:last').remove();
      }
      $("#microblogs .count").text(parseInt($("#microblogs .count").text()) + 1);
  }
    $('#microblogs li time').cuteTime(); 
}
function blog_update(msg){
  if ($("#blogs").data("paused") === false){
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\">" + msg["service"] + "</span><img src=\"" + msg['user']['avatar'] + "\"/><p class=\"title\"><a href=\"" + msg['source'] + "\" onclick=\"window.open(this.href);return false;\" >" + msg["text"] + "</a></p><p class=\"description\">" + msg["description"] + "</p><span class=\"statusfooter\">by <a href=\"" + msg["user"]['profile'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time> </span></li>").hide().prependTo("#blogs ul").fadeIn('slow');
      if ( $("#blogs ul > li").size() > 20 ) {
        $('#blogs li:last').remove();
      }
      $("#blogs .count").text(parseInt($("#blogs .count").text()) + 1);
    $('#blogs li time').cuteTime(); 
  }
}
function video_update(msg){
  if ($("#videos").data("paused") === false){
    var vn = Math.floor(Math.random()*2);
    $("<li class=\"" + msg["service"] + "\" style=\"background:url('"  + msg['thumbnail']  +  "') center no-repeat\"><a title=\"" + msg['text']  + "\" href=\"http://youtube.com/watch?v=" + msg["id"] + "\" onclick=\"window.open(this.href);return false;\" \"><span>" + msg['text'] + "</span></a></li>").hide().prependTo("#videos ul ul:eq(" + vn + ")").fadeIn('slow');
    $("#videos ul ul:eq(" + vn + ") li:last").remove();
    $("#videos .count").text(parseInt($("#videos .count").text()) + 1);
  }
}
function picture_update(msg){
  if ($("#pictures").data("paused") === false){
    var n = Math.floor(Math.random()*3);
    $("<li class=\"" + msg["service"] + "\" style=\"background:url('"  + msg['thumbnail']  +  "') center\"><a title=\"" + msg['text']  +"\" href=\"http://www.flickr.com/photos/" + msg['user']['id']  +"/" + msg["id"] + "\" onclick=\"window.open(this.href);return false;\"  \"><span>" + msg['text'] + "</span></a></li>").hide().prependTo("#pictures ul ul:eq(" + n +")").fadeIn('slow');
    $("#pictures ul ul:eq(" + n + ") li:last").remove();
    $("#pictures .count").text(parseInt($("#pictures .count").text()) + 1);
  }
}
onload = function() {
    $.each(['flickr','youtube','facebook','twitter','wordpress'], function(i,service){
      $.getJSON("/feeds/" + service +"/" + query + ".json", function(data) {
        $.each(data, function(i,msg){
          processMsg(msg);
        });
      });
    });
    $('time').cuteTime(); 
    $(".container").hover(function(event){
      $.data(this, "paused", event.type === 'mouseenter');
    });
    $("div").data("paused",false);
    function kral_listen(){
        TCPSocket = Orbited.TCPSocket;
        stomp = new STOMPClient();
        stomp.connect('localhost', 61613,"guest","guest");
        stomp.onclose = function(c) {
            console.log("Lost connection, Code:" + c);
        };
        stomp.onerror = function(error) {
            console.log("Error:" + error);
        };
        stomp.onerrorframe = function(frame) {
            console.log("onerrorframe: " + frame.body);
            stomp.reset();
            stomp.subscribe("/exchange/" + query);
        };
        stomp.onconnectedframe = function(){
            stomp.subscribe("/exchange/" + query);
            console.log('Connected');
        };
        stomp.onmessageframe = function(frame){
            msg = JSON.parse(frame.body);
            //console.log(msg)
            processMsg(msg);
        };
    };
    if (query != 'default'){
        kral_listen();
    }
};
