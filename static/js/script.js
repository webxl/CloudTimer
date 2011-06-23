/*
    CloudTimer
*/
$(document).ready(function() {   
   var WEB_SOCKET_SWF_LOCATION = '/client/';
   socket = new io.Socket(null, { 
       port: 80, transports: ['websocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']
   });
   
   socket.connect();
    
   $('#startstop').bind('click', function() {
        var action = this.innerHTML == 'Start' ? 'start':'stop';
        socket.send(action);
        this.innerHTML = action == 'start' ? 'Stop':'Start';
   });
   
   socket.on('message', function(time) {
       if (parseInt(time, 10) == time) { 
           var minutes = parseInt(time / 60000, 10), seconds = (time % 60000) / 1000;
           $('#clock').html(minutes + ':' + seconds);
       }
   });
   
   socket.on('connect', function (status) {
        if (status.running) {
            console.log('connected: ' + status.time);
        }
    });
      
 });






















