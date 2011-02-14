document.domain = document.domain;
function urlToHREF(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1' target=\"_blank\">$1</a>"); 
}
function processMsg(msg){
  if (msg['service'] in {'facebook':'', 'twitter':'', 'identica':''}) {
    status_update(msg);
  } else if (msg['service'] in {'youtube':''}) {
    video_update(msg);
  } else if (msg['service'] in {'flickr':''}) {
    picture_update(msg);
  } else if (msg['service'] in {'wordpress':''}) {
    blog_update(msg);
  } else if (msg['service'] in {'links':''}) {
    links_update(msg);
  }
}
function status_update(msg){
  if ($("#microblogs").data("paused") === false){
      msg['text'] = urlToHREF(msg['text']);
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\"><a href=\"http://" + msg["service"] + ".com\">" + msg["service"] + "</a></span><img src=\"" + msg['user']['avatar'] + "\"/><p class=\"title\">" + msg["text"] + "</p><span class=\"statusfooter\">by <a href=\"http://twitter.com/" + msg["user"]['name'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time> </span></li>").hide().prependTo("#microblogs ul").fadeIn('slow');
      if ( $("#microblogs ul > li").size() > 20 ) {
        $('#microblogs li:last').remove();
      }
      $("#microblogs .count").text(parseInt($("#microblogs .count").text()) + 1);
  }
    $('#microblogs li time').cuteTime(); 
}
function blog_update(msg){
  if ($("#blogs").data("paused") === false){
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\"><a href=\"http://" + msg["service"] + ".com\">" + msg["service"] + "</a></span><img src=\"" + msg['user']['avatar'] + "\"/><p class=\"title\"><a href=\"" + msg['source'] + "\" onclick=\"window.open(this.href);return false;\" >" + msg["text"] + "</a></p><p class=\"description\">" + msg["description"] + "</p><span class=\"statusfooter\">by <a href=\"" + msg["user"]['profile'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time> </span></li>").hide().prependTo("#blogs ul").fadeIn('slow');
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
function links_update(msg){
  if ($("#links").data("paused") === false){
        window.beforeIndex = 0;
        $($('#links li .mentions').get().reverse()).each(function(index) {
            if ($(this).text() <= msg['count']){
                window.beforeIndex = $(this).index();
             } 
        });
        console.log(window.beforeIndex);
        $("#links ul li").eq(window.beforeIndex).before("<li class=\"link\"><a href=\"" + msg['href'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>")
        $("#links .count").text(parseInt($("#links .count").text()) + 1);
        //$("<li class=\"link\"><a href=\"" + msg['href'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>").insertAfter("#links ul li:eq(" + window.afterIndex  + ") ");
        //$('#links ul').append("<li class=\"link\"><a href=\"" + msg['href'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>")
        //$("<li class=\"link\"><a href=\"" + msg['href'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>").hide().insertAfter("#links ul:eq(" + window.afterIndex  + ") ").fadeIn('slow');
   }
}
onload = function() {
    $.each(['flickr','youtube','facebook','twitter','wordpress','links'], function(i,service){
      $.fx.off = true;
      $.getJSON("/feeds/" + service +"/" + query + ".json", function(data) {
        $.each(data, function(i,msg){
          processMsg(msg);
        });
      });
      $.fx.off = false;
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
            processMsg(msg);
        };
    };
    if (query != 'default'){
        kral_listen();
    }
};
