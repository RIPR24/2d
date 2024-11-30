import Avatar from "./Avatar";
import usePosition from "./position";

const Others = () => {
  const pos = usePosition();

  return (
    <div>
      {pos && (
        <>
          <div style={{ position: "absolute", top: 5, right: 5 }}>
            {pos.near.map((el) => {
              return (
                <div className="near">
                  <p>{el.Name}</p>
                  <button>Call</button>
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
