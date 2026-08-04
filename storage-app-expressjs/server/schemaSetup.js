import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017/storageDB");
const db = client.db();

db.command({
    collMod: "users",
    validator: {
        $jsonSchema: {
            required: ["_id", "name", "email", "password", "rootDirId"],
            properties: {
                _id: { bsonType: "objectId" },
                name: { bsonType: "string", minLength: 3, maxLength: 50 },
                email: { bsonType: "string", pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i },
                password: { bsonType: "string", minLength: 4, maxLength: 8 },
                rootDirId: { bsonType: "objectId" },
            },
            additionalProperties: false
        }
    }
})