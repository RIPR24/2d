const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:5173",
  },
});
