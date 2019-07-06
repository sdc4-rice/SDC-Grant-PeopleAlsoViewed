var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'alsoviewed'
});


test('database connection error to equal null', done => {
  function callback(err) {
    expect(err).toBeNull();
    done();
  }
  dbConnection.connect(callback);
});


test('database alsoviewed should have table named alsovieweditems', done => {
  function callback(err, results) {
    expect(results[0]["Tables_in_alsoviewed"]).toBe('alsovieweditems');
    done();
  }

  var queryString = 'show tables';
  var queryArgs = [];
  dbConnection.query(queryString, queryArgs,callback);
});

test('seeding database should result into 100 entries in alsoviweditems table', done => {
  function callback(err, results) {
    expect(results.length).toBe(100);
    done();
  }

  var queryString = 'select * from alsovieweditems';
  var queryArgs = [];
  dbConnection.query(queryString, queryArgs, callback);
});


test('alsovieweditems should have entry with id 1', done => {
  function callback(err, results) {
    var json = JSON.parse(JSON.stringify(results[0]));
    expect(json.id).toBe(1);
    done();
  }

  var queryString = 'select * from alsovieweditems where id = 1';
  var queryArgs = [];
  dbConnection.query(queryString, queryArgs, callback);
});

test('read query on alsovieweditems should return object with colomn names as properties', done => {
  function callback(err, results) {
    var json = JSON.parse(JSON.stringify(results[0]));
    var expectedKeys = ['id', 'image', 'title', 'oldprice', 'currentprice', 'freeshipping', 'shippingcost'];

    expect(Object.keys(json)).toEqual(expect.arrayContaining(expectedKeys));

    dbConnection.end();
    done();
  }

  var queryString = 'select * from alsovieweditems where id = 1';
  var queryArgs = [];
  dbConnection.query(queryString, queryArgs, callback);
});


