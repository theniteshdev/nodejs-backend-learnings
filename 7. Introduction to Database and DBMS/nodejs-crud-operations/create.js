import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("school_db");

const studentsCollection = db.collection("students");
const teacherCollection = db.collection("teachers");

await studentsCollection.insertOne({
    name: "Akash",
    age: 13,
    std: 4
});

await teacherCollection.insertMany([
    { name: "Anand", salary: 45000, subject: "English" },
    { name: "Preeti", salary: 42000, subject: "Biology" },
    { name: "Raj", salary: 50000, subject: "Computer Science" },
])

client.close();
