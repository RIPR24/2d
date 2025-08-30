const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const onConnection = require("./socket");
const { default: mongoose } = require("mongoose");
const { getLogs } = require("./socket/logs");
require("dotenv").config();

mongoose.connect(process.env.MDB_URI);

const io = new Server(process.env.PORT || 8000, {
  cors: {
    origin: [
      process.env.FRONT_END,
      "https://space-2d.netlify.app",
      "http://localhost:5173",
    ],
  },
});

io.on("connection", (soc) => {
  onConnection(soc, io);
  sendPos();
});

function sendPos() {
  const logs = getLogs();
  if (io && logs.length > 0) {
    io.emit("posupdate", logs);
  }
  setTimeout(() => {
    sendPos();
  }, 20);
}
