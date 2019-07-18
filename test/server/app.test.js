const request = require('supertest');
const app = require('../../server/app.js');
require('dotenv').config();

test('GET request on /api/alsovieweditems should return TOTAL_ITEMS spcified in .env file', (done) => {
  request(app)
    .get('/api/alsovieweditems')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedLength = Number(process.env.TOTAL_ITEMS);
      const actualLength = res.body.length;
      expect(actualLength).toBe(expectedLength);
      done();
    });
});


test('GET request on /api/alsovieweditems should return items with properties id, image, title, itemurl, oldprice, currentprice, freeshipping, shippingcost', (done) => {
  request(app)
    .get('/api/alsovieweditems')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedKeys = ['id', 'image', 'title', 'itemurl', 'oldprice', 'currentprice', 'freeshipping', 'shippingcost'];
      const actualKeys = Object.keys(res.body[0]);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      done();
    });
});

test('GET request should return image property set to https://picsum.photos/id/1/200/200 for item with id = START_ITEM_ID set up in .env', (done) => {
  request(app)
    .get('/api/alsovieweditems')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedImageUrl = `https://picsum.photos/id/${process.env.START_ITEM_ID}/200/200`;
      const actualImageUrl = res.body[0].image;
      expect(actualImageUrl).toBe(expectedImageUrl);
      done();
    });
});

test('GET request for /api/alsovieweditems/categoryids should return all category ids along with START_CATEGORY_ID END_CATEGORY_ID setup in .env assigned to items', (done) => {
  request(app)
    .get('/api/alsovieweditems/categoryids')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const actualCategoryIds = res.body;
      expect(actualCategoryIds.includes(Number(process.env.START_CATEGORY_ID))).toBeTruthy();
      expect(actualCategoryIds.includes(Number(process.env.END_CATEGORY_ID))).toBeTruthy();
      done();
    });
});

test('GET request on /api/alsovieweditems/categoryid/START_CATEGORY_ID should return list of items with categoryid = START_CATEGORY_ID', (done) => {
  request(app)
    .get(`/api/alsovieweditems/categoryid/${process.env.START_CATEGORY_ID}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedCategoryId = Number(process.env.START_CATEGORY_ID);
      for (let i = 0; i < res.body.length; i += 1) {
        const actualCategoryId = res.body[i].categoryid;
        expect(actualCategoryId).toBe(expectedCategoryId);
      }
      done();
    });
});

test('GET request on /api/alsovieweditems/startid/START_ITEM_ID/endid/END_ITEM_ID should return TOTAL_ITEMS with ids from START_ITEM_ID to END_ITEM_ID', (done) => {
  request(app)
    .get(`/api/alsovieweditems/startid/${process.env.START_ITEM_ID}/endid/${process.env.END_ITEM_ID}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedResultLength = Number(process.env.TOTAL_ITEMS);
      const actualResultLength = res.body.length;
      expect(actualResultLength).toBe(expectedResultLength);

      const expectedStartId = Number(process.env.START_ITEM_ID);
      const actualStartId = res.body[0].id;
      expect(actualStartId).toBe(expectedStartId);

      const expectedEndId = Number(process.env.END_ITEM_ID);
      const actualEndId = res.body[res.body.length - 1].id;
      expect(actualEndId).toBe(expectedEndId);

      done();
    });
});
