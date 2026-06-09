import express from "express";
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import userDB from '../userDB.json' with {type: "json"};
import emailDB from "../allEmailsBD.json" with {type: "json"};
import { writeFile } from 'node:fs/promises';
import { randomUUID } from "node:crypto";

const dirDBArray = dirTreeDB;
const userDBArray = userDB;
const emailDBArray = emailDB;

const routes = express.Router();

routes.post("/signup", async (req, res, next) => {
    if (!req.body.name
        || !req.body.email
        || !req.body.password
    ) {
        return res.status(400).json({
            "message": "all fields are required!"
        })
    }
    for (const email of emailDBArray) {
        if (email === req.body.email) {
            return res.status(400).json({
                "message": "email already exists"
            });
            break;
        }
    }
    const userId = randomUUID();
    const rootDirId = randomUUID();

    dirDBArray.push({
        "id": rootDirId,
        "name": "storage",
        "parent": null,
        "childrenDir": [],
        "userId": req.body.email,
        "files": []
    });
    userDBArray.push({
        "name": req.body.name,
        "email": req.body.email,
        "passowrd": req.body.password,
        "rootDirId": rootDirId
    });
    emailDBArray.push(req.body.email);

    try {
        writeFile(`${process.cwd()}/dirTreeDB.json`, JSON.stringify(dirDBArray));
        writeFile(`${process.cwd()}/userDB.json`, JSON.stringify(userDBArray));
        writeFile(`${process.cwd()}/allEmailsBD.json`, JSON.stringify(emailDBArray));
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