import { useEffect, useState } from "react";
import { useSocket } from "../context/TwoDcontext";

export type user_pos = {
  coor: {
    x: number;
    y: number;
  };
  sid: string;
  Name: string;
  Avatar: string;
};

type pos = {
  user: user_pos | undefined;
  others: user_pos[];
};

const usePosition = () => {
  const socket = useSocket();
  const [pos, setPos] = useState<pos>();

  useEffect(() => {
    socket?.on("posupdate", (data: user_pos[]) => {
      const user = data.find((el) => el.sid === socket.id);
      const dat = [...data].filter((el) => el.sid !== socket.id);

      setPos({ user, others: dat });
    });
  }, []);

  return pos;
};

export default usePosition;
