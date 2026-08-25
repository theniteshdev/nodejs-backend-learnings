import mongoose, { Schema } from "mongoose"
console.log("start:: userModel.js")
// define schema validation
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field is important!"],
        minLength: [3, "length of name must be greater than 3"]
    },
    age: {
        type: Number, // now value of type is Number constructor but we can set string type of name of data's type (example-number, string, boolean, object)
        min: 12,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    favThemes: [],
    parentId: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true
    }
}, {
    strict: "throw",
    timestamps: true,
    // versionKey: false,
    // collection: "<name-of-the-collection>", generally not used
})

userSchema.pre('validate', function () {
    if (this.age > 16) {
        this.parentId = null;
    }
});

// this returns userModel constructor function with tons of new methods
const userModel = mongoose.model("user", userSchema);

userModel.insertOne({ name: 'ram', email: "kumar34", age: 17, favThemes: ["orange", "dark", "dark-blue", "chai"], })

// const data = (await userModel.findOne({ _id: "6a8caa09df0b0f41754a87f0" })).favThemes;
// console.log(data);

