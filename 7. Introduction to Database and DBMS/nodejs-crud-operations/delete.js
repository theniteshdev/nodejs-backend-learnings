import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("school_db");

// const studentsCollection = db.collection("students");
const teacherCollection = db.collection("teachers");

// delete a document
// let isDelete = await teacherCollection.deleteOne({ name: "Preeti" })


console.log(isDelete)

client.close();
