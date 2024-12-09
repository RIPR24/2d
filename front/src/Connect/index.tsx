import { useContext, useState, useEffect, useRef } from "react";
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
  const myref = useRef<HTMLVideoElement>(null);
  const rmtref = useRef<HTMLVideoElement>(null);
  const [mystr, setMystr] = useState<MediaStream>(new MediaStream());
  const [rmtstr, setRmtstr] = useState<MediaStream>(new MediaStream());
  const navigate = useNavigate();
  let chat: RTCDataChannel | null = null;

  const sendReq = () => {
    setStatus("request sent");
    socket?.emit("connect-req", { sid, name: user?.name });
  };

  const sendOffer = async () => {
    if (sid) {
      const { peer } = usePeer(sid || "", socket, setRmtstr);
      const str = await getMedia();
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
      const str = await getMedia();
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
        peer.ondatachannel = (e) => {
          chat = e.channel;
          chat.addEventListener("message", (e) => {
            console.log(e.data, "msg");
          });
        };
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
    if (call && call === "T") {
      sendReq();
    }
    socket?.on("conreq-res", conres);
    socket?.on("connoffer", recOffer);
    socket?.on("Conn-ans", recAns);
    socket?.on("rec-ice", recIce);
    if (myref.current) {
      myref.current.srcObject = mystr;
    }
    if (rmtref.current) {
      rmtref.current.srcObject = rmtstr;
    }
  }, []);

  return (
    <div className="connectcon">
      {status === "connected" ? (
        <>
          <div className="buttons">
            <button>Call</button>
            <button>Video Call</button>
            <button>File Transfer</button>
          </div>
          <div>
            <ReactPlayer url={mystr} height={250} width={350} playing />
            <ReactPlayer url={rmtstr} height={250} width={350} playing />
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
