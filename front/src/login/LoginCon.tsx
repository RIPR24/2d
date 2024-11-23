import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { SocketContext, User } from "../context/TwoDcontext";
type info = {
  email: string;
  pass: string;
};

const LoginCon = () => {
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const { socket, setUser } = useContext(SocketContext);
  const [info, setInfo] = useState<info>({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  const login = async () => {
    setDisable(true);
    socket?.emit("login", { email: "abc" });
  };

  const responseGoogle = async (authRes: any) => {
    try {
      if (authRes.code) {
        socket?.emit("glogin", { code: authRes.code });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const logs = (data: User) => {
    if (data?.token && setUser) {
      setUser(data);
      navigate("/canvas");
    }
  };

  useEffect(() => {
    socket?.on("logres", (data) => {
      logs(data);
    });
    socket?.on("glogres", (data) => {
      googleLogout();
      logs(data);
    });
    socket?.on("logerr", (data) => {
      setProb(data.status);
    });
  }, []);

  return (
    <div className="con">
      <p>Login</p>
      <div className="logcon">
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="pass"
          id="pass"
        />
        <p style={{ color: "red" }}>{prob}</p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={() => {
            if (!disable) {
              login();
            }
          }}
        >
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ color: "#106fe3", cursor: "pointer" }}
          >
            {" "}
            Signup
          </span>
        </p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={() => {
            if (!disable) {
              googleLogin();
            }
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginCon;
