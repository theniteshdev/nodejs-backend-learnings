import http from "node:http";

const server = http.createServer((req, res) => {
    if (req.url === "/login") {
        res.setHeader("set-cookie", "id=123;max-age=60;path=/");
        res.write(`<h1>You are loggedIn!</h1>
            </img src="https://example.com" alt="image" >
            `);
        res.end();
        return;
    }

    const { cookie } = req.headers;
    res.write(`<h1>Welcome!</h1>
        <h3>Cookie: ${cookie}</h3>
        </img src="https://example.com" alt="image" >
        `);
    res.end();
});


server.listen(3000);