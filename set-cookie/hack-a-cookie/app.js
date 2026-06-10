import express from "express";

const app = express();


app.get("/", (req, res)=>{
    res.setHeader("Set-Cookie", [
        "uid=432",
        "secret=t65y"
    ])
  res.sendFile(`${process.cwd()}/index.html`)

});

app.listen(2000, "localhost", err=> console.log(("Server is running at port 2000!")))