import express from "express";

const app = express();

// app.use((req, res, next) => {
//     console.log("Global Middleware");
//     res.end("Global Middleware");
// })

app.post("/login", (req, res) => {
    res.send("Login !")
});

// app.post()
// app.put()
// app.delete()
// app.patch()
// app.patch()
// app.head()

app.listen(3003)