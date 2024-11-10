import { useEffect, useState } from "react";

const Avatar = () => {
  const [moving, setMoving] = useState(false);
  const controls = (e: KeyboardEvent) => {
    console.log(e);
  };

  useEffect(() => {
    document.addEventListener("keydown", controls);

    return document.removeEventListener("keydown", controls);
  });
  return <div>Avatar</div>;
};

export default Avatar;
