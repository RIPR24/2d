import { useNavigate } from "react-router-dom";
import { increq } from ".";
import { useSocket } from "../context/TwoDcontext";

type prop = {
  increq: increq;
  setIncreq: React.Dispatch<React.SetStateAction<increq>>;
};

const IncomingReq = ({ increq, setIncreq }: prop) => {
  const socet = useSocket();
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        translate: "-50% -50%",
        border: "1px solid aliceblue",
        padding: "5px 20px",
        backgroundColor: "#303030",
        borderRadius: 10,
      }}
    >
      <p>{increq?.name + " is trying to connet"}</p>
      <button
        style={{ margin: 5 }}
        onClick={() => {
          socet?.emit("conn-req-res", { status: "success", sid: increq?.sid });
          setIncreq(null);
          navigate(`/connect/${increq?.sid}/F`);
        }}
      >
        ACCEPT
      </button>
      <button
        style={{ margin: 5 }}
        onClick={() => {
          socet?.emit("conn-req-res", {
            status: "Call Declined",
            sid: increq?.sid,
          });
          setIncreq(null);
        }}
      >
        REJECT
      </button>
    </div>
  );
};

export default IncomingReq;
