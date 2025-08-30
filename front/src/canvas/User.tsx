import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/TwoDcontext";
import av1 from "../assets/avatars/av1.svg";
import av2 from "../assets/avatars/av2.svg";
import av3 from "../assets/avatars/av3.svg";
import av4 from "../assets/avatars/av4.svg";
import ufo from "../assets/avatars/ufo.svg";
import controls from "./controls";

const av = [av1, av2, av3, av4];

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
    return () => {
      document.removeEventListener("keydown", mov);
      document.removeEventListener("keyup", () => {
        setMoving(false);
      });
    };
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
      {user?.avatar && (
        <div style={{ position: "relative" }}>
          <img src={ufo} className="ufo"></img>
          <img src={av[+user.avatar - 1]} className="usr"></img>
        </div>
      )}
    </div>
  );
};

export default User;
