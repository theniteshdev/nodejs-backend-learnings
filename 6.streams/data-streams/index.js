import {spawn} from "node:child_process";

const childProcess = spawn("node", ["./index2.js"]);
childProcess.stdin.write("Hello World");

function handleData(data){
    console.log(data.toString())
}

childProcess.stdout.on("data", handleData);