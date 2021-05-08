const express = require("express");
let app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const db = require("./db");
//var cors = require('cors');

app.use(
  express.urlencoded({
    extended: true,
  })
);
const hostname = "127.0.0.1";
const port = 3001;

const winCondition = [{}];

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

app.get("/u1", async (req, res) => {
  if (req.cookies.myck) {
    let ck = req.cookies.myck;
    let arr = ck.split("-");
    let username = arr[0];
    let password = arr[1];
    const user = await db.loaduser(username, password);
    if (user === null) {
      return res.sendFile(__dirname + "/client/login.html");
    }
    res.sendFile(__dirname + "/client/index.html");
  } else {
    res.sendFile(__dirname + "/client/login.html");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/client/login.html");
});
app.post("/login", async (req, res) => {
  const user = await db.loaduser(req.body.username, req.body.password);

  if (user === null) {
    return res.send("wrong");
  }
  res.json(user);
  //res.cookie("myck", req.body.username + "-" + req.body.password);
  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/client/signup.html");
});
app.post("/signup", async (req, res) => {
  const entity = {
    User: req.body.username,
    Pass: req.body.password,
  };
  await db.adduser(entity);
  res.cookie("myck", req.body.username + "-" + req.body.password);
  const user = await db.loaduser(req.body.username, req.body.password);
  res.json(user);
  res.redirect("/");
});

// app.post('/logout', async function(req, res){
//   res.redirect("/");
// })

app.get("/api/rank", async (req, res) => {
  const row = await db.getListRank();
  res.json(row);
});

var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
