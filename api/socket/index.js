const { removeLog, setCoor } = require("./logs");
const { login, signupUser, glogin, loginViaToken } = require("./user");

const onConnection = (socket, io) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    removeLog(socket.id);
  });
  socket.on("login", (data) => {
    login(data, socket.id, io);
  });
  socket.on("signup", (data) => {
    signupUser(data, io);
  });
  socket.on("glogin", (data) => {
    glogin(data, socket.id, io);
  });
  socket.on("logtok", (data) => {
    loginViaToken(data, socket.id, io);
  });
  socket.on("posup", (data) => {
    setCoor(socket.id, data);
  });
};

module.exports = onConnection;
