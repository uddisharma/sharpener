const fs = require("fs");
fs.writeFileSync("hello.txt", "hello world ");
const http = require("http");

const port = 4000;

const server = http.createServer((req, res) => {
  // res.end('Hello, my name is Deepak Sharma');

  // if ((req.url = "/home")) {
  //   res.end("hello this is home page");
  // } else if ((req.url = "/about")) {
  //   res.end("hello this is about page");
  // } else if ((req.url = "/contact")) {
  //   res.end("hello this is contact page");
  // }else{
  //   res.end('page not found');
  // }
  if (req.url === "/") {
    req.write("<html>");
    req.write("<head><title>send me a message</title></head");
    req.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"></input></form></body>'
    );
    req.write("</html>");
    return res.end()
    if(req.url === "/message" && req.method === "POST"){
      const body=[];
      req.on("data",chunk=>{
        console.log(chunk.toString());
        body.push(chunk);
      })
      req.end("end",()=>{
        const bodyparser=Buffer.concat(body).toString();
        const message= bodyparser.split('m')[1];
        fs.writeFileSync('message.txt',message)
      })
      res.statusCode = 302;
      req.setHeaders('Location',"/")
      return res.end();
    }
  }
  res.setHeaders('Content-Type','text/html');
  req.write("<html>");
  req.write("<head><title>send me a message</title></head");
  req.write(
    '<body><form action="/message" method="POST"><input type="text" name="message"></input></form></body>'
  );
  req.write("</html>");

});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
