const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html>");
        res.write("<body><title>Enter Message</title></body>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form></body>")
        res.write("</html>");
        return res.end();
        
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        //fs.writeFileSync('message.txt', 'DUMMY');
        req.on('data', (chunck) => {
            body.push(chunck);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            //console.log(parseBody);
            const messageContent = parseBody.split("=")[1];
            fs.writeFileSync('message.txt', messageContent);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.writeHead(200, {"Content-Type" : "text/html"});
    res.write("<html>");
    res.write("<body><title>Request/Response Demo</title></body>");
    res.write("<body><h1>Hello! Test for the request and response...</h1></body>")
    res.write("</html>");
    res.end();
}

module.exports = requestHandler;