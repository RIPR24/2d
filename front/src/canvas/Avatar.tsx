import { user_pos } from "./position";
import av1 from "../assets/avatars/av1.svg";
import av2 from "../assets/avatars/av2.svg";
import av3 from "../assets/avatars/av3.svg";
import av4 from "../assets/avatars/av4.svg";
import ufo from "../assets/avatars/ufo.svg";

const av = [av1, av2, av3, av4];
type props = {
  user: user_pos | undefined;
};

const Avatar = ({ user }: props) => {
  return (
    <div
      className="av"
      style={{
        top: `${user?.coor.y || 0}%`,
        left: `${user?.coor.x || 0}%`,
      }}
    >
      {user && <p className="user-name">{user.Name}</p>}
      {user && (
        <div style={{ position: "relative" }}>
          <img src={ufo} className="ufo"></img>
          <img src={av[+user.Avatar - 1]} className="usr"></img>
        </div>
      )}
    </div>
  );
};

export default Avatar;
