const http = require("http");
const { SSL_OP_NO_TLSv1_2 } = require("node:constants");

const hostname = "localhost";
const port = 3001;

const winCondition = [
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

function winCheck(tableArray) {
  // 1 win
  if (tableArray[0] === 1 && tableArray[4] === 1 && tableArray[8] === 1)
    return true;
  else if (tableArray[0] === 1 && tableArray[4] === 1 && tableArray[8] === 1)
    return true;
  else if (tableArray[2] === 1 && tableArray[4] === 1 && tableArray[6] === 1)
    return true;
  else if (tableArray[0] === 1 && tableArray[3] === 1 && tableArray[6] === 1)
    return true;
  else if (tableArray[1] === 1 && tableArray[4] === 1 && tableArray[7] === 1)
    return true;
  else if (tableArray[0] === 1 && tableArray[4] === 1 && tableArray[8] === 1)
    return true;
  else if (tableArray[0] === 1 && tableArray[4] === 1 && tableArray[8] === 1)
    return true;
  else if (tableArray[0] === 1 && tableArray[4] === 1 && tableArray[8] === 1)
    return true;
  // 2 win
  else if (tableArray[0] === 2 && tableArray[4] === 2 && tableArray[8] === 2)
    return true;
  else if (tableArray[0] === 2 && tableArray[4] === 2 && tableArray[8] === 2)
    return true;
  else if (tableArray[2] === 2 && tableArray[4] === 2 && tableArray[6] === 2)
    return true;
  else if (tableArray[0] === 2 && tableArray[3] === 2 && tableArray[6] === 2)
    return true;
  else if (tableArray[1] === 2 && tableArray[4] === 2 && tableArray[7] === 2)
    return true;
  else if (tableArray[0] === 2 && tableArray[4] === 2 && tableArray[8] === 2)
    return true;
  else if (tableArray[0] === 2 && tableArray[4] === 2 && tableArray[8] === 2)
    return true;
  else if (tableArray[0] === 2 && tableArray[4] === 2 && tableArray[8] === 2)
    return true;
  return false;

  return false;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
