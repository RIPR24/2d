import { increq } from ".";

type prop = {
  increq: increq;
  setIncreq: React.Dispatch<React.SetStateAction<increq>>;
};

const IncomingReq = ({ increq, setIncreq }: prop) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        translate: "0 -50%",
      }}
    >
      <p>{increq?.name}</p>
    </div>
  );
};

export default IncomingReq;
