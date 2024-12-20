import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/TwoDcontext";

type msgs = {
  msg: string;
  isMe: boolean;
}[];

type usr = {
  sid: string;
  name: string;
};

type chat = {
  name: string;
  sid: string;
  msgs: msgs;
};

type msginp = {
  sid: string;
  name: string;
  msg: string;
};

const Chat = () => {
  const [chats, setChats] = useState<chat[]>([]);
  const [curmsgs, setcurmsgs] = useState<chat>();
  const { user, socket } = useContext(SocketContext);
  const [cht, setCht] = useState("");

  const addMsg = (data: msginp, isMe: boolean) => {
    console.log(chats);
    let per = chats.find((el) => el.sid === data.sid);
    let copy = chats.filter((el) => {
      return el.sid !== data.sid;
    });
    if (per?.sid) {
      per.msgs.push({ msg: data.msg, isMe });
    } else {
      per = {
        sid: data.sid,
        name: data.name,
        msgs: [{ msg: data.msg, isMe }],
      };
    }
    if (!curmsgs) {
      setcurmsgs(per);
    }
    const arr = [...copy, per];
    setChats(arr);
  };

  const newChat = ({ sid, name }: usr) => {
    let per = chats?.find((el) => {
      el.sid === sid;
    });
    if (per) {
      setcurmsgs(per);
    } else {
      per = { sid, name, msgs: [] };
      setcurmsgs(per);
      setChats([...chats, per]);
    }
  };

  const sendMsg = () => {
    if (cht.length > 0 && curmsgs) {
      const val: msginp = {
        msg: cht,
        sid: curmsgs.sid,
        name: curmsgs.name,
      };
      addMsg(val, true);
      socket?.emit("chat-send", { ...val, name: user?.name });
      setCht("");
    }
  };
  const recMsg = (data: msginp) => {
    addMsg(data, false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCht(e.target.value);
  };

  const kd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") sendMsg();
  };

  useEffect(() => {
    socket?.on("chat-msg", recMsg);
    socket?.on("new-chat-rec", newChat);

    return () => {
      socket?.removeListener("chat-msg", recMsg);
      socket?.removeListener("new-chat-rec", newChat);
    };
  }, [chats]);

  return (
    <>
      {curmsgs && (
        <div className="chatbox">
          <div className="headings">
            {curmsgs && <p style={{ fontWeight: 500 }}>{curmsgs.name}</p>}
            {chats
              ?.filter((el) => el.sid !== curmsgs?.sid)
              .map((el) => {
                return (
                  <p
                    key={el.sid}
                    onClick={() => {
                      setcurmsgs(el);
                    }}
                  >
                    {el.name}
                  </p>
                );
              })}
          </div>
          <div className="msgbox">
            {curmsgs &&
              curmsgs.msgs.map((el, i) => {
                return (
                  <div className={el.isMe ? "mybub" : "oterbub"} key={i}>
                    <p className="cht">{el.msg}</p>
                  </div>
                );
              })}
          </div>
          <div className="typemsg">
            <input
              type="text"
              value={cht}
              onChange={handleChange}
              onKeyDown={kd}
            />
            <button onClick={sendMsg}>SEND</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
