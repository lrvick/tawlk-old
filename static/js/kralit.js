document.domain = document.domain;
function urlToHREF(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  if (text.search('href')==-1){ // ignore text that is probably already html formatted
    return text.replace(exp,"<a href='$1' target=\"_blank\">$1</a>");
  } else {
    return text
  }
}
function processMsg(msg){
  if (msg['service'] in {'facebook':'', 'twitter':'', 'identica':'','buzz':''}) {
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
      msgHTML = "<li class=\"" + msg["service"] + "\"><span class=\"servicetag\"><a href=\"http://" + msg["service"] + ".com\">" + msg["service"] + "</a></span><img src=\"" + msg['user']['avatar'] + "\"/>"
      if (msg['title']) {
        msgHTML += "<p class=\"title\">" + msg["title"] + "</p>"
      }
      if (msg['text']) {
        msgHTML += "<p class=\"text\">" + msg["text"] + "</p>"
      }
      msgHTML += "<span class=\"statusfooter\">by <a href=\"" + msg["user"]['profile'] + "\" target=\"_blank\" \">" + msg["user"]['name'] + "</a> <time>" + msg["date"] + "</time></span></li>"
      $(msgHTML).hide().prependTo("#" + element  + " ul").fadeIn('slow');
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
        if (msg['title']){
            title = msg['title']
        } else {
            title = 'No Title'
        }
        var msgHTML = "<li class=\"link\"><a target=\"_blank\" class=\"title\" href=\"" + msg['href']  + "\">" + title  + "</a><a href=\"" + msg['href'] + "\" target=\"_blank\" \">" + msg['href']  + "</a><span class=\"mentions\">" + msg['count'] + "</span></a></li>"
        var $list = $("#links ul");
        var $links = $list.children("li").detach();
        newHREF = $(msgHTML).children('a').attr('href');
        existingLink = $links.find("a[href$=" + newHREF + "]");
        if (existingLink.length){
            newValue = $(msgHTML).find('.mentions').html()
            existingLink.parent().find('.mentions').html(newValue)
            //existingLink.parent().find('.title').html(title)
        } else {
            $links = $links.add(msgHTML)
        }
        $links=$($links.get().sort(function(a, b) {
            var linkA = +$(a).find("span").text(),
                linkB = +$(b).find("span").text();
            return linkB - linkA;
        }));   
        $links.appendTo($list);
        $("#links .count").text(parseInt($("#links .count").text()) + 1);
        if ( $("#links ul > li").size() > 30 ) {
            $("#links li:last").remove();
        }
    }
}
$.fx.off = true;
onload = function() {
    $.each(['flickr','youtube','facebook','twitter','wordpress','links','buzz'], function(i,service){
      $.getJSON("/feeds/" + service +"/" + query + ".json", function(data) {
        $.each(data, function(i,msg){
          processMsg(msg);
        });
      });
    });
    $.fn.cuteTime.settings = {
        refresh: -1,                    
        time_ranges: [
            {bound: Number.NEGATIVE_INFINITY,
                    cuteness: 'just now',           unit_size: 0},
            {bound: 0, 
                    cuteness: 'just now',           unit_size: 0},
            {bound: 20 * 1000, 
                    cuteness: 'a few seconds ago',  unit_size: 0},
            {bound: 60 * 1000, 
                    cuteness: 'a minute ago',       unit_size: 0},
            {bound: 60 * 1000 * 2, 
                    cuteness: ' minutes ago',       unit_size: 60 * 1000},
            {bound: 60 * 1000 * 60, 
                    cuteness: 'an hour ago',        unit_size: 0},
            {bound: 60 * 1000 * 60 * 2, 
                    cuteness: ' hours ago',         unit_size: 60 * 1000 * 60},
            {bound: 60 * 1000 * 60 * 24, 
                    cuteness: 'yesterday',          unit_size: 0},
            {bound: 60 * 1000 * 60 * 24 * 2, 
                    cuteness: ' days ago',          unit_size: 60 * 1000 * 60 * 24},
            {bound: 60 * 1000 * 60 * 24 * 30,   
                    cuteness: 'last month',         unit_size: 0},
            {bound: 60 * 1000 * 60 * 24 * 30 * 2, 
                    cuteness: ' months ago',        unit_size: 60 * 1000 * 60 * 24 * 30},
            {bound: 60 * 1000 * 60 * 24 * 30 * 12, 
                    cuteness: 'last year',          unit_size: 0},
            {bound: 60 * 1000 * 60 * 24 * 30 * 12 * 2, 
                    cuteness: ' years ago',         unit_size: 60 * 1000 * 60 * 24 * 30 * 12},
            {bound: Number.POSITIVE_INFINITY, 
                    cuteness: 'a blinkle ago',      unit_size: 0}
        ]
    };
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
            $.fx.off = false;
            processMsg(msg);
        };
    };
    if (query != 'default'){
        kral_listen();
    }
};
