

// console.log(process.stdin)
// console.log(process.stdout)
// console.log(process.stderr)

process.stdin.write("Showing input \n");

process.stdout.write("Showing output \n")

process.stderr.write("Showing error \n");

/*
console.log(); 
behind the scene uses process.stdout.write() stream to print on console.
*/
console.clear()
let username;
console.log("Enter you name: ");
// process.stdin.on("data", function(chunks){
//     username = chunks.toString();
//     console.log("Username is ::",username);
//     process.stdin.destroy();
//     console.log("Programme End");
// });

// process.stdout.on("data", function(chunks){
//     username = chunks.toString();
//     console.log("Username is ::",username);
//     console.log("Programme End");
//     process.stdout.destroy();
// });

// logging streams associated numbers-
console.log(process.stdin.fd); // 0
console.log(process.stdout.fd); // 1
console.log(process.stderr.fd); // 2
