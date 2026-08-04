import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

const alldbs = await client.db().admin().listDatabases();
for (const db of alldbs.databases) {
    console.log(db.name)
}

client.close();