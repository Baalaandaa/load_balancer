const express = require('express');
const fs = require("fs");
const app = express();

app.use(express.json())

let activeQueries = 0;

app.use((req, res, next) => {
    activeQueries++;
    res.on("finish", () => {
        activeQueries--;
    })
    next();
});

setInterval(() => {
    console.log(activeQueries)
    fs.appendFileSync("log.txt", `${new Date().toISOString()}: ${activeQueries}`);
}, 10 * 1000)

app.get('/echo', (req, res) => {
    const delay = 500 + Math.floor(Math.random() * 500); // Simulating complex query

    setTimeout(async () => {
        const requestBody = req.body;
        res.send(requestBody).status(200);
    }, delay);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started simple echo server on port ${port}`)
});