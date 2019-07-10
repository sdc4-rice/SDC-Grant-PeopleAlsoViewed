const express = require('express');
const db = require('./db/index.js');

const app = express();

app.set('port', 3004);

//app.use(express.static(__dirname + '' ));

app.get('/api/alsovieweditems', (req, res) => {

  var queryString = 'select * from alsovieweditems';
  var queryArgs = [];

  db.query(queryString, queryArgs, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).json(results);
    }
  });

});

app.get('/api/alsovieweditems/id/:id', (req, res) => {

  var queryString = 'select * from alsovieweditems where id = ?';
  var queryArgs = [req.params.id];

  db.query(queryString, queryArgs, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).json(results);
    }
  });

});

app.get('/api/alsovieweditems/startid/:startId/endid/:endId', (req, res) => {

  var queryString = 'select * from alsovieweditems where id >= ? and id <= ?';
  var queryArgs = [req.params.startId, req.params.endId];

  db.query(queryString, queryArgs, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).json(results);
    }
  });

});

app.listen(app.get('port'), () => {
  console.log('peopleAlsoViewed is listening on : ' + app.get('port'));
});

module.exports = app;