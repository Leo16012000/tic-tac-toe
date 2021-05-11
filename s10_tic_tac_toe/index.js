const express = require("express");
let app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const db = require("./db");
const cors = require("cors");

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const winCondition = [{}];
var users = [];
var rooms = { 1: { players: [], array: Array(9).fill(-1) } };

app.use(express.static("client"));

function winCheck(tableArray, player) {
  if (
    tableArray[0] == player &&
    tableArray[4] == player &&
    tableArray[8] == player
  )
    return true;
  else if (
    tableArray[2] === player &&
    tableArray[4] === player &&
    tableArray[6] === player
  )
    return true;
  else if (
    tableArray[0] === player &&
    tableArray[3] === player &&
    tableArray[6] === player
  )
    return true;
  else if (
    tableArray[1] === player &&
    tableArray[4] === player &&
    tableArray[7] === player
  )
    return true;
  else if (
    tableArray[2] === player &&
    tableArray[5] === player &&
    tableArray[8] === player
  )
    return true;
  else if (
    tableArray[0] === player &&
    tableArray[1] === player &&
    tableArray[2] === player
  )
    return true;
  else if (
    tableArray[3] === player &&
    tableArray[4] === player &&
    tableArray[5] === player
  )
    return true;
  else if (
    tableArray[6] === player &&
    tableArray[7] === player &&
    tableArray[8] === player
  )
    return true;
  return false;
}

app.post("/array", (req, res) => {
  let array = JSON.parse("[" + req.body.array.toString() + "]");
  let isWin = winCheck(array, 1) || winCheck(array, 2);
  res.json(isWin);
  console.log(isWin);
});

// app.use(async function(req, res, next){
//   if(!req.cookies.myck){
//     return res.redirect('client/login.html')
//   }
// })

app.get("/", async (req, res) => {
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

  console.log(user);

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
    User: req.body.username,
    Pass: req.body.password,
  };
  await db.adduser(entity);
  res.cookie("myck", req.body.username + "-" + req.body.password);
  res.redirect("/");
  res.send("true");
  //const user = await db.loaduser(req.body.username, req.body.password);
  //res.json(user);
});

/////////
app.get("/api/winrate", async (req, res) => {
  const row = await db.getListRank();
  res.json(row[0]);
});

app.get("/api/getlistrank", async (req, res) => {
  let row = await db.getListRank();
  console.log(row);
  let rank = row[0].map((obj, index) => {
    let rObj = {};
    rObj["username"] = obj.User;
    rObj["rank"] = index + 1;
    return rObj;
  });
  res.json(rank);
});

io.on("connection", (socket) => {
  console.log("Oh connection... ", socket.id);
  socket.on("username", (username) => {
    if (users.every((x) => x.username !== username))
      users.push({ username: username, id: socket.id });
    else users.find((x) => x.username === username).id = socket.id;
    console.log(username);

    if (rooms["1"].players.length === 2)
      rooms["1"] = { players: [], array: Array(9).fill(-1) };
    rooms["1"].players.push(username);
    let userIndex = rooms["1"].players.indexOf(username);
    socket.emit("userIndex", userIndex);
  });
  socket.on("hit", (data) => {
    let { username, index } = data;
    let userIndex = rooms["1"].players.indexOf(username);
    rooms["1"].array[index] = userIndex;

    socket.broadcast.emit("fill", index);
    if (winCheck(rooms["1"].array, userIndex))
      io.emit("result", username + " THẮNG !!!");
    if (rooms["1"].array.every((x) => x !== -1)) io.emit("result", "HÒA !!!");
  });
});

// app.listen(3000, function () {
//   console.log("Your app is listening on port " + 3000);
// });

http.listen(3000, () => {
  console.log("Your server is listening on port " + 3000);
});
