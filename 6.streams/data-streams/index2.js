import fs from "node:fs";
console.log("Child App !");

process.stdin.on("data", function(chunk){
    fs.writeFileSync("./test3.txt", chunk);
    console.log("from child::", chunk.toString());
    process.stdin.destroy();
});


