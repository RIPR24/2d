import { useState } from "react";
import hb from "../assets/hambrgr.svg";

const Nav = () => {
  const [win, setWin] = useState(false);
  return (
    <div className="nav">
      <img
        onClick={() => {
          setWin(!win);
        }}
        src={hb}
        alt=""
      />
      {win && (
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            backgroundColor: "#353535",
            padding: 20,
            borderRadius: 10,
            width: 150,
          }}
        >
          <p>CHANGE AVATAR</p>
          <p>LOGOUT</p>
        </div>
      )}
    </div>
  );
};

export default Nav;
