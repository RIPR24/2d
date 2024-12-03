import { useContext, useEffect } from "react";
import "./conn.css";
import { SocketContext } from "../context/TwoDcontext";
import { useParams } from "react-router-dom";
import peercon from "./peercon";

const ConnectUser = () => {
  const { user, socket } = useContext(SocketContext);

  const { sid } = useParams();

  useEffect(() => {
    const offer = peercon.getOffer();
    socket?.emit("connect-req", { sid, offer, name: user?.name });
  }, []);

  return (
    <div className="connectcon">
      <div className="buttons">
        <button>Call</button>
        <button>Video Call</button>
        <button>File Transfer</button>
      </div>
    </div>
  );
};

export default ConnectUser;
