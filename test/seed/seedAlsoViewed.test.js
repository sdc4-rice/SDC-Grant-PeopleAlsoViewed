const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'alsoviewed',
});


test('database connection error to equal null', (done) => {
  dbConnection.connect((err) => {
    expect(err).toBeNull();
    done();
  });
});


test('database alsoviewed should have table named alsovieweditems', (done) => {
  const queryString = 'show tables';
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    expect(results[0].Tables_in_alsoviewed).toBe('alsovieweditems');
    done();
  });
});

test('seeding database should result into 100 entries in alsoviweditems table', (done) => {
  const queryString = 'select * from alsovieweditems';
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    expect(results.length).toBe(100);
    done();
  });
});


test('alsovieweditems should have entry with id 1', (done) => {
  const queryString = 'select * from alsovieweditems where id = 1';
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    const json = JSON.parse(JSON.stringify(results[0]));
    expect(json.id).toBe(1);
    done();
  });
});

test('read query on alsovieweditems should return object with colomn names as properties', (done) => {
  const queryString = 'select * from alsovieweditems where id = 1';
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    const json = JSON.parse(JSON.stringify(results[0]));
    const expectedKeys = ['id', 'image', 'title', 'oldprice', 'currentprice', 'freeshipping', 'shippingcost', 'categoryid'];

    expect(Object.keys(json)).toEqual(expect.arrayContaining(expectedKeys));

    dbConnection.end();
    done();
  });
});
