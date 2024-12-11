import { useContext, useState, useEffect } from "react";
import "./conn.css";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate, useParams } from "react-router-dom";
import usePeer from "./usePeer";
import getMedia from "./getMedia";
import ReactPlayer from "react-player";

const ConnectUser = () => {
  const { user, socket } = useContext(SocketContext);
  const [status, setStatus] = useState<string>("");
  const { sid, call } = useParams();
  const [peercon, setPeercon] = useState<RTCPeerConnection | null>(null);
  const [mystr, setMystr] = useState<MediaStream>(new MediaStream());
  const [rmtstr, setRmtstr] = useState<MediaStream>(new MediaStream());
  const navigate = useNavigate();

  const sendReq = () => {
    setStatus("request sent");
    socket?.emit("connect-req", { sid, name: user?.name });
  };

  const sendOffer = async () => {
    if (sid) {
      const str = await getMedia("V");
      const { peer } = usePeer(sid || "", socket, setRmtstr);
      setMystr(str);
      if (peer) {
        if (str) {
          str.getTracks().forEach((trk) => {
            peer.addTrack(trk, str);
          });
        }
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        setPeercon(peer);
        socket?.emit("connect-offer", { sid, offer });
      }
    }
  };

  const conres = (data: { status: string }) => {
    if (data.status !== "success") {
      setStatus(data.status);
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
  }) => {
    if (data.sid) {
      const { peer } = usePeer(sid || "", socket, setRmtstr);
      const str = await getMedia("V");
      setMystr(str);
      if (peer) {
        if (str) {
          str.getTracks().forEach((trk) => {
            peer.addTrack(trk, str);
          });
        }
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

  return (
    <div className="connectcon">
      {status === "connected" ? (
        <>
          <div className="myvid">
            <ReactPlayer muted url={mystr} height={250} width={350} playing />
          </div>
          <div className="rmtvid">
            <ReactPlayer url={rmtstr} height={"80vh"} width={"80vw"} playing />
          </div>
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
