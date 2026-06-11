import { Router } from "express";
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import fileTreeDB from '../fileTreeDB.json' with {type: "json"};
import path from "node:path";
import crypto from "node:crypto"
import { writeFile } from "node:fs/promises";


let dirTreeArray = dirTreeDB;
let fileTreeArray = fileTreeDB;
const DIR_TREE_URL = "../dirTreeDB.json";
const FILE_TREE_URL = "../fileTreeDB.json";
const dirRoutes = Router();

// create dir
dirRoutes.post("/:dirname", async (req, res, next) => {
    let { dirname } = req.params;

    // get user root dir
    const userRootDir = dirTreeArray.find(dir => {
        if (dir.userId === req.email && dir.parent === null) return true;
        return false;
    });
    console.log(userRootDir)

    const parentDirId = req.headers["parent-dir-id"] || userRootDir.id;

    const dirId = crypto.randomUUID();
    dirname = path.normalize(dirname);

    // push dir id into parent dir
    dirTreeArray = dirTreeArray.map((dir) => {
        if (dir.id === parentDirId) {
            dir.childrenDir.push(dirId);
            return dir;
        }
        return dir
    });

    // create new dir
    dirTreeArray.push({
        "id": dirId,
        "name": dirname,
        "parent": parentDirId,
        "childrenDir": [],
        "files": [],
        "userId": req.email,
    });


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

    const userDirData = dirTreeArray.filter(dir => {
        if (dir.userId === req.email) return true;
        return false;
    })
    res.status(200).json(userDirData);
});

// rename dir
dirRoutes.put("/:id", async (req, res, next) => {
    const { id: dirId } = req.params;
    const { newDirname } = req.body;
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

    // getting root-dir of the dir
    const rootDir = dirTreeArray.find(dir => {
        if (dir.userId === req.email) return true;
        return false;
    })

    const parentDirId = req.headers["parent-dir-id"] || rootDir.id

    // remove dir id from parent dir
    dirTreeArray = dirTreeArray.map((dir) => {
        if (dir.id === parentDirId) {
            return {
                ...dir,
                childrenDir: dir.childrenDir.filter(childId => childId !== dirId)
            }
        }
        return dir
    });

    // remove itself from dirTreeArray
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
