import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import usePosition from "./position";
import { useSocket } from "../context/TwoDcontext";
import chat from "../assets/icons/chat.svg";
import screen from "../assets/icons/screen.svg";
import vid from "../assets/icons/video.svg";

const Others = () => {
  const pos = usePosition();
  const navigate = useNavigate();
  const socket = useSocket();

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
                  <div className="btns">
                    <img
                      src={vid}
                      onClick={() => {
                        navigate(`/connect/${el.sid}/V`);
                      }}
                    />
                    <img
                      src={screen}
                      onClick={() => {
                        navigate(`/connect/${el.sid}/S`);
                      }}
                    />
                    <img
                      src={chat}
                      onClick={() => {
                        socket?.emit("new-chat", {
                          sid: el.sid,
                          name: el.Name,
                        });
                      }}
                    />
                  </div>
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
