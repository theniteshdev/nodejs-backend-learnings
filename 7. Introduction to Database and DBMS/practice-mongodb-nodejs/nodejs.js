import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017"); // return client instance

// connecting client, it is async operation
await client.connect();

const db = client.db();
// console.log(db.namespace);

const collectionLists = db.collectionLists();
await client.close();