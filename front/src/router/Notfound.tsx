import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 40 }}>404 Error page not found</h1>
        <NavLink
          style={{
            backgroundColor: "#4287f5",
            color: "white",
            fontSize: "1.3rem",
            padding: "10px 30px",
            borderRadius: 10,
            textDecoration: "none",
          }}
          to={"/login"}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Notfound;
