import EventEmmiters from 'node:events'

// this is a constructor

const emmiter = new EventEmmiters();
// console.log(emmiter);

// we can set max event handler
emmiter.setMaxListeners(Infinity);
// emmiter.setMaxListeners(2);

/*
When we set Max Listenter to a emmiter then if you add more listner function then memory leak warning show but listner function successfully executed
*/

emmiter.on("apple", function () {
    console.log("Apple event fired! (1)");
});
emmiter.on("apple", function () {
    console.log("Apple event fired! again (2)");
})
emmiter.on("apple", function () {
    console.log("Apple event fired! again (3)");
}) // warning
emmiter.on("apple", function () {
    console.log("Apple event fired! again (4)");
}) // warning

emmiter.on("apple", function () {
    console.log("Apple event fired! again (5)");
}) // warning

emmiter.on("apple", handle6) // warning
emmiter.on("wife", function (hey) {
    console.log(hey)
    console.log("wife event fired!");
}); 
emmiter.emit("wife", "Simple String");
emmiter.emit("wife", "hmm");
emmiter.emit("apple", "hmm");
/*
Sir, i have notice that while emit a emmiter we can pass second arguments. And that arguments passed as a parameter of event handler function and can acces its value
Example-
emmiter.once("wife", function(hey){
    console.log(hey)
    console.log("wife event fired!");
}); // this event only emit once
emmiter.emit("wife","Simple String");
*/
console.log("---------")
// off method
/*
this method removes the listner function from the listner array
but must me the function reference must be passed, not the anomymous function
*/
function handle6() {
    console.log("Apple event fired! again (6)");
}
emmiter.off("apple", handle6);
emmiter.emit("apple");

emmiter.removeAllListeners("apple");
console.log("Running after removing listners"); // every listner will poped
emmiter.emit("apple"); // nothing will run
emmiter.emit("apple");

console.log(emmiter.listeners("apple"));
console.log(emmiter.listeners("wife"));
console.log("here");
emmiter.emit("wife", "Args passed from emmit");
