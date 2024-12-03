class PeerService {
  peercon;
  constructor() {
    this.peercon = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  async getAnswer(offer: RTCSessionDescription) {
    if (this.peercon) {
      await this.peercon.setRemoteDescription(offer);
      const ans = await this.peercon.createAnswer();
      await this.peercon.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocal(ans: RTCSessionDescription) {
    if (this.peercon) {
      this.peercon.setRemoteDescription(ans);
    }
  }

  async getOffer() {
    if (this.peercon) {
      const offer = await this.peercon.createOffer();
      await this.peercon.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
