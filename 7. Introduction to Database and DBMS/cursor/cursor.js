import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("booksStore");
const booksCollection = db.collection("books");
/*
const ack1 = await booksCollection.insertMany([
    {
        title: "OS Concepts",
        author: "Peter Galvin"
    },
    {
        title: "The Pragmatic Programmer",
        author: "David Thomas"
    },
    {
        title: "The Web Application Hacker's Handbook",
        author: "PostgresSQL"
    },
    {
        title: "Root Cause",
        author: "Hussain Nasser"
    }
]);

console.log(ack1);
*/

const data = await booksCollection.find().skip(2).sort({
    // title: -1, -> descending order
    // title: 1, -> ascending order
});
console.log(await data.toArray());

/*
We have many methods in cursor-
.find() //find the document if we pass a object it will filter it as
.skip() // this skip the index no. of then find the next document
.limit() // we can pass a number, it only shows the amount of document number we pass
*/

await client.close();