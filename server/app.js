const express = require('express');
const cors = require('cors');
const db = require('./db/cassindex.js');
require('dotenv').config();

const port = 3004;

const app = express();

app.set('port', port);

app.use(express.json());

app.use(express.static('public'));

app.use(cors());

// returns all alsovieweditems
app.get('/api/alsovieweditems', (req, res) => db.findAll().then(data => res.json(data)));

// returns all categoryids assigned to items
app.get('/api/alsovieweditems/categoryids', (req, res) => {
  const queryString = 'select categoryid from alsovieweditems';
  const queryArgs = [];

  db.query(queryString, queryArgs, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      res.end();
    } else {
      const categoryids = [];
      for (let i = 0; i < results.length; i += 1) {
        if (!categoryids.includes(results[i].categoryid)) {
          categoryids.push(results[i].categoryid);
        }
      }
      res.status(200).json(categoryids);
      res.end();
    }
  });
});

// return list of items with given categoryid
app.get('/api/alsovieweditems/categoryid/:categoryId', (req, res) => {
<<<<<<< HEAD
  const queryArgs = ( req.params.categoryid);
  return db.getCategoryId(queryArgs)
  //return db.findAll({ where: { categoryid: JSON.parse(queryArgs) } }).then(results => res.send(results));
=======
  const queryArgs = [req.params.categoryId];

  return db.findAll({ where: { categoryid: JSON.parse(queryArgs) } }).then(results => res.send(results));
>>>>>>> cd96a7530b94b7a19da12698b6e01a23b8da5f53
});

// returns items within given range
app.get('/api/alsovieweditems/startid/:startId/endid/:endId', (req, res) => {
  const queryString = 'select * from alsovieweditems where id >= ? and id <= ?';
  const queryArgs = [req.params.startId, req.params.endId];

  db.query(queryString, queryArgs, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      res.end();
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});
app.post('/api/alsovieweditems/newitem', (req, res) => db.create(req.body).then(results => res.send(results)));

app.delete('/api/alsovieweditems/id/:id', (req, res) => db.destroy({ where: { id: req.params.id } }).then(() => res.sendStatus(200)));

app.put('/api/alsovieweditems/update/:id', (req, res) => db.update({
  title: req.body.title,
}, {
  where: { id: req.body.id },
}));

app.listen(app.get('port'), () => {
  console.log(`peopleAlsoViewed is listening on : ${app.get('port')}`);
});

module.exports = app;
