import fs from "node:fs";

// callback-method
const hrllo = fs.open("./file.txt", (err, fd) => {
    if (err) {
        console.log(err);
    };
    // console.log(fd);
}); // returns if error -> null | if not error -> undefined

// console.log(hrllo);

// sync
const myfd = fs.open("./file.txt", (err, fd)=>{
    console.log(fd);
});
// console.log(myfd);