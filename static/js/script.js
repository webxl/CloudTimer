/*
    CloudTimer
*/

$(document).ready(function() {   
   
   //io.setPath('/client/');
   
   var WEB_SOCKET_SWF_LOCATION = '/client/';
   socket = new io.Socket(null, { 
     port: 80
     ,transports: ['websocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']
   });
   socket.connect();
    
   $('#sender').bind('click', function() {
     socket.send(new Date());     
   });
   
   socket.on('message', function(time) {
       if (parseInt(time, 10) == time) { 
           var minutes = parseInt(time / 60000, 10), seconds = (time % 60000) / 1000;
           $('#clock').html(minutes + ':' + seconds);
       }
   });
      
 });






















