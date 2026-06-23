import express from "express";
import { createWriteStream } from "node:fs";
import { rm, writeFile } from "node:fs/promises";
import path from "node:path";

import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

// create a new file in the specified parent directory or in the root directory if no parentDirId is provided
router.post("/:parentDirId?", async (req, res, next) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId;
  const db = req.db;
  try {
    const directoriesCollection = db.collection("directories");
    const filesCollection = db.collection("files");
    const parentDirData = await directoriesCollection.findOne({
      _id: new ObjectId(parentDirId),
      userId: req.user._id,
    });

    // Check if parent directory exists
    if (!parentDirData) {
      return res.status(404).json({ error: "Parent directory not found!" });
    }

    const filename = req.headers.filename || "untitled";
    const extension = path.extname(filename);
    const id = (
      await filesCollection.insertOne({
        extension,
        name: filename,
        parentDirId,
        userId: req.user._id,
      })
    ).insertedId.toString();

    const fullFileName = `${id}${extension}`;

    const writeStream = createWriteStream(`./storage/${fullFileName}`);
    req.pipe(writeStream);

    writeStream.on("finish", () => {
      return res.status(201).json({ message: "File Uploaded" });
    });

    writeStream.on("error", async (error) => {
      await filesCollection.deleteOne({ _id: id });
      console.log("file deleted!");
      return res.status(201).json({ message: "Couldn't upload file!" });
      next(error);
    });
  } catch (err) {
    next(err);
  }
});

// get a file by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const user = req.user;
  const filesCollection = db.collection("files");
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
  });

  // Check if file exists
  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  // If "download" is requested, set the appropriate headers
  const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;

  if (req.query.action === "download") {
    return res.download(filePath, fileData.name);
  }

  // Send file
  return res.sendFile(filePath, (err) => {
    if (!res.headersSent && err) {
      return res.status(404).json({ error: "File not found!" });
    }
  });
});

// update the name of the file
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const user = req.user;
  const newFilename = req.body.newFilename;
  try {
    const filesCollection = db.collection("files");
    const fileData = await filesCollection.findOne({
      _id: new ObjectId(id),
    });
    // Check if file exists
    if (!fileData) {
      return res.status(404).json({ error: "File not found!" });
    }

    // Perform rename
    await filesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: newFilename } },
    );

    return res.status(200).json({ message: "Renamed" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
 try {
   const filesCollection = db.collection("files");

   const fileData = (await filesCollection.findOne({ _id: new ObjectId(id) })); 

   if(!fileData){
    return res.send(404).json({
      "message": "File not found!"
    })
   }

    // delete file object from db
   const fileIndex = await filesCollection.deleteOne({
     _id: new ObjectId(id),
   });
   // delete file from storage directory
   await rm(`./storage/${id}${fileData.extension}`);
   
   return res.status(200).json({ message: "File Deleted Successfully" });
 } catch (error) {
  error.status = 500;
  next(error);
 }
});

export default router;
