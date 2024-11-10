const { login, signupUser } = require("./user");

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
  socket.on("signup", (data) => {
    signupUser(data, io);
  });
};

module.exports = onConnection;
