const net = require('net');

const connect = () => {
  const conn = net.createConnection({
    host: '165.227.47.243',
    port: 50541
  });

  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log('Connection Successful!');
  });

  return conn;
};

module.exports = { connect };