import express from "express";


const app = express();


app.get("/", (req, res)=>{
    console.log("request come")
    res.setHeader("set-cookie", [
        "uid=7u7y6y;domain=localhost;path=/;max-age=60",
        `currentTime=${new Date().getSeconds()};max-age=60`
    ]);

    res.status(200).json({
        "message": "everything is working fine!",
        "cookies": req.headers.cookie || "cookies not found"
    });

});

app.get("/test", (req, res)=>{
    res.status(200).json({
        "message": "everything is working fine!",
        "cookies": req.headers.cookie || "cookies not found!"
    });
});

app.get("/h", (req, res)=>{
    res.setHeader("Set-Cookie","test=test;samesite=lax")
    res.sendFile(`${process.cwd()}/index.html`);
});

app.get("/photo", (req, res)=>{
    res.setHeader("Set-Cookie", "cookiefromImage=tracking;max-age=40")
    res.sendFile(`${process.cwd()}/img.png`)
})

app.listen(3303, "localhost", ()=> console.log(`Server running at ${3303}`))