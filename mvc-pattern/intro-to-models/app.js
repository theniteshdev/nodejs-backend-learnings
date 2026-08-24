import mongoose from "mongoose";

await mongoose.connect("mongodb://admin:admin@localhost");

// const pluralizer = mongoose.pluralize();
// console.log(pluralizer("Apple"))
// mongoose.pluralize(word => word.toUpperCase() + "_companyName");
mongoose.set("autoCreate", false);

mongoose.model("user", {}, "customers"); // third string is the actaul collection name

console.log("DB connected!");