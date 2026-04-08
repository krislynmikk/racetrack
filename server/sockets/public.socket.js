function publicSocket(socket, state) {
  socket.emit('admin:update', state);
}

module.exports = publicSocket;