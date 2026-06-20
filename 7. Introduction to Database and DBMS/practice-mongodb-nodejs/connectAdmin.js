import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017");

const admin = client.db().admin();
const listdbs = await admin.listDatabases();
console.log(...listdbs.databases.values());

client.close();