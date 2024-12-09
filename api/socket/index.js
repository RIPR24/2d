const { Connreq, sendOffer } = require("./connection");
const { removeLog, setCoor, checkCon, getCon, removeCon } = require("./logs");
const {
  login,
  signupUser,
  glogin,
  loginViaToken,
  changeAvatar,
} = require("./user");

const onConnection = (socket, io) => {
  socket.on("disconnect", () => {
    removeLog(socket.id);
    if (checkCon(socket.id)) {
      const osid = getCon(socket.id);
      io.to(osid).emit("conreq-res", { status: "User Disconnected" });
      removeCon(socket.id, osid);
    }
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
  socket.on("avcng", changeAvatar);
  socket.on("connect-req", (data) => {
    Connreq(socket.id, data, io);
  });
  socket.on("conn-req-res", (data) => {
    io.to(data.sid).emit("conreq-res", data);
  });
  socket.on("connect-offer", (data) => {
    sendOffer(socket.id, data, io);
  });
  socket.on("connans", (data) => {
    io.to(data.sid).emit("Conn-ans", data);
  });
  socket.on("iceCan", (data) => {
    io.to(data.sid).emit("rec-ice", data.ice);
  });
};

module.exports = onConnection;
