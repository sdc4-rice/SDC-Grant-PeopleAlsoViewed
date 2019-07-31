const faker = require('faker');
const cassandra = require('cassandra-driver');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const ViewedItem = require('./server/db/cassindex.js');

const writer = csvWriter();

// generates random product company / brand name
const getItemTitle = () => faker.commerce.productName();


// generates random old price between 10 to 10,000
// else returns null as old price
const getOldPrice = () => {
  const oldPriceToken = Math.round(Math.random() * 10);
  // not all items have discounted price
  // based on randomly generated token it will generate old price
  // if token is greater than 5 generate old price otherwise null
  if (oldPriceToken > 5) {
    return parseFloat((Math.random() * (10000 - 10)).toFixed(2));
  }

  return 5;
};

// if oldprice is not null generates current price based of old price
// else generates random current price between 10 to 10,000
const getCurrentPrice = (oldPrice) => {
  // generates discount token
  const discountToken = Math.round(Math.random() * 10);

  if (oldPrice) {
    return parseFloat((oldPrice - (oldPrice * (discountToken / 100))).toFixed(2));
  }

  return parseFloat((Math.random() * (10000 - 10)).toFixed(2));
};

// uses https://picsum.photos/
const getImageUrl = id => `https://picsum.photos/id/${id}/200/200`;


// randomly returns free shipping true or false
const getFreeShipping = () => (Math.round(Math.random() * 10) > 5);

// based on free shipping true or false returns random shipping cost under 100
const getShippingCost = (freeShipping) => {
  if (!freeShipping) {
    return parseFloat((Math.random() * (100 - 10)).toFixed(2));
  }
  return 5;
};

// generates random categoryId between range provided in .env file otherwise default 1 to 10
const startCategoryId = 1;
const endCategoryId = 10000000;
const getCategoryId = () => faker.random.number({ min: startCategoryId, max: endCategoryId });

// generate seed data with ids provided otherwise default from 101 to 200 to given
async function seeding() {
  // ViewedItem.sync({ force: true });
  console.time('SeedingTime');
  const seedAlsoViewedItems = [];
  const startId = 101;
  const endId = 20002000;
  writer.pipe(fs.createWriteStream('cassCSV2.csv'));
  for (let i = startId; i <= endId; i += 1) {
    const oldprice = getOldPrice();
    const image = getImageUrl(faker.random.number({ min: 101, max: 200 }));
    const freesheeping = getFreeShipping();
    if (!writer.write({
      id: i,
      image: image,
      title: getItemTitle(),
      itemurl: image,
      oldprice: oldprice,
      currentprice: getCurrentPrice(oldprice),
      freesheeping: freesheeping,
      shippingcost: getShippingCost(freesheeping),
      categoryid: getCategoryId(),
    })){
      await new Promise ((resolve) => writer.once('drain', resolve))
    }
  }
  writer.end()
  console.timeEnd('SeedingTime');
}
// ViewedItem.sync({ force: true }).then(() => ViewedItem.bulkCreate(seedAlsoViewedItems));

// ViewedItem.client.connect().then(() => ViewedItem.client.execute('DROP TABLE IF EXISTS vieweditems'))
//   .then(() => ViewedItem.client.execute(ViewedItem.ViewedItems))
//   .then(() => seeding())
//   .then(() => console.log('done seeding'));

// node --max-old-space-size=8192 cassSeedAlsoViewed.js
seeding();

// COPY vieweditems ("id", "image", "title", "itemurl", "oldprice", "currentprice", "freesheeping", "shippingcost", "categoryid") FROM '/Users/GrantSteinke/Documents/hrr39/sdc-grant-peoplealsoviewed/cassCSV.csv' with header=true and delimiter=',';
