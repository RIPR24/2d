const { login } = require("./user");

const onConnection = (socket, io) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    logs = logs.filter((el) => {
      el.sid !== socket.id;
    });
  });
  socket.on("login", (data) => {
    login(data, socket.id, io);
  });
};

module.exports = onConnection;
