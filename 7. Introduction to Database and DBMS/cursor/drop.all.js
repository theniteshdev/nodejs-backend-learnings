import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");


const alldbs = await client.db().admin().listDatabases();

for await (const db of alldbs.databases) {
    if (db.name === "admin" || db.name === "local" || db.name === "config") {
        continue;
    }
    const isdeleted = await client.db(`${db.name}`).dropDatabase();
    console.log(isdeleted)
};

client.close();