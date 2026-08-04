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

const arr = [
    {
        "category": "Backend Development",
        "title": "Designing Data-Intensive Applications",
        "author": "Martin Kleppmann",
        "amount_inr": 4341
    },
    {
        "category": "Backend Development",
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "amount_inr": 3067
    },
    {
        "category": "Backend Development",
        "title": "Building Microservices",
        "author": "Sam Newman",
        "amount_inr": 3586
    },
    {
        "category": "Backend Development",
        "title": "High Performance MySQL",
        "author": "Silvia Botros and Jeremy Tinley",
        "amount_inr": 5281
    },
    {
        "category": "Backend Development",
        "title": "Enterprise Integration Patterns",
        "author": "Gregor Hohpe and Bobby Woolf",
        "amount_inr": 4908
    },
    {
        "category": "Backend Development",
        "title": "Database Internals",
        "author": "Alex Petrov",
        "amount_inr": 4602
    },
    {
        "category": "Backend Development",
        "title": "RESTful Web Services",
        "author": "Leonard Richardson and Sam Ruby",
        "amount_inr": 2830
    },
    {
        "category": "Backend Development",
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt and David Thomas",
        "amount_inr": 3964
    },
    {
        "category": "Backend Development",
        "title": "Patterns of Enterprise Application Architecture",
        "author": "Martin Fowler",
        "amount_inr": 4744
    },
    {
        "category": "Backend Development",
        "title": "Fundamentals of Software Architecture",
        "author": "Mark Richards and Neal Ford",
        "amount_inr": 4200
    },
    {
        "category": "Cybersecurity",
        "title": "The Art of Invisibility",
        "author": "Kevin Mitnick",
        "amount_inr": 1887
    },
    {
        "category": "Cybersecurity",
        "title": "Cybersecurity for Dummies",
        "author": "Joseph Steinberg",
        "amount_inr": 2359
    },
    {
        "category": "Cybersecurity",
        "title": "Ghost in the Wires",
        "author": "Kevin Mitnick",
        "amount_inr": 1698
    },
    {
        "category": "Cybersecurity",
        "title": "Hacking: The Art of Exploitation",
        "author": "Jon Erickson",
        "amount_inr": 3775
    },
    {
        "category": "Cybersecurity",
        "title": "The Fifth Domain",
        "author": "Richard A. Clarke and Robert K. Knake",
        "amount_inr": 2548
    },
    {
        "category": "Cybersecurity",
        "title": "Countdown to Zero Day",
        "author": "Kim Zetter",
        "amount_inr": 1793
    },
    {
        "category": "Cybersecurity",
        "title": "Sandworm",
        "author": "Andy Greenberg",
        "amount_inr": 1604
    },
    {
        "category": "Cybersecurity",
        "title": "Practical Malware Analysis",
        "author": "Michael Sikorski and Andrew Honig",
        "amount_inr": 4719
    },
    {
        "category": "Cybersecurity",
        "title": "The Web Application Hacker's Handbook",
        "author": "Dafydd Stuttard and Marcus Pinto",
        "amount_inr": 4530
    },
    {
        "category": "Cybersecurity",
        "title": "Cult of the Dead Cow",
        "author": "Joseph Menn",
        "amount_inr": 1887
    }
]

/*
Using batchSize function we can control batch size but not required in our simple projects but needs to be use in large projects where have to optimize our server
*/

await booksCollection.insertMany(arr);
await client.close();