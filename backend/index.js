const express = require("express");
var pg = require('pg')
var db = new pg.Client('postgres://aaiwujkv:yU4INSawt5ecd9tYURzrX19SQLP_Q1yA@kashin.db.elephantsql.com/aaiwujkv')
db.connect()
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();

var jsonParser = bodyParser.json()

var cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.post('/post', jsonParser, function (req, res) {
  console.log("getting something... " + req.body.board)
  db.query('insert into ' + req.body.board + ' (content) values ' + '(\'' + req.body.content + '\');')
})

app.get("/api", (req, res) => {
  db.query('select * from posts;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/b", (req, res) => {
  db.query('select * from random;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/v", (req, res) => {
  db.query('select * from videogames;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/a", (req, res) => {
  db.query('select * from anime;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/mu", (req, res) => {
  db.query('select * from music;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/fit", (req, res) => {
  db.query('select * from fitness;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/k", (req, res) => {
  db.query('select * from weapons;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/sci", (req, res) => {
  db.query('select * from science;')
  .then(data => {
      res.json(data.rows)
  })
});

app.get("/news", (req, res) => {
  db.query('select * from news;')
  .then(data => {
      res.json(data.rows)
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});