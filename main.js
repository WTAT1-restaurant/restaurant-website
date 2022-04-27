const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const port = 3000;

const routeMap = {
    "/": "views/index.html"
};

const app = http.createServer((req, res) => {
    console.log("Received an incoming request!");
    res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html"
    });
    if (routeMap[req.url]) {
        fs.readFile(routeMap[req.url], (error, data) => {
            res.write(data);
            res.end();
        });
    } else {
        res.end("<h1>Sorry, not found.</h1>");
    }
});

app.listen(port);

console.log(`The server has started and is listening on port number: ${port}`);