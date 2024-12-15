import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/TwoDcontext";
import vid from "../assets/icons/video.svg";
import vidd from "../assets/icons/videodis.svg";
import mic from "../assets/icons/mic.svg";
import micd from "../assets/icons/micdis.svg";
import cls from "../assets/icons/close.svg";
import { useState } from "react";

type props = {
  mystr: MediaStream | undefined;
  peercon: RTCPeerConnection | null;
  setPeercon: React.Dispatch<React.SetStateAction<RTCPeerConnection | null>>;
  setMystr: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;
};

type strbtns = {
  vid: boolean;
  aud: boolean;
};

const Strbtns = ({ mystr, peercon, setPeercon, setMystr }: props) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [strbtns, setStrbtns] = useState<strbtns>({ vid: true, aud: true });

  const closeCall = () => {
    mystr?.getTracks().forEach((trk) => {
      trk.stop();
    });
    setMystr(undefined);
    if (peercon) {
      peercon.close();
      peercon.onicecandidate = null;
      peercon.ontrack = null;
    }
    setPeercon(null);
    navigate("/canvas");
    socket?.emit("conclose", {});
  };

  const btnClick = (btn: string) => {
    if (btn === "vid") {
      mystr?.getVideoTracks().forEach((trk) => {
        trk.enabled = !strbtns.vid;
      });
      setStrbtns({ ...strbtns, vid: !strbtns.vid });
    } else {
      mystr?.getAudioTracks().forEach((trk) => {
        trk.enabled = !strbtns.aud;
      });
      setStrbtns({ ...strbtns, aud: !strbtns.aud });
    }
  };

  return (
    <div className="strm-btns">
      <div
        onClick={() => {
          btnClick("vid");
        }}
        style={{ backgroundColor: strbtns.vid ? "#390d46" : "#353535" }}
      >
        <img src={strbtns.vid ? vid : vidd} />
      </div>
      <div
        onClick={() => {
          btnClick("aud");
        }}
        style={{ backgroundColor: strbtns.aud ? "#390d46" : "#353535" }}
      >
        <img src={strbtns.aud ? mic : micd} />
      </div>
      <div style={{ backgroundColor: "#f5333d" }}>
        <img src={cls} onClick={closeCall} />
      </div>
    </div>
  );
};

export default Strbtns;
