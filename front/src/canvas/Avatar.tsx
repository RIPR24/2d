import { useEffect, useState } from "react";
import { user_pos } from "./position";
type props = {
  user: user_pos | undefined;
};

const Avatar = ({ user }: props) => {
  const [moving, setMoving] = useState(false);
  const controls = (e: KeyboardEvent) => {
    console.log(e);
  };

  useEffect(() => {
    document.addEventListener("keydown", controls);

    return document.removeEventListener("keydown", controls);
  });
  return (
    <div
      className={moving ? "av mov" : "av"}
      style={{ top: `${user?.coor.y || 0}%`, left: `${user?.coor.x || 0}%` }}
    >
      {user && <div id={user.sid} className={user.Avatar}></div>}
    </div>
  );
};

export default Avatar;
