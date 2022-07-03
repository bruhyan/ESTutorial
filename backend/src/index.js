const express = require("express");
const bodyParser = require("body-parser");
const esClient = require("./elastic-client");
require("express-async-errors");

const app = express();

app.use(bodyParser.json());

app.listen(8080);

app.get("/", (req, res) => {
    res.redirect("http://localhost:3000/");
});

app.post("/create-post", async (req, res) => {
    const result = await esClient.index({
        index: "posts",
        document: {
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
        }
    })

    res.send(result);
});

app.delete("/remove-post", async (req, res) => {
    const result = await esClient.delete({
        index: "posts",
        id: req.query.id
    });

    res.json(result);
});

app.get("/search", async (req, res) => {
    const result = await esClient.search({
        index: "posts",
        query: { fuzzy: { title: req.query.id } },
    });

    res.json(result);
});

app.get("/posts", async (req, res) => {
    const result = await esClient.search({
        index: "posts",
        query: { match_all: {} },
    });

    res.send(result);
});


// https://developer.okta.com/blog/2022/04/27/ultimate-guide-elasticsearch-nodejs