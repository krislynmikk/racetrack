function emitAll(io, state) {
  io.emit('admin:update', state);
  io.emit('public:update', state);
  io.emit('timer:update', { remainingTime: state.remainingTime });
}

module.exports = {
  emitAll
};