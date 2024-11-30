import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/TwoDcontext";
import av from "../assets/avatars/av1.svg";
import controls from "./controls";

const User = () => {
  const { socket, userpos, setUserpos, user } = useContext(SocketContext);
  const [moving, setMoving] = useState(false);
  let cur = userpos;

  function mov(e: KeyboardEvent) {
    setMoving(true);
    const con = controls(e.code, cur);
    if (setUserpos && con) {
      cur = con;
      setUserpos(con);
    }
  }

  const updatePos = () => {
    socket?.emit("posup", cur);
    setTimeout(() => {
      updatePos();
    }, 30);
  };

  useEffect(() => {
    updatePos();
    document.addEventListener("keydown", mov);
    document.addEventListener("keyup", () => {
      setMoving(false);
    });
  }, []);

  return (
    <div
      className={moving ? "av mov" : "av"}
      style={{
        top: `${userpos.y || 0}%`,
        left: `${userpos.x || 0}%`,
      }}
    >
      <p className="user-text">YOU</p>
      {user?.avatar && <img src={av}></img>}
    </div>
  );
};

export default User;
