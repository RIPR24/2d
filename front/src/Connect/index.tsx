import { useContext, useState, useEffect } from "react";
import "./conn.css";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate, useParams } from "react-router-dom";
import usePeer from "./usePeer";
import ReactPlayer from "react-player";
import Strbtns from "./Strbtns";

const ConnectUser = () => {
  const { user, socket } = useContext(SocketContext);
  const [status, setStatus] = useState<string>("");
  const { sid, call } = useParams();
  const [peercon, setPeercon] = useState<RTCPeerConnection | null>(null);
  const [mystr, setMystr] = useState<MediaStream>();
  const [rmtstr, setRmtstr] = useState<MediaStream>();
  const navigate = useNavigate();

  const sendReq = () => {
    setStatus("request sent");
    socket?.emit("connect-req", { sid, name: user?.name });
  };

  const sendOffer = async () => {
    if (sid) {
      const { peer } = await usePeer(
        sid || "",
        socket,
        setRmtstr,
        setMystr,
        call,
        rmtstr,
        mystr
      );
      if (peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        setPeercon(peer);
        socket?.emit("connect-offer", { sid, offer, call });
      }
    }
  };

  const conres = (data: { status: string }) => {
    if (data.status !== "success") {
      setStatus(data.status);
      mystr?.getTracks().forEach((trk) => {
        trk.stop();
      });
      setMystr(undefined);
      if (peercon) {
        peercon.close();
        peercon.onicecandidate = null;
        peercon.ontrack = null;
      }
      setTimeout(() => {
        navigate("/canvas");
      }, 3000);
    } else {
      setStatus("Connecting");
      sendOffer();
    }
  };

  const recOffer = async (data: {
    sid: string;
    offer: RTCSessionDescription;
    call: string;
  }) => {
    if (data.sid) {
      const { peer } = await usePeer(
        sid || "",
        socket,
        setRmtstr,
        setMystr,
        data.call,
        rmtstr,
        mystr
      );
      if (peer) {
        await peer.setRemoteDescription(data.offer);
        const ans = await peer.createAnswer(data.offer);
        await peer.setLocalDescription(ans);
        setPeercon(peer);
        socket?.emit("connans", { sid: data.sid, ans });
        setStatus("connected");
      }
    }
  };

  const recAns = async (data: { sid: string; ans: RTCSessionDescription }) => {
    await peercon?.setRemoteDescription(data.ans);
    setStatus("connected");
  };

  const recIce = async (data: RTCIceCandidateInit) => {
    peercon?.addIceCandidate(data);
  };

  useEffect(() => {
    if (call && call !== "F" && !peercon) {
      sendReq();
    }
    socket?.on("conreq-res", conres);
    socket?.on("connoffer", recOffer);
    socket?.on("Conn-ans", recAns);
    socket?.on("rec-ice", recIce);
  }, [peercon]);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }

    return () => {
      socket?.removeListener("conreq-res");
      socket?.removeListener("connoffer");
      socket?.removeListener("Conn-ans");
      socket?.removeListener("rec-ice");
      console.log("yolo");
    };
  }, []);

  return (
    <div className="connectcon">
      {status === "connected" ? (
        <>
          <div className="myvid">
            <ReactPlayer muted url={mystr} height={250} width={350} playing />
          </div>
          {rmtstr && (
            <ReactPlayer url={rmtstr} height={"80vh"} width={"80vw"} playing />
          )}
          <Strbtns
            mystr={mystr}
            peercon={peercon}
            setMystr={setMystr}
            setPeercon={setPeercon}
          />
        </>
      ) : (
        <>
          <p>{status}</p>
        </>
      )}
    </div>
  );
};

export default ConnectUser;
