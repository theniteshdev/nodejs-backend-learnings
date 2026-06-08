import express from "express";

const app = express();


app.get("/", (req, res, next) => {
    console.log("Middleware 1")
    res.write("Hello World 1");
    next("Error Found"); // this will automatically log
}, (erro, req, res, next) => {
    console.log({ hello: erro })
    console.log("Middleware 2")
    res.write("\nHello World 2 | But there is an error !!");
    next()
}, (req, res) => {
    console.log("Middle ware 3");
    res.end("\n\tFinal Middleware")
});


app.listen(3000, 'localhost', function () {
    console.log("Server Up !");
});