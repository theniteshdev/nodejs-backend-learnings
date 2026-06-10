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
    // check all fields
    if (!req.body.name
        || !req.body.email
        || !req.body.password
    ) {
        return res.status(400).json({
            "message": "all fields are required!"
        })
    }

    // check if exists
    for (const email of emailDBArray) {
        if (email === req.body.email) {
            return res.status(400).json({
                "message": "email already exists"
            });
            break;
        }
    }

    // create unique id
    const userId = randomUUID();
    const rootDirId = randomUUID();

    // create a root directory for user
    dirDBArray.push({
        "id": rootDirId,
        "name": "storage",
        "parent": null,
        "childrenDir": [],
        "userId": req.body.email,
        "files": []
    });

    // register the user into UserDB
    userDBArray.push({
        "id": userId,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "rootDirId": rootDirId
    });

    // push the email into EmailDB
    emailDBArray.push(req.body.email);

    // update all the data in json file
    try {
        await writeFile(`${process.cwd()}/dirTreeDB.json`, JSON.stringify(dirDBArray));
        await writeFile(`${process.cwd()}/userDB.json`, JSON.stringify(userDBArray));
        await writeFile(`${process.cwd()}/allEmailsBD.json`, JSON.stringify(emailDBArray));
    } catch (error) {
        return res.status(500).json({
            "message": "registration failed!"
        })
    }

    res.status(200).json({
        "message": "signup successfully!"
    });

});

routes.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    let user = userDBArray.find((user) => {
        if (user.email === email) return true;
        return false;
    });

    if(!user){
        return res.status(404).json({
            "error": "user not registered!"
        })
    }

    // check password
    if(password !== user.password){
        return res.status(401).json({
            "error": "invalid credentials!"
        })
    }

    // set cookie
    res.set({
        "Set-Cookie": [`userId=${user.id};Max-Age=6000;path=/`, `email=${user.email};Max-Age=6000;path=/`]
    });

    return res.status(200).json({
        "message": "user successfully loggedIn!"
    });
})

export default routes;