
const express = require('express')
let app = express();
const bodyParser = require( "body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//var cors = require('cors');

const hostname = "127.0.0.1";
const port = 3001;

const winCondition = [{}];

app.use(express.static('client'));


function winCheck(tableArray, player) {
  if (tableArray[0] == player && tableArray[4] == player && tableArray[8] == player)
    return true;
  else if (tableArray[0] === player && tableArray[4] === player && tableArray[8] === player)
    return true;
  else if (tableArray[2] === player && tableArray[4] === player && tableArray[6] === player)
    return true;
  else if (tableArray[0] === player && tableArray[3] === player && tableArray[6] === player)
    return true;
  else if (tableArray[1] === player && tableArray[4] === player && tableArray[7] === player)
    return true;
  else if (tableArray[0] === player && tableArray[4] === player && tableArray[8] === player)
    return true;
  else if (tableArray[0] === player && tableArray[4] === player && tableArray[8] === player)
    return true;
  else if (tableArray[0] === player && tableArray[4] === player && tableArray[8] === player)
    return true;
  return false;
}

app.get('/', (req, res)=> {
  res.render(__dirname + 'index.html')
})

app.post('/array', (req, res)=>{
  let array = JSON.parse(req.body.array);
  //let user = req.body.user;
  let isWin = winCheck(array, 1) || winCheck(array, 2);
  res.json(isWin);

})

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});