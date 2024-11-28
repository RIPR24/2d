import { useMemo, useState } from "react";
import { user_pos } from "./position";
import av from "../assets/avatars/av1.svg";
type props = {
  user: user_pos | undefined;
};

const Avatar = ({ user }: props) => {
  const [moving, setMoving] = useState(false);

  const img = useMemo(() => {
    return new URL(`../assets/avatars/av${user?.Avatar}`, import.meta.url).href;
  }, []);
  return (
    <div
      className={moving ? "av mov" : "av"}
      style={{
        top: `${user?.coor.y || 0}%`,
        left: `${user?.coor.x || 0}%`,
      }}
    >
      {user && <img src={av}></img>}
    </div>
  );
};

export default Avatar;
