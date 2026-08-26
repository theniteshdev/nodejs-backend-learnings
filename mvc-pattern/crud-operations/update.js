import mongoose from "mongoose";
import User from "./db.js";

// updation methods

// const updatedUser = await User.findOneAndUpdate(
//     { username: "harish" },
//     { age: 59 },
//     { new: true, runValidators: true }
// );


// validation works
// const data = await User.findOne({ username: "apple" });
// data.age = 50;
// data.save();
// console.log(data);

// delete method
// const deletedUser = await User.findOneAndDelete({ username: "apple" })
const deletedUser = await User.findByIdAndDelete({ _id: "6a8dec01a175a1ee4057938d" });
console.log(deletedUser);