import { useState } from "react";
import { useNavigate } from "react-router-dom";

type info = {
  fname: string;
  lname: string;
  email: string;
  pass: string;
  cpass: string;
};

const SignupCon = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    cpass: "",
  });

  const signup = async () => {
    const name = info.fname + " " + info.lname;
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (name.length > 1) {
      if (reg.test(info.email)) {
        //email Validation
        if (info.pass === info.cpass) {
          setDisable(true);

          setDisable(false);
        } else {
          setProb("Password did not match");
        }
      } else {
        setProb("Enter Valid email");
      }
    } else {
      setProb("Enter valid name");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  return (
    <div className="con">
      <p>Signup</p>
      <div className="logcon">
        <input
          type="text"
          placeholder="First name"
          value={info.fname}
          name="fname"
          onChange={handleChange}
          id="fname"
        />
        <input
          type="text"
          placeholder="Last name"
          name="lname"
          value={info.lname}
          onChange={handleChange}
          id="lname"
        />
        <input
          type="email"
          placeholder="Email"
          value={info.email}
          name="email"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="pass"
          id="pass"
          onChange={handleChange}
          value={info.pass}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          name="cpass"
          id="cpass"
          onChange={handleChange}
          value={info.cpass}
        />
        <p style={{ color: "red" }}>{prob}</p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={() => {
            if (!disable) {
              signup();
            }
          }}
        >
          Signup
        </button>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            style={{ color: "#106fe3", cursor: "pointer" }}
          >
            {" "}
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupCon;
