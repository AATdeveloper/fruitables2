const { Server } = require('socket.io');
const connectchat = () => {
    const io = new Server({
        
            cors: {
              origin: "http://localhost:3000"
            }
        
    });

    io.on('connection',(socket) => {
        console.log('a user connected', socket.id);
        socket.emit("welcome","welcome to fruitables")
        socket.broadcast.emit("greeting","hello all")
      });

      

      io.listen(8080)
    
}

module.exports= connectchat