/* methods used for create a document
1- insertOne()
2- insertMany()
3- create()
*/
import User from "./db.js";

const actualData = [
    {
        username: "karan",
        age: 42,
        mail: "karan@example.mail"
    },
    {
        username: "hitesh",
        age: 34,
        mail: "hites@gmail.com"
    },
]


// const data = await User.insertMany(actualData);
// const data = await User.create(actualData);
/**
 * create method is more flexiable
 */
// console.log(data)


const userObj = new User({ username: "apple", mail: "apple.com", age: "55" })
console.log(userObj.age = 34);
userObj.username = "stev"


userObj.save(); // DB calling