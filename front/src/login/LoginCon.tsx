import { useState } from "react";
import { useNavigate } from "react-router-dom";
type info = {
  email: string;
  pass: string;
};

const LoginCon = () => {
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
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
  };

  const googleLogin = async () => {};

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
