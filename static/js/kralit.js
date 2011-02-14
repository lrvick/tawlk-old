document.domain = document.domain;
function urlToHREF(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1' target=\"_blank\">$1</a>"); 
}
function processMsg(msg){
  if (msg['service'] in {'facebook':'', 'twitter':'', 'identica':''}) {
    routeMsg(msg,'microblogs');
  } else if (msg['service'] in {'youtube':''}) {
    video_update(msg);
  } else if (msg['service'] in {'flickr':''}) {
    picture_update(msg);
  } else if (msg['service'] in {'wordpress':''}) {
    routeMsg(msg,'blogs');
  } else if (msg['service'] in {'links':''}) {
    links_update(msg);
  }
}
function routeMsg(msg,element){
    msg['text'] = urlToHREF(msg['text']);
  if ($("#"+ element  +"").data("paused") === false){
      if (msg['title']) {
        title = "<p class=\"title\">" + msg["title"] + "</p>"
      }
      if (msg['text']) {
        text = "<p class=\"text\">" + msg["text"] + "</p>"
      }
      $("<li class=\"" + msg["service"] + "\"><span class=\"servicetag\"><a href=\"http://" + msg["service"] + ".com\">" + msg["service"] + "</a></span><img src=\"" + msg['user']['avatar'] + "\"/>" + title + " " + text  + "<span class=\"statusfooter\">by <a href=\"" + msg["user"]['profile'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time> </span></li>").hide().prependTo("#" + element  + " ul").fadeIn('slow');
      if ( $("#" + element  + " ul > li").size() > 20 ) {
        $("#" + element + " li:last").remove();
      }
      $("#" + element  + " .count").text(parseInt($("#" + element  + " .count").text()) + 1);
    $("#" + element  + " li time").cuteTime(); 
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
        var newLink = "<li class=\"link\"><a href=\"" + msg['href'] + "\" onclick=\"window.open(this.href);return false;\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>"
        var sortedLinks = new Array();
        $("#links li").each(function(i, item) { 
            sortedLinks.push($(this).html());    
        })
        var totalLinks = sortedLinks.length;
        if (totalLinks == '0'){
            $(newLink).prependTo('#links ul')
        } else {
            sortedLinks.push(newLink);
            sortedLinks.sort();
            var newLinkPosition = $.inArray(newLink,sortedLinks);
            console.log(newLinkPosition)
            $("#links ul li:nth-child(" + newLinkPosition + ")").before(newLink);
        }
        $("#links .count").text(parseInt($("#links .count").text()) + 1);
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
