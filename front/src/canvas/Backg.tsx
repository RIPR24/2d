import bg1 from "../assets/bck/galaxy.svg";
import bg2 from "../assets/bck/satellite.svg";
import bg3 from "../assets/bck/saturn.svg";
import bg4 from "../assets/bck/uranus.svg";

const Backg = () => {
  return (
    <>
      <img
        src={bg1}
        className="bgimg"
        style={{ top: "10%", left: "10%", animationDelay: "1s" }}
      />
      <img
        src={bg2}
        className="bgimg"
        style={{ top: "33%", left: "78%", animationDelay: ".1s" }}
      />
      <img
        src={bg3}
        className="bgimg"
        style={{ top: "70%", left: "6%", animationDelay: ".6s" }}
      />
      <img
        src={bg4}
        className="bgimg"
        style={{ top: "75%", left: "80%", animationDelay: "1.4s" }}
      />
    </>
  );
};

export default Backg;
