import express from "express";
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import userDB from '../userDB.json' with {type: "json"};
import { writeFile } from 'node:fs/promises';
import { randomUUID } from "node:crypto";

const dirDBArray = dirTreeDB;
const userDBArray = userDB;

const routes = express.Router();

routes.post("/signup", async (req, res, next) => {
    if (!body.name
        || !body.email
        || !body.password
    ) {
        return res.status(400).json({
            "message": "all fields are required!"
        })
    }

    const userId = randomUUID();
    const rootDirId = randomUUID();

    dirDBArray.push({
        "id": rootDirId,
        "name": "storage",
        "parent": null,
        "childrenDir": [],
        "userId": userId,
        "files": []
    });
    userDBArray.push({
        "name": body.name,
        "email": body.email,
        "passowrd": body.password,
        "rootDirId": body.rootDirId
    })

    try {
        writeFile(`${process.cwd()}/dirTreeDB.json`, JSON.stringify(dirDBArray));
        writeFile(`${process.cwd()}/userDB.json`, JSON.stringify(userDBArray));
    } catch (error) {
        return res.status(500).json({
            "message": "registration failed!"
        })
    };

    res.status(200).json({
        "message": "signup successfully!"
    })

});

export default routes;