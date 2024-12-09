import { useEffect, useRef, useState } from "react";

const Chat = ({ sendMsg }: { sendMsg: any }) => {
  const [chtarr, setChtarr] = useState<string[]>([]);
  const inpref = useRef<HTMLInputElement>(null);

  const handleclick = () => {
    if (inpref?.current) {
      const msg = inpref?.current?.value;
      sendMsg(msg);
    }
  };

  useEffect(() => {});
  return (
    <div>
      <input ref={inpref} type="text" name="" id="" />
      <button onClick={handleclick}>SEND</button>
    </div>
  );
};

export default Chat;
