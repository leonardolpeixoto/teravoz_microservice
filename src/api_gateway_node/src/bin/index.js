const gateway = require('../index');
const http = require('http');

const server = http.createServer(gateway);

server.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});