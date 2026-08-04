import express from "express";
import dirTreeDB from '../dirTreeDB.json' with {type: "json"};
import userDB from '../userDB.json' with {type: "json"};
import emailDB from "../allEmailsBD.json" with {type: "json"};
import { writeFile } from 'node:fs/promises';
import { randomUUID } from "node:crypto";
import authorization from "../authorization.js";
import { aws4Sign } from "mongodb/src/cmap/auth/aws4.ts";

const dirDBArray = dirTreeDB;
const userDBArray = userDB;
const emailDBArray = emailDB;

const routes = express.Router();

routes.post("/signup", async (req, res, next) => {
    const { db } = req;
    // check all fields
    if (!req.body.name
        || !req.body.email
        || !req.body.password
    ) {
        return res.status(400).json({
            "message": "all fields are required!"
        })
    }
    const allEmail = await db.collection("users").find({}, {
        projection: { email: 1, _id: 0 }
    });
    // check if exists
    for await (const email of allEmail) {
        const { email: userEmail } = email;
        if (userEmail === req.body.email) {
            return res.status(400).json({
                "message": "email already exists"
            });
            break;
        }
    }
    // collections
    const userCollection = db.collection("users");
    const directoryCollection = db.collection("directory");
    const rootDirId = (await directoryCollection.insertOne({
        "name": "storage",
        "parent": null,
        "childrenDir": [],
        "userId": req.body.email,
        "files": []
    })).insertedId; // get insertedId

    // register the user into UserDB
    await userCollection.insertOne({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "rootDirId": rootDirId
    });

    res.status(200).json({
        "message": "signup successfully!"
    });

});

routes.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const { db } = req;
    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return res.status(404).json({
            "error": "user not registered!"
        })
    }

    // check password
    if (password !== user.password) {
        return res.status(401).json({
            "error": "invalid credentials!"
        })
    }

    // set cookie
    res.set({
        "Set-Cookie": [`userId=${user._id};Max-Age=6000;path=/`, `email=${user.email};Max-Age=6000;path=/`]
    });

    return res.status(200).json({
        "message": "user successfully loggedIn!"
    });
});
routes.post("/logout", authorization, (req, res, next) => {
    res.clearCookie('email')
    res.clearCookie('userId')
    res.status(204).json({
        "message": "successfully logout!"
    });
});

routes.get("/", authorization, (req, res) => {
    const { userId } = req;
    const user = userDBArray.find(user => user.id === userId);
    res.status(200).json({
        ...user
    })
})

export default routes;