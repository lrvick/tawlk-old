document.domain = document.domain;
TCPSocket = Orbited.TCPSocket;
function status_update(msg){
  if ($("#microblogs").data("paused") === false){
    if (msg["user"]["language"] == 'en'){
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\">" + msg["service"] + "</span><img src=\"" + msg['user']['avatar'] + "\"/><p><a href=\"http://twitter.com/#!/" + msg['user']['name'] + "/status/" + msg['id'] + "\" onclick=\"window.open(this.href);return false;\" >" + msg["text"] + "</a></p><span class=\"statusfooter\">by <a href=\"http://twitter.com/" + msg["user"]['name'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> @ <time>" + msg["date"] + "</time> </span></li>").prependTo("#microblogs ul");
      if ( $("#microblogs ul > li").size() > 20 ) {
        $('#microblogs li:last').remove();
      }
      $("#microblogs .count").text(parseInt($("#microblogs .count").text()) + 1);
    }
  }
}
function video_update(msg){
  if ($("#videos").data("paused") === false){
    $("<li class=\"" + msg["service"] + "\" ><a title=\"" + msg['text']  + "\" href=\"http://youtube.com/watch?v=" + msg["id"] + "\" onclick=\"window.open(this.href);return false;\"  \"><img src='"  + msg['thumbnail']  +  "' /><span>" + msg["text"] + "</span></a></li>").prependTo("#videos ul");
    if ( $("#videos ul > li").size() > 40 ) {
        $('#videos li:last').remove();
    }
    $("#videos .count").text(parseInt($("#videos .count").text()) + 1);
  }
}
function picture_update(msg){
  if ($("#pictures").data("paused") === false){
    $("<li class=\"" + msg["service"] + "\" style=\"background:url('"  + msg['thumbnail']  +  "') center\"><a title=\"" + msg['text']  +"\" href=\"http://www.flickr.com/photos/" + msg['user']['id']  +"/" + msg["id"] + "\" onclick=\"window.open(this.href);return false;\"  \"><span>" + msg["text"] + "</span></a></li>").prependTo("#pictures ul");
    if ( $("#pictures ul > li").size() > 60 ) {
        $('#pictures li:last').remove();
    }
    $("#pictures .count").text(parseInt($("#pictures .count").text()) + 1);
  }
}
onload = function() {
    $("div").hover(
    function(event){
      $.data(this, "paused", event.type === 'mouseenter'); 
    });
    $("div").data("paused",false)
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
    };
    stomp.onconnectedframe = function(){
        stomp.subscribe("", {"exchange": "messages"});
        console.log('Connected');
    };
    stomp.onmessageframe = function(frame){
        //console.log(frame.body);
        msg = JSON.parse(frame.body);
        if (msg['service'] in {'twitter':'', 'facebook':'', 'identica':''}) {
            status_update(msg);
        } else if (msg['service'] in {'youtube':''}) {
            video_update(msg);
        } else if (msg['service'] in {'flickr':''}) {
            picture_update(msg);
        }
    };
};

