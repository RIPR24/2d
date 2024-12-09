import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate } from "react-router-dom";
import "./canvas.css";
import Others from "./others";
import User from "./User";
import Backg from "./Backg";
import Nav from "../Nav";
import IncomingReq from "./IncomingReq";

export type increq = {
  sid: string;
  name: string;
} | null;

const Canvas = () => {
  const { user, socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [increq, setIncreq] = useState<increq>(null);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
    socket?.on("connreq", (data) => {
      setIncreq(data);
    });
  });

  return (
    <div id="canvas">
      <Backg />
      <Others />
      <User />
      <Nav />
      {increq?.sid && <IncomingReq increq={increq} setIncreq={setIncreq} />}
    </div>
  );
};

export default Canvas;
