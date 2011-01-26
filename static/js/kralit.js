document.domain = document.domain;
TCPSocket = Orbited.TCPSocket;
function status_update(msg){
    $("<li class=\"" + msg["service"] + "\"><img src=\"" + msg['user']["avatar"] + "\"/>" + msg["date"] + " | " + msg["user"]['name'] + " : " + msg["text"] + "</li>").prependTo("#microblogs ul");
    if ( $("#microblogs ul > li").size() > 20 ) {
        $('#microblogs li:last').remove();
    }
}
function video_update(msg){
    $("<li class=\"" + msg["service"] + "\" ><img src='"  + msg['thumbnail']  +  "' /><a href=\"#foo\">" + msg["text"] + "</a></li>").prependTo("#videos ul");
    if ( $("#videos ul > li").size() > 40 ) {
        $('#videos li:last').remove();
    }
}
function picture_update(msg){
    $("<li class=\"" + msg["service"] + "\" style=\"background:url('"  + msg['thumbnail']  +  "') center\"><a href=\"#foo\">" + msg["text"] + "</a></li>").prependTo("#pictures ul");
    if ( $("#pictures ul > li").size() > 60 ) {
        $('#pictures li:last').remove();
    }
}
onload = function() {
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
        console.log(frame.body);
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

