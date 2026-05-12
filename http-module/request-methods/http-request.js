import http from 'node:http'

const client = http.request({
    port: 4000,
    method: "POST",
    path: "/not"
}, (res) => {
    console.log(`Status Code::${res.statusCode}`);
    res.on("data", (chunks) => {
        console.log(`Server Message:: ${chunks.toString()}`);
    })
})

client.write("Hello from http client !!");
client.end();