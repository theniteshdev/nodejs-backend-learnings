import express from "express";
import cors from "cors";
import { dirRoutes, fileRoutes, authRoutes } from "./routes/index.js"
import cookieParser from "cookie-parser";
import authorization from "./authorization.js";
import connectDB from "./db.js";

// connecting to mongodb
const db = await connectDB();

const app = express();
const port = 5000;
const hostname = 'localhost';

app.use((req, res, next) => {
    req.db = db;
    next();
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/file", authorization, fileRoutes);
app.use("/dir", authorization, dirRoutes);
app.use("/user", authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack); // Log for debugging
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
});

app.listen(port, hostname, (error) => {
    if (!error) {
        console.log(`Server Up at port ${port}`);
    } else {
        console.log(`Something went wrong while bind server into port ${port}`)
    }
})