const request = require('supertest');
const app = require('../../server/app.js');


test('GET request on /api/alsovieweditems should return 100 items', (done) => {
  request(app)
    .get('/api/alsovieweditems')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedLength = 100;
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

test('GET request should return image property set to https://picsum.photos/id/1/200/200 for item with id = 1', (done) => {
  request(app)
    .get('/api/alsovieweditems')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedImageUrl = 'https://picsum.photos/id/1/200/200';
      const actualImageUrl = res.body[0].image;
      expect(actualImageUrl).toBe(expectedImageUrl);
      done();
    });
});

test('GET request for /api/alsovieweditems/categoryids should return all category ids assigned to items', (done) => {
  request(app)
    .get('/api/alsovieweditems/categoryids')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedCategoryIds = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let i = 0; i < res.body.length; i += 1) {
        const actualCategoryId = res.body[i];
        expect(expectedCategoryIds.includes(actualCategoryId)).toBeTruthy();
      }
      done();
    });
});

test('GET request on /api/alsovieweditems/categoryid/5 should return list of items with categoryid = 5', (done) => {
  request(app)
    .get('/api/alsovieweditems/categoryid/5')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedCategoryId = 5;
      for (let i = 0; i < res.body.length; i += 1) {
        const actualCategoryId = res.body[i].categoryid;
        expect(actualCategoryId).toBe(expectedCategoryId);
      }
      done();
    });
});

test('GET request on /api/alsovieweditems/startid/15/endid/24 should return 10 items with ids from 15 to 24', (done) => {
  request(app)
    .get('/api/alsovieweditems/startid/15/endid/24')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      }
      const expectedResultLength = 10;
      const actualResultLength = res.body.length;
      expect(actualResultLength).toBe(expectedResultLength);

      const expectedStartId = 15;
      const actualStartId = res.body[0].id;
      expect(actualStartId).toBe(expectedStartId);

      const expectedEndId = 24;
      const actualEndId = res.body[res.body.length - 1].id;
      expect(actualEndId).toBe(expectedEndId);

      done();
    });
});
