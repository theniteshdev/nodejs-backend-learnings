import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("booksStore");

const allBooks = db.collection("books");
console.log(await allBooks.find());