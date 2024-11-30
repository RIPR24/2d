import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/TwoDcontext";

export type user_pos = {
  coor: {
    x: number;
    y: number;
  };
  sid: string;
  Name: string;
  Avatar: string;
};

const usePosition = () => {
  const { socket, userpos } = useContext(SocketContext);
  const [pos, setPos] = useState<{ others: user_pos[]; near: user_pos[] }>();

  useEffect(() => {
    socket?.on("posupdate", (data: user_pos[]) => {
      const near: user_pos[] = [];
      const others: user_pos[] = [];
      data.forEach((el) => {
        if (el.sid !== socket.id) {
          others.push(el);
          if (
            userpos.x - el.coor.x < 5 &&
            userpos.x - el.coor.x > -5 &&
            userpos.y - el.coor.y < 5 &&
            userpos.y - el.coor.y > -5
          ) {
            near.push(el);
          }
        }
      });
      others.sort((a, b) => a.coor.y - b.coor.y);
      setPos({ near, others });
    });
  }, [userpos]);
  console.log(pos?.near);
  return pos;
};

export default usePosition;
