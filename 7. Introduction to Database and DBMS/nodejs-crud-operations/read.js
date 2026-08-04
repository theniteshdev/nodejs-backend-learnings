import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("e-com");

const collection = db.collection("products");

console.log(await collection.find({name: "testing"}).toArray());

client.close();
