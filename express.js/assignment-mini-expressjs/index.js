import Express from "./express.js";
const app = Express();

app.Get("/", (req, res) => {
    res.send("Hello World 😆");
}, (req, res) => {
    res.end("Ok");
});

app.Post("/hello", (req, res) => {
    res.send("OK")
})
app.Put("/login", (req, res) => {
    res.send("OK")
})

app.Listen(3000, 'localhost');