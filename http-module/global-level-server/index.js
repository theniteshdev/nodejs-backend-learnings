import http from "node:http";

const app = http.createServer((req, res, next) => {
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <title>theniteshdev | Testing Server</title>
        <link rel="icon" type="image/x-icon" href="./image.png">
        <style>
        *{
            background-color: #010101;
            color: #f1f1f1;
            font-size: 1.87rem;
            text-align: center;
        }
        a{
            color: orange;
            text-decoration: none;
        }
        </style>
        </head>
        <body>
        <h1>Hello World !</h1>
        <h4>Hey, everyone this is testing website to test if the server is running in the public ip of private ip.</h4>
        <a href="https://x.com/theniteshdev">-theniteshdev</a>
        </body>
        </html>       
        `);
});

app.listen(80, '::', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server Up: http://[::]:80");
        console.log(`Global Level : http://[2409:4064:705:adf1:9efc:1aa2:14ff:fd55]:80`);
    }
});

