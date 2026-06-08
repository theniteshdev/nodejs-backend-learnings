console.log("OK")
import express from 'express'
let server = express();
// console.log(express);
// console.log(server);

server.get("/", (req, res) => {
    console.log(req.path);
    res.setHeader("Content-Type", "text/html; chatset=utf-8")
    res.send("Hello World ! 👋");
    res.end();
});

server.listen(2000, "::", (error) => {
    console.log("Server Up!")
    console.log("Server URL - http://127.0.0.1:2000/")
})