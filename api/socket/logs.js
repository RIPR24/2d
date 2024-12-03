const logs = new Map();
const conlogs = new Map();
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

const addCon = (sid, sid2) => {
  conlogs.set(sid, sid2);
};
const removeCon = (sid) => {
  logs.delete(sid);
};
const checkCon = (sid) => {
  return conlogs.has(sid);
};

module.exports = {
  getLogs,
  setCoor,
  removeLog,
  logEntry,
  addCon,
  removeCon,
  checkCon,
};
