const app = require('./app');
const http = require('http');
const connectToDB = require('./db');

connectToDB();

const server = http.createServer(app);

server.listen(7000, () => {
  console.log(`Server running on port 7000`);
});