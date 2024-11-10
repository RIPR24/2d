import Avatar from "./Avatar";
import usePosition from "./position";

const Canvas = () => {
  const pos = usePosition();

  return (
    <div id="canvas">
      <Avatar user={pos?.user} />
      {pos?.others && (
        <>
          {pos.others.map((el) => {
            <Avatar key={el.sid} user={el} />;
          })}
        </>
      )}
    </div>
  );
};

export default Canvas;
