import { MongoClient } from "mongodb";

async function connectDB() {
    const url = "mongodb://localhost:27017/storageDB";
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("MongoDB Connected!")
        return client.db(); // storageDB
    } catch (error) {
        throw new Error(error.messages);
    }
};
export default connectDB;