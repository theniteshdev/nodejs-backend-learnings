import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nodejs-mongod.7lbrg57.mongodb.net/?appName=nodejs-mongod`);

const db = client.db("sample_supplies");
const userCollection = db.collection("sales");
// const ack = await userCollection.insertOne({ "name": "nitesh", "password": "hacked" });

const user1 = await userCollection.find({ _id: new ObjectId("5bd761dcae323e45a93cd04b") }).toArray();
console.log(user1[0].items)

client.close();