const movement = { 
  w: 'Move: up',
  a: 'Move: left',
  s: 'Move: down',
  d: 'Move: right'
};
const GAME_SPEED = 1; //(1-10)
const AUTO_MOVE_DEFAULT = true;

let connection;
let intervalID;
let msg = '';

const setupInput = (conn) => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  connection = conn;
  return stdin;
}

const handleUserInput = (key) => {
  if (key === '\u0003') {
    console.log('Connection Terminated!');
    return process.exit();;
  }

  if (Object.keys(movement).includes(key)) {
    if (intervalID !== undefined) {
      clearInterval(intervalID);
    }
    
    if (AUTO_MOVE_DEFAULT) {
      intervalID = setInterval(() => {
        connection.write(movement[key]);
      }, GAME_SPEED * 100);
      return;
    }

    connection.write(movement[key]);
  }
};

module.exports = { setupInput }