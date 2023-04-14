const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
app.listen(port, () => {
  console.log("listening to PORT", port);
});
app.use(cors());

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./database/data.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

///////////////////////
app.get("/users", (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
    res.json({ users: rows });
  });
});

app.get("/posts", (req, res) => {
  db.all(`SELECT * FROM posts`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
    res.json({ posts: rows });
  });
});

app.get("/comments", (req, res) => {
  db.all(`SELECT * FROM comments`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
    res.json({ comments: rows });
  });
});
