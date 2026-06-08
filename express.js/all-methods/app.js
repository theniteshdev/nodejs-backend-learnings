import express from "express"

const app = express()

app.use("/api", (req, res) => {
    res.send("Running middleware 2 | /api")
})
app.use("/api/login", (req, res) => {
    res.send("Running middleware 1 | /api/login")
})


/*
here in this case when we send request to /api/login then /api runs because when we send request our url is /api/login and here is the /api is purely a substring of /api/login so here /api route runs
*/

app.listen(3434, () => {
    console.log(`Server Up !`)
})