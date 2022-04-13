const movement = { 
  w: 'Move: up',
  a: 'Move: left',
  s: 'Move: down',
  d: 'Move: right'
};

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
    return process.exit();;
  }

  if (Object.keys(movement).includes(key)) {
    console.log(movement[key]);
  }

  process.stdout.write(key);
};

module.exports = { setupInput }