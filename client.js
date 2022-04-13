const net = require('net');

const connect = () => {
  const conn = net.createConnection({
    host: '165.227.47.243',
    port: 50541
  });

  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log('Successfully connected to game server');
    conn.write('Name: KEK');
  });

  return conn;
};

module.exports = { connect };