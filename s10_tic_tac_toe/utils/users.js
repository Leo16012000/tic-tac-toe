let users = [];
let rooms = {};

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

// Join user to chat
function userJoin(id, username, room) {
  let tick = "O";
  if (!rooms[room]) {
    rooms[room] = Array(9).fill(-1);
    tick = "X";
  }

  const user = { id, username, room, tick };
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  let user;
  if (index !== -1) {
    user = users.splice(index, 1)[0];
  }
  if (user) {
    const room = user.room;
    const index2 = users.findIndex((user) => user.room === room);
    if (index2 === -1) {
      rooms[room] = null;
    }
    return user;
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function play(id, index) {
  const user = getCurrentUser(id);
  const room = user.room;
  rooms[room][index] = user.tick;
  if (winCheck(rooms[room], user.tick)) {
    rooms[room] = Array(9).fill(-1);
    return `${user.username} THẮNG !`;
  }
  if (rooms[room].every((tick) => tick !== -1)) {
    rooms[room] = Array(9).fill(-1);
    return `HÒA !`;
  }
  return "";
}

function resetRoom(room) {
  if (rooms[room]) {
    rooms[room] = Array(9).fill(-1);
  }
}

function isEmptyRoom(room) {
  if (rooms[room]) {
    return !rooms[room].some((tick) => tick !== -1);
  }
  return true;
}

function isFullRoom(room) {
  return users.filter((user) => user.room == room).length === 2;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  play,
  resetRoom,
  isEmptyRoom,
  isFullRoom,
};
