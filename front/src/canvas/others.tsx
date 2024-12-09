import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import usePosition from "./position";

const Others = () => {
  const pos = usePosition();
  const navigate = useNavigate();

  return (
    <div>
      {pos && (
        <>
          <div
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {pos.near.map((el) => {
              return (
                <div key={el.sid} className="near">
                  <p>{el.Name}</p>
                  <button
                    onClick={() => {
                      navigate(`/connect/${el.sid}/T`);
                    }}
                  >
                    Connect
                  </button>
                </div>
              );
            })}
          </div>
          {pos.others.map((el) => {
            return <Avatar key={el.sid} user={el} />;
          })}
        </>
      )}
    </div>
  );
};

export default Others;
