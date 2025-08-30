import { Socket } from "socket.io-client";
import getMedia from "./getMedia";

export default async function usePeer(
  sid: string,
  socket: Socket | undefined,
  setRmtstr: React.Dispatch<React.SetStateAction<MediaStream | undefined>>,
  setMystr: React.Dispatch<React.SetStateAction<MediaStream | undefined>>,
  call: string | undefined,
  rmtstr: MediaStream | undefined,
  mystr: MediaStream | undefined
) {
  try {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "23.21.150.121:3478",
            "numb.viagenie.ca:3478",
            "s1.taraba.net:3478",
            "s2.taraba.net:3478",
            "stun.12connect.com:3478",
            "stun.12voip.com:3478",
            "stun.1und1.de:3478",
            "stun.2talk.co.nz:3478",
            "stun:stun.l.google.com:5349",
            "stun:stun1.l.google.com:3478",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    if (!mystr) {
      const str = await getMedia(call || "V");
      if (str) {
        str.getTracks().forEach((trk) => {
          peer.addTrack(trk, str);
        });
      }
      setMystr(str);
    }
    //listener
    peer.addEventListener("signalingstatechange", () => {
      //console.log(e, "new signal!!");
    });
    peer.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        socket?.emit("iceCan", { sid, ice: e.candidate });
      }
    });
    peer.addEventListener("icecandidateerror", (e) => {
      console.log(e.errorCode, e.url, "iceerr");
    });

    peer.addEventListener("track", (e) => {
      if (!rmtstr) {
        setRmtstr(e.streams[0]);
      }
    });
    peer.ondatachannel = () => {
      console.log("data chanel opend");
    };
    return { peer };
  } catch (error) {
    console.log(error);
    return { peer: null, remoteStrm: null };
  }
}
