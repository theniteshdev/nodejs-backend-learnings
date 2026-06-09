import express from "express";
import cors from "cors";
import { dirRoutes, fileRoutes, authRoutes } from "./routes/index.js"

const app = express();
const port = 4000;
const hostname = 'localhost';

app.use(cors());
app.use(express.json());

app.use("/file", fileRoutes);
app.use("/dir", dirRoutes);
app.use("/user", authRoutes);

app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(error.status || 500).json({
        message: "Something went wrong!"
    })
})

app.listen(port, hostname, (error) => {
    if (!error) {
        console.log(`Server Up at port ${port}`);
    } else {
        console.log(`Something went wrong while bind server into port ${port}`)
    }
})