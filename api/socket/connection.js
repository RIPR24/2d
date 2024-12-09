const { checkCon, addCon, checkLog, getCon } = require("./logs");

const Connreq = async (sid, data, io) => {
  if (checkCon(data.sid) && getCon(data.sid) !== sid) {
    io.to(sid).emit("conreq-res", {
      status: "User Already connected to Someone",
    });
  } else if (!checkLog(data.sid)) {
    io.to(sid).emit("conreq-res", {
      status: "User gone Offline",
    });
  } else {
    io.to(data.sid).emit("connreq", { ...data, sid: sid });
  }
};

const sendOffer = (sid, data, io) => {
  addCon(sid, data.sid);
  addCon(data.sid, sid);
  io.to(data.sid).emit("connoffer", { ...data, sid });
};

module.exports = {
  Connreq,
  sendOffer,
};
