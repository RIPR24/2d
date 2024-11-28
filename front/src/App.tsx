import { Outlet, useNavigate } from "react-router-dom";
import { SocketContext } from "./context/TwoDcontext";
import { useContext, useEffect } from "react";

function App() {
  const { user } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    } else {
      navigate("/canvas");
    }
  }, []);

  return (
    <div className="main-cont">
      <Outlet />
    </div>
  );
}

export default App;
