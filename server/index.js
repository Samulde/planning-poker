const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const cors = require('cors')

const router = require('./router')

const PORT = process.env.PORT || 5000;

const ROOM = 'moaf'

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {
  origin: "*"
}})

const { addUser, removeUser, getUser, getUsers } = require('./users')

io.on('connection', (socket) => {
  console.log('We have a new connection');
  
  socket.on('join', ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name }) 

    if(error) return callback(error);

    socket.emit('message', { user: 'admin', text: `Welcome ${user.name}`})
    socket.broadcast.to(ROOM).emit('message', {user: 'admin', text: `${user.name} has joined`})
    
    socket.join(ROOM)

    callback();
  })


  socket.on('disconnect', () => {
    console.log('User has left.')
  })
})

app.use(cors({
  origin: '*'
}))

app.use(router)
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
