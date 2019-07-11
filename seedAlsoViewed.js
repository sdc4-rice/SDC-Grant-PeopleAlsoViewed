const mysql = require('mysql');
const faker = require('faker');

const dbConnection = mysql.createConnection({
  user: 'root', // FILL IN WITH YOUR USERNAME
  password: '', // FILL IN WITH YOUR PASSWORD
  database: 'alsoviewed', // DON'T CHANGE
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected: success');
  }
});

dbConnection.query('truncate alsovieweditems', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('truncated table \'alsovieweditems\' before seeding');
  }
});


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

  return null;
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
const getImageUrl = id => `https://picsum.photos/id/${id}/200/300`;


// randomly returns free shipping true or false
const getFreeShipping = () => (Math.round(Math.random() * 10) > 5);

// based on free shipping true or false returns random shipping cost under 100
const getShippingCost = (freeShipping) => {
  if (!freeShipping) {
    return parseFloat((Math.random() * (100 - 10)).toFixed(2));
  }
  return null;
};

// generates random categoryId between 1 to 8 and assigns it to item
const getCategoryId = () => faker.random.number({ min: 1, max: 8 });

// generate seed data with id 1 to given
const seedAlsoViewedItems = [];

for (let i = 1; i < 101; i += 1) {
  const id = i;
  const image = getImageUrl(i);
  const title = getItemTitle();
  const oldPrice = getOldPrice();
  const currentPrice = getCurrentPrice(oldPrice);
  const freeSheeping = getFreeShipping();
  const shippingCost = getShippingCost(freeSheeping);
  const categoryId = getCategoryId();

  seedAlsoViewedItems.push([id, image, title, oldPrice,
    currentPrice, freeSheeping, shippingCost, categoryId]);
}

// insert seed data
const queryString = 'insert into alsovieweditems (id, image, title, oldprice, currentprice, freeshipping, shippingcost, categoryid) values ?';
const queryArgs = seedAlsoViewedItems;

dbConnection.query(queryString, [queryArgs], (err) => {
  if (err) {
    throw err;
  }

  console.log('seeding data completed closing database connection');
  dbConnection.end();
});
