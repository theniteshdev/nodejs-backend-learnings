import fs from 'node:fs'

const readStream = fs.createReadStream("./chars.txt", {highWaterMark: 6,})
let initial = 0;
readStream.on("data", function(chunk){
    if(initial === 0){
        fs.writeFileSync("./out.txt", "");
        initial++;
    }
    // console.log(readStream.bytesRead)
    // console.log(readStream.read(2))
    console.clear()
    console.log(`Reading: ${(readStream.bytesRead / 64) * 100}%`)
    fs.appendFileSync("./out.txt", chunk.toString());
    readStream.pause();
    setTimeout(()=>{
        readStream.resume();
    }, 1000)
});

readStream.on("end", function(){
    console.log("Done !")
})