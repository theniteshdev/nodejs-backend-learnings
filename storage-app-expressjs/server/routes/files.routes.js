import { Router } from "express";
import { randomUUID } from "node:crypto";
import { createWriteStream, writeFile } from "node:fs";
import fs from "node:fs/promises"
import path from "node:path";
import fileTreeDB from '../fileTreeDB.json' with {type: "json"};
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import authorization from "../authorization.js";
let fileTreeArray = fileTreeDB;
let dirTreeArray = dirTreeDB;

const FILE_TREE_URL = "../fileTreeDB.json";
const DIR_TREE_URL = "../dirTreeDB.json";
const FILE_STORAGE_LOCATION = `/home/nitesh/Desktop/nodejs-backend/storage-app-expressjs/onw/storage` || `${process.cwd()}/storage`;

const fileRoutes = Router();
// create file
fileRoutes.post("/:filename",authorization, async (req, res, next) => {
    let filename = req.params.filename;
    const rootDir = dirTreeArray.find(dir=>{
        if(dir.userId === req.email)return true;
        return false;
    });

    const parentDirId = req.headers["parent-dir-id"] || rootDir.id;

    const fileId = randomUUID();
    const fileExtension = path.extname(filename);
    const fileCreatePath = path.normalize(`./storage/${fileId}${fileExtension}`);
    const writeStream = createWriteStream(fileCreatePath);
    req.pipe(writeStream);
    req.on("end", async () => {

        fileTreeArray.push({
            "id": fileId || null,
            "name": filename || null,
            "extension": fileExtension || null,
            "parentDir": parentDirId,
        });

        dirTreeArray = dirTreeArray.map((dir) => {
            if (dir.id === parentDirId) dir.files.push(fileId);
            return dir
        })

        try {
            await fs.writeFile(`${import.meta.dirname}/${FILE_TREE_URL}`, JSON.stringify(fileTreeArray))
            await fs.writeFile(`${import.meta.dirname}/${DIR_TREE_URL}`, JSON.stringify(dirTreeArray))
        } catch (error) {
            error.status = 500;
            next(error);
        }
        res.status(200).json({
            message: "File Successfully Uploaded on the server."
        });
    });
    req.on("error", () => {
        res.status(500).json({
            message: "File Uploading failed !"
        })
    });
});

// read file
fileRoutes.get("/:id",authorization, (req, res, next) => {
    // res.write("Request received on server. \n");
    const { id: fileId } = req.params;
    let requestedFile = fileTreeArray.find((file) => {
        if (file.id === fileId) {
            console.log("Requsted file found in tree !");
            return file
        }
    });
    if (!requestedFile) {
        return res.status(404).json({
            message: "File Not Found !"
        });
    }
    res.sendFile(`${FILE_STORAGE_LOCATION}/${fileId}${requestedFile.extension}`);
});

// rename file
fileRoutes.put("/:id",authorization, async (req, res, next) => {
    const newFilename = req.body?.newFilename || null;
    const { id: fileid } = req.params;
    if (!newFilename) {
        res.status(400).json({
            error: "New File NOT Provided in the Body."
        })
    };
    let isFileRenamed = false;
    fileTreeArray = fileTreeArray.map((file) => {
        if (file.id === fileid) {
            isFileRenamed = true;
            return {
                ...file,
                name: newFilename
            }
        } else return file
    })

    if (!isFileRenamed) {
        return res.status(404).json({
            error: "File NOT Found !"
        })
    }
    await fs.writeFile(`${import.meta.dirname}/${FILE_TREE_URL}`, JSON.stringify(fileTreeArray))
    res.status(200).json({
        message: "File renamed successfully."
    })

});

// delete file
fileRoutes.delete("/:id",authorization, async (req, res) => {
    const { id: fileId } = req.params;
    const rootDir = dirTreeArray.find(dir=>{
        if(dir.userId === req.email)return true;
        return false;
    });
    const parentDirId = req.headers["parent-dir-id"] || rootDir.id;
    let foundFile = {};
    fileTreeArray = fileTreeArray.filter((file) => {
        if (file.id === fileId) {
            foundFile = { ...file };
            return false;
        } else {
            return true;
        }
    });

    dirTreeArray = dirTreeArray.map((dir) => {
        if (dir.id === parentDirId) {
            return {
                ...dir,
                files: dir.files.filter((id) => id !== fileId)
            }
        }
        return dir;
    });

    await fs.writeFile(`${import.meta.dirname}/${FILE_TREE_URL}`, JSON.stringify(fileTreeArray));
    await fs.writeFile(`${import.meta.dirname}/${DIR_TREE_URL}`, JSON.stringify(dirTreeArray));
    // deleting file
    await fs.unlink(`${FILE_STORAGE_LOCATION}/${fileId}${foundFile.extension}`);
    res.status(200).json({
        message: "File Successfully deleted"
    });
});

export default fileRoutes;
