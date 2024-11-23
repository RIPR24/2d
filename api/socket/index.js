const { login, signupUser, glogin } = require("./user");

let logs = [];
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
  socket.on("glogin", (data) => {
    glogin(data, socket.id, io);
  });
};

module.exports = onConnection;
