import {spawn} from "node:child_process"

const childProcess = spawn("./a.out");

childProcess.stdin.end("33");

function handleData(chunk){
    console.log(chunk.toString());
}

childProcess.stdout.on("data", handleData);
