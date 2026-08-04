import express from "express";
import { rm, writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with { type: "json" };
import filesData from "../filesDB.json" with { type: "json" };
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

// Read
router.get("/:id?", async (req, res) => {
  const db = req.db;
  const user = req.user;
  const id = req.params.id || user.rootDirId;
  const directoriesCollection = db.collection("directories");

  // Find the directory and verify ownership
  const directoryData = await directoriesCollection.findOne({
    _id: new ObjectId(id), userId: new ObjectId(user._id)
  });
  if (!directoryData) {
    return res
      .status(404)
      .json({ error: "Directory not found or you do not have access to it!" });
  }

  const files = [];
  const directories = await directoriesCollection.find({
    parentDirId: new ObjectId(id)
  }).toArray();
  return res.status(200).json({
    files, directories
  });
});

// create folder
router.post("/:parentDirId?", async (req, res, next) => {
  const user = req.user;
  const db = req.db;
  const directoriesCollection = await db.collection("directories");
  const parentDirId = req.params.parentDirId || user.rootDirId;
  const dirname = req.headers.dirname || "New Folder";
  try {
    const parentDir = await directoriesCollection.findOne({ _id: new ObjectId(parentDirId) });
    if (!parentDir)
      return res
        .status(404)
        .json({ message: "Parent Directory Does not exist!" });

    const createDirectory = await directoriesCollection.insertOne({
      name: dirname,
      parentDirId,
      userId: user._id,
    });
    return res.status(200).json({ message: "Directory Created!" });
  } catch (err) {
    next(err);
  }
});

// update directory name
router.patch("/:id", async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { newDirName } = req.body;
  const db = req.db;

  try {
    const directoriesCollection = db.collection("directories");

    const dirData = await directoriesCollection.findOne({ _id: new ObjectId(id) });
    console.log(dirData)
    if (!dirData)
      return res.status(404).json({ message: "Directory not found!" });

    // rename directory
    await directoriesCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: { name: newDirName }
    });

    res.status(200).json({ message: "Directory Renamed!" });
  } catch (err) {
    next(err);
  }
});


// delete a directory
router.delete("/:id", async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const db = req.db;

  const directoriesCollection = db.collection("directories");
  const filesCollection = db.collection("files");

try {
    // delete the directory itself
    await directoriesCollection.deleteOne({_id: new ObjectId(id)});
    
    // delete the others children directory
    await directoriesCollection.deleteMany({
      parentDirId: { $in: [new ObjectId(id)] },
    });
  
    // delete the children files
    await filesCollection.deleteMany({
      parentDirId: { $in: [new ObjectId(id)] },
    });

    res.status(304).json({
      "message": "directory successfully deleted!"
    });
} catch (error) {
  console.log(error.message);
  next(error);
}

});

export default router;
