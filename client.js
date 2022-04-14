const net = require('net');

const connect = () => {
  const conn = net.createConnection({
    host: '10.0.2.15', //'165.227.47.243',
    port: 50541
  });

  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log('Successfully connected to game server');
    conn.write('Name: JCF');
  });

  return conn;
};

module.exports = { connect };