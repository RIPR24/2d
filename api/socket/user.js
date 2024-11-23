const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const login = async (data, id, io) => {
  const user = await userModel.findOne({ Email: data.email });
  if (user) {
    if (user.Password.length === 0) {
      io.emit("logerr", { status: "Loggedin with google" });
    } else {
      if (user.Password === data.password) {
        const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET);

        io.to(id).emit("logres", {
          name: user.Name,
          email: user.Email,
          avatar: user.Avatar,
          token: tok,
        });
      } else {
        io.to(id).emit("logerr", { status: "Wrong Password" });
      }
    }
  } else {
    io.to(id).emit("logerr", { status: "Wrong email or user doesn't exist" });
  }
};

const signupUser = async (data, io) => {
  const chk = await userModel.find({ email: data.email });
  if (chk[0]) {
    io.to(id).emit("supres", { status: "Email already exists" });
  } else {
    const user = await userModel.create(data);
    io.to(id).emit("supres", { status: "success" });
  }
};

const glogin = async (data, id, io) => {
  const gres = await getCred(data.code);
  const user = await userModel.findOne({ Email: gres.email });
  if (user) {
    const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET);

    io.to(id).emit("logres", {
      name: user.Name,
      email: user.Email,
      avatar: user.Avatar,
      token: tok,
    });
  } else {
    const user = await userModel.create({
      Email: gres.email,
      Name: gres.name,
      Password: "google",
      Avatar: "1",
    });

    if (user._id) {
      const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET);

      io.to(id).emit("logres", {
        name: user.Name,
        email: user.Email,
        avatar: user.Avatar,
        token: tok,
      });
    } else {
      io.to(id).emit("logres", "failed");
    }
  }
};

const getCred = async (code) => {
  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const userCred = await res.json();
    return userCred;
  } catch (error) {
    console.log(error);
    return {};
  }
};

module.exports = { login, signupUser, glogin };
