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
let message = '';
let logMessage = false;

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
  if (key === '\u0003') { //Ctrl+C
    console.log('Connection Terminated!');
    return process.exit();;
  }

  if (key === '\u0013') { //Ctrl+S
    logMessage = true;
  } else if (logMessage) {
    message += key;
  }

  if (key === '\r' && logMessage) { //Send Message
    connection.write(`Say: ${message}`);
    message = "";
    logMessage = false;
  }

  if (Object.keys(movement).includes(key) && !logMessage) { // WASD Movement
    if (intervalID !== undefined) {
      clearInterval(intervalID);
    }
    
    if (AUTO_MOVE_DEFAULT) {
      intervalID = setInterval(() => {
        connection.write(movement[key]);
      }, GAME_SPEED * 100);
    } else {
      connection.write(movement[key]);
    }
  }

};

module.exports = { setupInput }