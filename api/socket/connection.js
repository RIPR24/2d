const { checkCon, addCon, checkLog } = require("./logs");

const Connreq = async (sid, data, io) => {
  if (checkCon(data)) {
    io.to(sid).emit("conreq-res", {
      status: "User Already connected to Someone",
    });
  } else if (!checkLog(sid)) {
    io.to(sid).emit("conreq-res", {
      status: "User gone Offline",
    });
  } else {
    io.to(data.sid).emit("connreq", data);
  }
};
