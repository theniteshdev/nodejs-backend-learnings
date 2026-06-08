import express from "express";
// console.log(express);

const app = express();

app.get("/", (req, res) => {
    res.send("💎 Hello World ! This reponse from expressjs server.");
});

app.listen(3000, "localhost", () => {
    console.log(`Server is running at port ${3000}`)
})