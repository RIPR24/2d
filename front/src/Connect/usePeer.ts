import { Socket } from "socket.io-client";

export default function usePeer(
  sid: string,
  socket: Socket | undefined,
  setRmtstr: React.Dispatch<React.SetStateAction<MediaStream>>
) {
  try {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    //listener
    peer.addEventListener("signalingstatechange", (e) => {
      console.log(e, "new signal!!");
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
      console.log("got stream", e.streams[0].getTracks());
      setRmtstr(e.streams[0]);
    });
    peer.ondatachannel = (e) => {
      console.log("data chanel opend");
    };
    return { peer };
  } catch (error) {
    console.log(error);
    return { peer: null, remoteStrm: null };
  }
}
