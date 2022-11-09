const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, DELETE, OPTIONS"
  );
  next();
});
let posts = [
  {
    id: "1",
    title: "First server-side post",
    content: "This is coming from the server"
  },
  {
    id: "2",
    title: "Second server-side post",
    content: "This is coming from the server!"
  }
];
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  posts.push(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});
app.delete("/api/posts/:id", (req, res, next) => {
  const id = req.params.id;
  posts = posts.filter(post => post.id !== id);
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});
app.put("/api/posts/:id", (req, res, next) => {
  const post = req.body
  posts = posts.map(p => {
    if (p.id === post.id) {
      return p = post
    }
    return p
  })
});

module.exports = app;
