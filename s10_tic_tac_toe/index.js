const express = require("express");
let app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const db = require("./db");
const cors = require("cors");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  play,
  resetRoom,
  isEmptyRoom,
  isFullRoom,
} = require("./utils/users");
app.use(cors());
var io = require("socket.io")(
  app.listen(3000, function () {
    console.log("Your app is listening on port " + 3000);
  }),
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  }
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

const winCondition = [{}];
var users = [];
var rooms = { 1: { players: [], array: Array(9).fill(-1) } };

app.use(express.static("client"));

// app.use(async function(req, res, next){
//   if(!req.cookies.myck){
//     return res.redirect('client/login.html')
//   }
// })

app.get("/", (req, res) => {
  res.redirect("/play");
});

app.get("/play", async (req, res) => {
  if (req.cookies.myck) {
    let ck = req.cookies.myck;
    let arr = ck.split("-");
    let username = arr[0];
    let password = arr[1];
    const user = await db.loaduser(username, password);
    if (user === null) {
      return res.redirect("/login");
    }
    res.sendFile(__dirname + "/client/_index.html");

    if (!req.query.room || isFullRoom(req.query.room)) {
      return res.redirect("/room");
    }
  } else {
    res.redirect("/login");
  }
});

////// login signup

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/client/login.html");
});
app.post("/login", async (req, res) => {
  const user = await db.loaduser(req.body.username, req.body.password);

  if (user === null) {
    return res.send("wrong");
  }

  //res.json(user);
  res.cookie("myck", req.body.username + "-" + req.body.password);
  res.send("true");
  //res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/client/signup.html");
});

app.post("/signup", async (req, res) => {
  const isExisted = await db.isUserExisted(req.body.username);
  if (isExisted === true) {
    return res.send("false");
  }
  const entity = {
    username: req.body.username,
    password: req.body.password,
  };
  await db.adduser(entity);
  res.cookie("myck", req.body.username + "-" + req.body.password);
  res.redirect("/");
  res.send("true");
  //const user = await db.loaduser(req.body.username, req.body.password);
  //res.json(user);
});

app.get("/room", async (req, res) => {
  if (req.cookies.myck) {
    let ck = req.cookies.myck;
    let arr = ck.split("-");
    let username = arr[0];
    let password = arr[1];
    const user = await db.loaduser(username, password);
    if (user === null) {
      return res.redirect("/login");
    }
    res.sendFile(__dirname + "/client/room.html");
  } else {
    res.redirect("/login");
  }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("tick", user.tick);

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", `${user.username} has joined room`);

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("hit", ({ index }) => {
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.room).emit("hit", index);

    let message = play(socket.id, index);
    if (message) {
      io.to(user.room).emit("result", message);
    }
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });

      if (!isEmptyRoom(user.room)) {
        io.to(user.room).emit("result", `You WIN !`);
      }

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
      resetRoom(user.room);
    }
  });

  socket.on("end", () => {
    socket.disconnect();
  });
});

// http.listen(3000, () => {
//   console.log("Your server is listening on port " + 3000);
// });
