const express = require('express');
const db = require('./db/index.js');

const app = express();

app.set('port', 3004);

//app.use(express.static(__dirname + '' ));
/// returns all alsovieweditems
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

/// returns all categoryids assigned to items
app.get('/api/alsovieweditems/categoryids', (req, res) => {
  var queryString = 'select categoryid from alsovieweditems';
  var queryArgs = [];

  db.query(queryString, queryArgs, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      var categoryids = [];
      for (var i = 0; i < results.length; i++) {
        if (!categoryids.includes(results[i].categoryid)) {
          categoryids.push(results[i].categoryid);
        }
      }
      res.status(200).json(categoryids);
    }
  });
});

/// return list of items with given categoryid
app.get('/api/alsovieweditems/categoryid/:categoryId', (req, res) => {

  var queryString = 'select * from alsovieweditems where categoryid = ?';
  var queryArgs = [req.params.categoryId];

  db.query(queryString, queryArgs, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).json(results);
    }
  });

});

///returns items within given range
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