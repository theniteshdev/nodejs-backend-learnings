// in this file i will going to learn middlewares in expressjs

import express from "express";

const app = express();

// here the next is a middleware that is simply a function
app.get("/",

    (req, res, next) => {
        console.log("rng md-1");
        res.write("1- hey, \n");
        // res.end();
        next("hi")
        console.log("ok")
    },
    (err, req, res, next) => {
        console.log(err);
        console.log("error middleware running")
        res.end("OK Error found")
    },
    (req, res, next) => {
        console.log("rng md-2");
        res.write("2- hey, \n");
    },
    (req, res, next) => {
        console.log("rng md-3");
        res.write("3- hey, \n");
    },
    (req, res, next) => {
        console.log("rng md-4");
        res.write("4- hey, \n");
    },

);



// listening the server 
const listeningServerHandle = (err) => {
    if (!err) {
        console.log("Server Up!");
        console.log("Server URL - http://localhost:3000/");
    } else {
        console.log("error occurred!");
    };
};

app.listen(3000, "localhost", listeningServerHandle);