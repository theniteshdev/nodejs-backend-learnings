import User from "./db.js";
/*
Methods of reading data from 
User.<operationMethod>.lean() => means remove the all extra methods and property(only data is there)
*/

console.time("t1");
// const data = await User.findOne({ username: "apple" }).lean();
const data = await User.findOne({ username: "apple" });
console.log(data);
data.mail = "hello.apple.com4"
await data.save();
console.log(data);
console.timeEnd("t1");
// here 2 db calls