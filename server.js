const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`CONNECTION MADE`);

  socket.on('new message sent', (newMessage) => {
    console.log(`A NEW MESSAGE HAS BEEN SENT OUT`);
    console.log(newMessage);

    io.emit('new message to relay', newMessage);
  });
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));