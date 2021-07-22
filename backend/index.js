const express = require("express");
var pg = require('pg')
var db = new pg.Client('postgres://aaiwujkv:zKHiQgzfebq9wEfbteChV8yi80pytuQX@kashin.db.elephantsql.com/aaiwujkv')
db.connect()

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/api", (req, res) => {
    db.query('select * from posts;')
    .then(data => {
        console.log("sending: " + data.rows)
        res.json(data.rows)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});