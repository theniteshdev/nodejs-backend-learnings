import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("booksStore");

const allBooks = await db.collection("books");
const booksCursor = await allBooks.find({}, {
    projection: {title: 1, _id:0}
}).limit(5).skip(0);

console.log("--------------------------------------")
for await (const book of booksCursor){
    console.log(book);
    console.log(await booksCursor.hasNext());

}


await client.close()