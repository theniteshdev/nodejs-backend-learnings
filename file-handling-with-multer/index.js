import express from "express";
import path from 'node:path'
import crypto from 'node:crypto'
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })
// app.post("/upload", upload.single("profile_pic"), (req, res) => {
//     res.status(200).json({
//         "message": "file uploaded",
//         ...req.file || req.files
//     })

// req.on('data', (chunk) => {
//     console.log(chunk.toString());
// });
// req.on("end", () => {
//     res.status(201).json({
//         "success": true,
//         "message": "file uploaded successfully!"
//     })
// });
// req.on("error", (err) => {
//     res.status(500).json({
//         "success": false,
//         "error": "Something went wrong while uploading file!"
//     })
// })
// })

app.post("/upload", upload.fields([
    { name: "profile_pic", maxCount: 8 },
    { name: "bg_image", maxCount: 2 }
]), (req, res) => {
    console.log(req.body)
    console.log(req.files)
    res.status(200).json({
        "message": "file uploaded",
        ...req.file || req.files
    })
})

app.listen(2000, "localhost", (err) => {
    if (!err) {
        console.log(`Server up at port ${2000}`);
    } else {
        console.log("Something went wrong!");
        process.exit(1);
    }
})