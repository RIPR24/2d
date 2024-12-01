import { useContext, useEffect } from "react";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate } from "react-router-dom";
import "./canvas.css";
import Others from "./others";
import User from "./User";
import Backg from "./Backg";
import Nav from "../Nav";

const Canvas = () => {
  const { user } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  });

  return (
    <div id="canvas">
      <Backg />
      <Others />
      <User />
      <Nav />
    </div>
  );
};

export default Canvas;
