import { createContext, useContext, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

type User = {
  name: string;
  email: string;
  avatar: string;
  token: string;
} | null;

type props = {
  children: JSX.Element;
};

export interface socketContextInterface {
  socket: Socket | undefined;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
}

const SocketContext = createContext<socketContextInterface>({
  socket: undefined,
  user: null,
  setUser: null,
});

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

const TwoDcontext = ({ children }: props) => {
  const socket: Socket = useMemo(() => {
    return io("http://localhost:8000/");
  }, []);
  const [user, setUser] = useState<User>(null);

  return (
    <SocketContext.Provider value={{ socket, user, setUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export default TwoDcontext;
