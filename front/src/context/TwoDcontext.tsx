import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

export type User = {
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

export const SocketContext = createContext<socketContextInterface>({
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
      <GoogleOAuthProvider clientId="85449916853-ilvmr3fr74rmit72esdsbvoptgvbr1m3.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </SocketContext.Provider>
  );
};

export default TwoDcontext;
