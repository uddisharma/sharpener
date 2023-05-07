const fs = require("fs");
fs.writeFileSync("hello.txt", "hello world ");
const http = require('http');

const port = 4000;

const server = http.createServer((req, res) => {
  res.end('Hello, my name is Deepak Sharma');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
