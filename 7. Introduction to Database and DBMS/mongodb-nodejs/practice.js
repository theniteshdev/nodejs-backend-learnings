import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

// select a database
const db = client.db("expenseApp");

// ------------READ OPERATION--------------------
// list all collections
// const collections = db.listCollections();
// console.log(await  collections.toArray());

// select collection
const users = db.collection("users");
const usersData = await  users.find().toArray();
console.log(usersData)

// close the mongodb connection
await  client.close();
/*
find() method return the find cursor
*/