
const http = require("http");
const route = require("./route");


http.createServer(route).listen(3000);