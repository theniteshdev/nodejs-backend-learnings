import mongoose from "mongoose"

await mongoose.connect("mongodb://admin:admin@localhost/");

const userValidationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    age: {
        type: Number,
        required: true,
        min: 12
    },
    mail: {
        type: String,
        required: true
    }
}, {
    strict: "throw",
    timestamps: true,
});

const User = mongoose.model("user", userValidationSchema);

export default User;
