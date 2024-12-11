const getMedia = async (type: string) => {
  const calob = new MediaStream();
  try {
    const aud = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    calob.addTrack(aud.getTracks()[0]);
  } catch (error) {
    console.log(error);
  }

  try {
    const cam = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    calob.addTrack(cam.getTracks()[0]);
  } catch (error) {
    const scr = await navigator.mediaDevices.getDisplayMedia();
    calob.addTrack(scr.getTracks()[0]);
  }

  return calob;
};
export default getMedia;
