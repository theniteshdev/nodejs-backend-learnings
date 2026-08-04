import express from "express";

const app = express();


app.get("/", (req, res)=>{
    res.status(200).json({
        "message": "welcome to this site!",
        "ack": "everything is working fine!"
    })
});


app.listen(80, '0.0.0.0', err=> console.log(`Server running at port 80`))