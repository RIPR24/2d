const userModel = require("../Models/UserModel");

const login = async (data, id, io) => {
  const user = await userModel.findOne({ Email: data.email });
  if (user) {
    if (user.password.length === 0) {
      io.emit("logerr", { status: "Loggedin with google" });
    } else {
      if (user.password === data.password) {
        const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET);

        io.emit("logres", {
          name: user.Name,
          email: user.Email,
          avatar: user.Avatar,
          token: tok,
        });
      } else {
        io.emit("logerr", { status: "Wrong Password" });
      }
    }
  } else {
    io.emit("logerr", { status: "Wrong email or user doesn't exist" });
  }
};

const signupUser = async (data, io) => {
  const chk = await userModel.find({ email: data.email });
  if (chk[0]) {
    io.emit("supres", { status: "Email already exists" });
  } else {
    const user = await Usermodel.create(data);
    io.emit("supres", { status: "success" });
  }
};

module.exports = { login, signupUser };
