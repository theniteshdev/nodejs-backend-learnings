import mongoose from "mongoose";
console.log("import mongoose from mongoose")
import "./db.js";
import User from "./db.js";

// All Queries are filtered in the Database
// const query = User.find({ username: "ram" }, /*{ username: 1 }*/);
// query.select("-age -username ");
// query.select("mail");
// console.log(query.projection())
// console.log(await query);

const allData = User.find();
allData.select("age username").sort({ age: 1 });
console.log(await allData);// apple is the red traffic light for stpoing to going for doctor