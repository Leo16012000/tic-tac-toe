/**
 * Global variables
 */

// ma tran 3x3

const marks = ["cross", "circle"];
var index;
var myTurn;

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(function () {
  // console.log(matrix)
  inn = `
        <tr>
          <td>data.name</td>
          <td>data.score</td>
        </tr>
      `;
  $("table tbody").append(inn);
  $("#replayGame button").on("click", function () {
    location.reload();
  });

  $(".log-out").on("click", function () {
    document.cookie = "myck= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
  });

  $.post("/").done(function (data) {
    inn = ``;
    for (let i = 0; i < data.length; i++) {
      inn +=
        `
        <tr>
          <td>` +
        data.name +
        `</td>
          <td>` +
        data.score +
        `</td>
        </tr>
      `;
    }

    $("table tbody").append(inn);
  });

  var socket = io("http://localhost:3000");
  socket.on("connection", () => {
    console.log("Client connect");
  });
  socket.emit("username", getCookie("myck").split("-")[0]);
  socket.on("userIndex", (userIndex) => {
    index = userIndex;
    if (index === 0) myTurn = true;
    else myTurn = false;
  });
  socket.on("fill", (cellIndex) => {
    let i = index === 0 ? 1 : 0;
    $("#cell" + cellIndex).addClass(marks[i]);
    myTurn = true;
  });
  socket.on("result", (message) => {
    $("#replayGame p").text(message);
    $("#replayGame").css("display", "block");
  });

  $("#cellList li").on("click", function (e) {
    if (!myTurn) return;
    if ($(this).hasClass(marks[0]) || $(this).hasClass(marks[1])) return;
    $(this).addClass(marks[index]);
    let i = parseInt(e.target.id.replace("cell", ""));
    socket.emit("hit", { username: getCookie("myck").split("-")[0], index: i });
    myTurn = false;
  });

  $("#replayGame button").on("click", function () {
    location.reload();
  });
});

// Write a function to check status of tic-tac-toe game
// Ref: what is tic-tac-toe game: https://en.wikipedia.org/wiki/Tic-tac-toe
// In summary, tic-tac-toe game has 9 cells divided into 3 rows of 3 cells.
// Each cell can have 3 values: either X, O or empty.
// We say X is win if there are 3 'X' in either horizontal, vertical or diagonal row.
// The same to O.
// If 9 cells is full of values but no one win, then the game is ended.

// Given an array of 9 items: [a0, a1, ..., a7, a8] represent for the tic-tac-toe game cells value:
// |  a0  | a1  | a2  |
// |  a3  | a4  | a5  |
// |  a6  | a7  | a8  |
// Each item will receive either of 3 values: empty, X or O.
// Return an object includes two keys:
// - `status`: a string indicate status of the game. It can be one of the following values:
//    - 'X': if X is win
//    - `O`: if O is win
//    - 'END': if game is ended and no one win
//    - 'PLAYING': if no one is win and game is not ended yet.
//
// - `winPositions`:
//    - If X or O is win, return indexes of the 3 winning marks(X/O).
//    - Return empty array.

// Example:
// Input array: cellValues = ['X', 'O', 'O', '', 'X', '', '', 'O', 'X']; represent for
// |  X  | O  | O  |
// |     | X  |    |
// |     | O  | X  |
// -----
// ANSWER:
// {
//    status: 'X',
//    winPositions: [0, 4, 8],
// }
//
