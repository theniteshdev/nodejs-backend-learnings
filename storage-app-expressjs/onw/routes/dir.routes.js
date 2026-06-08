import { Router } from "express";
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import fileTreeDB from '../fileTreeDB.json' with {type: "json"};
import path from "node:path";
import crypto from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises";

let dirTreeArray = dirTreeDB;
let fileTreeArray = fileTreeDB;
const DIR_TREE_URL = "../dirTreeDB.json";
const FILE_TREE_URL = "../fileTreeDB.json";
const dirRoutes = Router();

// create dir
dirRoutes.post("/:dirname", async (req, res, next) => {
    let { dirname } = req.params;
    const parentDirId = req.headers["parent-dir-id"] || dirTreeArray[0].id;

    const dirId = crypto.randomUUID();
    dirname = path.normalize(dirname);

    dirTreeArray = dirTreeArray.map((dir)=>{
        if(dir.id === parentDirId){
            dir.childrenDir.push(dirId);
            return dir;
        }
        return dir
    });
    

    dirTreeArray.push({
        "id": dirId,
        "name": dirname,
        "parent": parentDirId,
        "childrenDir": [],
        "files": []
    });
    // push to root dir as children
    dirTreeArray[0].childrenDir.push(dirId);

    try {
        await writeFile(`${import.meta.dirname}/${DIR_TREE_URL}`, JSON.stringify(dirTreeArray));
    } catch (error) {
        return next(error);
    }

    res.status(201).json({
        message: "Directory successfully created."
    });

});

// read dir
dirRoutes.get("/", async (req, res) => {
    res.status(200).json(dirTreeArray);
});

// rename dir
dirRoutes.put("/:id", async (req, res, next) => {
    const { id: dirId } = req.params;
    const newDirname = req.body;
    if (!newDirname) {
        return res.status(400).json({
            message: "New Filename not provided in the body."
        });
    }
    dirTreeArray = dirTreeArray.map((dir) => {
        if (dir.id === dirId) {
            return {
                ...dir,
                name: newDirname,
            }
        }
        return dir;
    });
    await writeFile(`${import.meta.dirname}/${DIR_TREE_URL}`, JSON.stringify(dirTreeArray));
    res.status(200).json({
        message: "Directory renamed successfully."
    });

});

// delete dir
dirRoutes.delete("/:id", async (req, res, next) => {
    const { id: dirId } = req.params;
    const parentDirId = req.headers["parent-dir-id"] || dirTreeArray[0].id;

    // remove dir id from parent dir
    dirTreeArray = dirTreeArray.map((dir) => {
        if (dir.id === parentDirId) {
            return {
                ...dir,
                childrenDir: dir.childrenDir.filter(childId => childId === dirId)
            }
        }
        return dir
    });

    // remove itself from root
    dirTreeArray = dirTreeArray.filter((dir) => dir.id !== dirId);

   try {
     await writeFile(`${import.meta.dirname}/${DIR_TREE_URL}`, JSON.stringify(dirTreeArray));
   } catch (error) {
    next(error)
   }
    res.status(200).json({
        message: "Directory deleted successfully."
    })

});

export default dirRoutes;
