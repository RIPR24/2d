const logs = new Map();
const getLogs = () => {
  return Array.from(logs, ([i, j]) => ({ ...j, sid: i }));
};
const removeLog = (id) => {
  logs.delete(id);
};
const setCoor = (sid, coor) => {
  logs.set(sid, { ...logs.get(sid), coor: coor });
};
const logEntry = (id, name, av) => {
  logs.set(id, {
    coor: {
      x: 50,
      y: 50,
    },
    Name: name,
    Avatar: av,
  });
};

module.exports = { getLogs, setCoor, removeLog, logEntry };
