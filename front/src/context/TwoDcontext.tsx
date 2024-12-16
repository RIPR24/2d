import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

export type User = {
  name: string;
  email: string;
  avatar: string;
  token: string;
} | null;

export type userpos = {
  x: number;
  y: number;
};

type props = {
  children: JSX.Element;
};

export interface socketContextInterface {
  socket: Socket | undefined;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
  userpos: userpos;
  setUserpos: React.Dispatch<React.SetStateAction<userpos>> | null;
  remoff: string | null;
  setRemoff: React.Dispatch<React.SetStateAction<string | null>> | null;
}

export const SocketContext = createContext<socketContextInterface>({
  socket: undefined,
  user: null,
  setUser: null,
  userpos: { x: 50, y: 50 },
  setUserpos: null,
  remoff: null,
  setRemoff: null,
});

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

const TwoDcontext = ({ children }: props) => {
  const socket: Socket = useMemo(() => {
    return io("https://2d-dgvaiof53-bapiyas-projects.vercel.app");
  }, []);
  const [user, setUser] = useState<User>(null);
  const [userpos, setUserpos] = useState<userpos>({ x: 50, y: 50 });
  const [remoff, setRemoff] = useState<string | null>(null);

  return (
    <SocketContext.Provider
      value={{ socket, user, setUser, userpos, setUserpos, setRemoff, remoff }}
    >
      <GoogleOAuthProvider clientId="85449916853-ilvmr3fr74rmit72esdsbvoptgvbr1m3.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </SocketContext.Provider>
  );
};

export default TwoDcontext;
