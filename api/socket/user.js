const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const server = require("../server");
const { logEntry } = require("./logs");
require("dotenv").config();
const { createHmac } = require("crypto");

const login = async (data, id, io) => {
  const user = await userModel.findOne({ Email: data.email });
  if (user) {
    if (user.Password === "google") {
      io.emit("logerr", { status: "Loggedin with google" });
    } else {
      if (user.Password === data.password) {
        const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, {
          expiresIn: "2h",
        });
      const Password = createHmac("sha256", process.env.KEY)
        .update(data.Password)
        .digest("hex");
      if (user.Password === Password) {
        const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET);
        logEntry(id, user.Name, user.Avatar);
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

const loginViaToken = async (data, id, io) => {
  jwt.verify(data.token, process.env.ACCESS_SECRET, async (err, uid) => {
    if (!err) {
      const user = await userModel.findById(uid);
      if (user) {
        const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, {
          expiresIn: "2h",
        });
        logEntry(id, user.Name, user.Avatar);
        io.to(id).emit("logres", {
          name: user.Name,
          email: user.Email,
          avatar: user.Avatar,
          token: tok,
        });
      }
    }
  });
};

const signupUser = async (id, data, io) => {
  const chk = await userModel.findOne({ Email: data.Email });
  if (chk) {
    io.to(id).emit("supres", { status: "Email already exists" });
  } else {
    const Password = createHmac("sha256", process.env.KEY)
      .update(data.Password)
      .digest("hex");
    const user = await userModel.create({ ...data, Password });
    io.to(id).emit("supres", { status: "success" });
  }
};

const glogin = async (data, id, io) => {
  const gres = await getCred(data.code);
  const user = await userModel.findOne({ Email: gres.email });
  if (user) {
    const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, {
      expiresIn: "2h",
    });
    logEntry(id, user.Name, user.Avatar);
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
      const tok = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, {
        expiresIn: "2h",
      });

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

const changeAvatar = (data, io, id) => {
  jwt.verify(data.token, process.env.ACCESS_SECRET, async (err, uid) => {
    if (!err) {
      const user = await userModel.findById(uid);
      if (user) {
        user.Avatar = +data.av;
        user.save();
        io.to(id).emit("avchng", {
          name: user.Name,
          email: user.Email,
          avatar: user.Avatar,
          token: data.token,
        });
      }
    } else {
      io.to(id).emit("unauth", {});
    }
  });
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

module.exports = {
  login,
  signupUser,
  glogin,
  loginViaToken,
  changeAvatar,
};
