const fs = require("fs");
fs.writeFileSync("hello.txt", "hello world ");
const http = require("http");

const port = 4000;

const server = http.createServer((req, res) => {
  // res.end('Hello, my name is Deepak Sharma');

  if ((req.url = "/home")) {
    res.end("hello this is home page");
  } else if ((req.url = "/about")) {
    res.end("hello this is about page");
  } else if ((req.url = "/contact")) {
    res.end("hello this is contact page");
  }else{
    res.end('page not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
