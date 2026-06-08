import express from 'express'

const app = express();
const port = 3000;
const hostname = "127.1.1.11";

app.get("/", (req, res) => {
    res.setHeader("Allow-Origin-Access-Control", "*");
    console.log(req.path);
    res.setHeader("Content-Type", "application/json");
    res.json({
        "success": true,
        "message": "Hello World !",
        "whoami": "Hi, there I am nitesh."
    });
    res.end();
});

app.listen(port, hostname, (err) => {
    if (err) {
        console.log("Something went wrong !!");
    } else {
        console.log(`Server Up || Server URL - http://${hostname}:${port}/ `);
    }
});