const mysql = require('mysql');
require('dotenv').config();

const dbConnection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST || 'localhost',
  user: process.env.MYSQL_DB_USERNAME || 'root',
  password: process.env.MYSQL_DB_PASSWORD || '',
  database: process.env.MYSQL_DB_DATABASE || 'alsoviewed',
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

test('seeding database should result into TOTAL_ITEMS spcified in .env file for alsovieweditems table', (done) => {
  const totalItems = Number(process.env.TOTAL_ITEMS);
  const queryString = 'select * from alsovieweditems';
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    expect(results.length).toBe(totalItems);
    done();
  });
});


test('alsovieweditems should have entry with id = START_ITEM_ID specified in .env file', (done) => {
  const startId = Number(process.env.START_ITEM_ID);
  const queryString = `select * from alsovieweditems where id = ${startId}`;
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    const json = JSON.parse(JSON.stringify(results[0]));
    expect(json.id).toBe(startId);
    done();
  });
});

test('read query on alsovieweditems should return object with colomn names as properties', (done) => {
  const startId = Number(process.env.START_ITEM_ID);
  const queryString = `select * from alsovieweditems where id = ${startId}`;
  const queryArgs = [];

  dbConnection.query(queryString, queryArgs, (err, results) => {
    const json = JSON.parse(JSON.stringify(results[0]));
    const expectedKeys = ['id', 'image', 'title', 'itemurl', 'oldprice', 'currentprice', 'freeshipping', 'shippingcost', 'categoryid'];

    expect(Object.keys(json)).toEqual(expect.arrayContaining(expectedKeys));

    dbConnection.end();
    done();
  });
});
