import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (true) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <Outlet />
    </div>
  );
};

export default Login;
