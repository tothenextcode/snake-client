const { setPriority } = require('os');
const { connect } = require('./client');

const setupInput = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
}

const handleUserInput = (key) => {
  if (key === '\u0003') {
    console.log('Connection Terminated!');
    connection.end();
    return process.exit();;
  }

  process.stdout.write(key);
};

console.log('Connecting...');
const connection = connect();
const stdin = setupInput();