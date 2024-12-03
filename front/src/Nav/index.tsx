import { ChangeEvent, useContext, useState } from "react";
import hb from "../assets/hambrgr.svg";
import { SocketContext } from "../context/TwoDcontext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, socket } = useContext(SocketContext);
  const [win, setWin] = useState(false);
  const [av, setAv] = useState(user?.avatar);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const val = e.target.value;
    setAv(val);
    socket?.emit("avcng", { token: user?.token, av: val });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
        <div className="nav-menu">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p>CHANGE AVATAR</p>
            <select
              name="av"
              value={av || "1"}
              onChange={handleChange}
              style={{ width: 50, padding: 10, height: 40 }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <p onClick={logout}>LOGOUT</p>
        </div>
      )}
    </div>
  );
};

export default Nav;
