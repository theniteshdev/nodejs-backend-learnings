import { MongoClient } from "mongodb";

const mongoURL = "mongodb://localhost:27017";
const client = new MongoClient(mongoURL);

const db = await client.db("e-com");
console.log(await db.listCollections().toArray())
const productCollection = await db.collection("products");
// console.log(await productCollection.countDocuments())