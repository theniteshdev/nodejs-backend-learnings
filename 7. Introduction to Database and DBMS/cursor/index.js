import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("e-com");
// await db.createCollection("users");
// const collections = db.listCollections();
// for await (const collection of collections) {
//     console.log(collection);
// };

const products = db.collection("products").find().sort({ amount: 1 });
console.log(await products.toArray())
client.close();