const express = require("express");
var pg = require('pg')
var db = new pg.Client('postgres://aaiwujkv:SCBnBq2NvjBwwhLmbEEBT7U5-Uh8iJTo@kashin.db.elephantsql.com/aaiwujkv')
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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT")
    next();
});

app.post('/post', jsonParser, function (req, res) {
  db.query('insert into ' + req.body.board + ' (content) values ' + '(\'' + req.body.content + '\');')
})

app.put('/put', jsonParser, function (req, res) {
  db.query('update ' + req.body.board + ' set content = \'' +  req.body.content + '\' where id=\'' + req.body.id + '\';')
})

app.delete("/delete", jsonParser, (req, res) => {
  db.query('delete from ' + req.body.board + ' where ' + 'id=' + req.body.id + ';')
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