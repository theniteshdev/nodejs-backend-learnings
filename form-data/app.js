import express from "express";

const app = express();

// ways of parsing form
// app.use(express.text());
app.use(express.urlencoded({
    "extended": false, // this makes the object and its prototype is null
    // "extended": false, this return a object
}));

app.use(express.raw());
app.use(express.json());

app.use(express.static("./public"))

app.post("/submit", (req, res) => {
    req.on("data", (chunk) => {
        console.log(chunk.toString());
    });

    req.on("end", () => {
        res.end("ok")
    })
});

app.listen(5040, "localhost", (err) => console.log("Server running at port 5040"));

// create a object with no prototype

// const obj = Object.create(null);
// const obj2 = new Object();

// obj.name = "niteshdev";
// obj2.name = "niteshdev";
// obj.email = "theniteshdev@gmail.com";
// obj2.email = "theniteshdev@gmail.com";
// console.log(obj);
// console.log(obj2);