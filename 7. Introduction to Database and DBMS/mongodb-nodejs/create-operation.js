import {MongoClient} from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");

// ----------------CREATE OPERATION--------------------
const schoolDB = client.db("school");
const teachersCollection = schoolDB.collection("teachers");
const studentsCollection = schoolDB.collection("students");
const staffsCollection = schoolDB.collection("staffs");
const feeCollection = schoolDB.collection("fee");

// const allCollections = await schoolDB.listCollections();
// const lists = await  schoolDB.listCollections({ name: "teachers" });
// console.log(await  allCollections.toArray())

/*
const ack = await teachersCollection.insertMany([
    {
        firstname: "ravi",
        lastname:"sharma",
        age: 35,
        email: "ravis@gmail.com",
        subject: "CS",
        salary: 55000
    },
    {
        firstname: "pritish",
        lastname: "mitra",
        age: 39,
        email: 'pritish@mitra.com',
        subject: "CS",
        salary: 52000
    }
]);
console.log(ack);
*/


/*
const ack = await studentsCollection.insertMany([
    {
        firstname: "rahul",
        lastname:"singh",
        age: 14,
        email: "rahulsing@gmail.com"
    },
    {
        firstname: "abhisek",
        lastname: "gope",
        age: 13,
        email: 'abhisek@gmail.com'
    },
    {
        firstname: "soumil",
        lastname: "prakash",
        age: 15,
        email: "soumil@gmail.com"
    }
]);
console.log(ack);
*/

// ----------------DELETE OPERATION--------------------
// const ack1 = await teachersCollection.drop();
// const ack2 = await studentsCollection.drop();
// const ack3 = await staffsCollection.drop();
// const ack4 = await feeCollection.drop();

// console.log(ack1);
// console.log(ack2 ? "deleted" : "delete operation failed!");
// console.log(ack3);
// console.log(ack4);

// delete document
// const ack1 = await teachersCollection.deleteOne({
//     firstname: "pritish"
// });
// console.log(ack1);

// delete a particular field
const ack = await teachersCollection.updateOne({
    firstname: "nikhil"
}, {
    // $set: {salary: 85000} -> update
    // $unset: {salary: 85000} -> delete field
})
console.log(ack)
// delete database
// const expenseApp = client.db("expenseApp");
// const ack1 = expenseApp.dropDatabase();
// console.log(await ack1);

// close the mongodb connection
await client.close()