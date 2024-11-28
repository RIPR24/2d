import { useContext, useEffect } from "react";
import Avatar from "./Avatar";
import usePosition from "./position";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate } from "react-router-dom";
import "./canvas.css";
import controls from "../controls";

const Canvas = () => {
  const pos = usePosition();
  const { user, socket } = useContext(SocketContext);
  const navigate = useNavigate();
  let up = false;

  function mov(code: string) {
    if (up) {
      up = false;
      const con = controls(code, pos?.user?.coor);
      if (con) {
        socket?.emit("posup", con);
      }
    }
  }

  useEffect(() => {
    up = true;
    document.addEventListener("keydown", (e) => {
      mov(e.code);
    });
    if (!user?.token) {
      navigate("/login");
    }
  });

  return (
    <div id="canvas">
      <Avatar user={pos?.user} />
      {pos?.others && (
        <>
          {pos.others.map((el) => {
            return <Avatar key={el.sid} user={el} />;
          })}
        </>
      )}
    </div>
  );
};

export default Canvas;
