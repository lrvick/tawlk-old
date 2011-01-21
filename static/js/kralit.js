document.domain = document.domain;
TCPSocket = Orbited.TCPSocket;
function status_update(msg){
    $("<li class=\"" + msg["service"] + "\"><img src=\"" + msg['user']["avatar"] + "\"/>" + msg["date"] + " | " + msg["user"]['name'] + " : " + msg["text"] + "</li>").prependTo("#microblogs ul");
    $('#microblogs li:last').remove();
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
        //console.log(frame.body);
        msg = JSON.parse(frame.body);
        if (msg['service'] in {'twitter':'', 'facebook':'', 'identica':''}) {
            status_update(msg);
        }
    };
};

