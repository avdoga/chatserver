var io = require('socket.io')(process.env.PORT || 3000);
var shortid = require('shortId');

console.log('server started');

var playerCount = 0;



io.on('connection', function(socket){
    
    var thisClientId = shortid.generate();
    
    console.log('client connected', thisClientId);
    
    socket.broadcast.emit('spawn');
    playerCount++;
    
    //for(i = 0; i < playerCount; i++)
    //{
        //socket.emit('spawn');
        console.log('sending spawn to new player');
    //}
    

    
    socket.on('move', function(data){
        console.log('client moved', JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });
    
    socket.on('message', function(data){
        data.id = thisClientId;
        console.log('sending massage', JSON.stringify(data));

        socket.broadcast.emit('message', data);
        socket.emit('message');
    });
    
    
    socket.on('disconnect', function(){
        console.log('client disconnected');
        //playerCount--;
    });
    
    
    
    
    
})

