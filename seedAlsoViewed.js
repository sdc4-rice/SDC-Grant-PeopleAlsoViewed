const faker = require('faker');
const ViewedItem = require('./server/db/index.js');

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
const getImageUrl = id => `https://picsum.photos/id/${id}/200/200`;


// randomly returns free shipping true or false
const getFreeShipping = () => (Math.round(Math.random() * 10) > 5);

// based on free shipping true or false returns random shipping cost under 100
const getShippingCost = (freeShipping) => {
  if (!freeShipping) {
    return parseFloat((Math.random() * (100 - 10)).toFixed(2));
  }
  return null;
};

// generates random categoryId between range provided in .env file otherwise default 1 to 10
const startCategoryId = Number(process.env.START_CATEGORY_ID) || 1;
const endCategoryId = Number(process.env.END_CATEGORY_ID) || 10;
const getCategoryId = () => faker.random.number({ min: startCategoryId, max: endCategoryId });

// generate seed data with ids provided otherwise default from 101 to 200 to given
const seeding = async () => {
  ViewedItem.sync({ force: true });
  let seedAlsoViewedItems = [];
  const startId = Number(process.env.START_ITEM_ID) || 101;
  const endId = Number(process.env.END_ITEM_ID) || 10000000;

  for (let i = startId; i <= endId; i += 1) {
    console.log(seedAlsoViewedItems.length)
    const id = i;
    const image = getImageUrl(i);
    const title = getItemTitle();
    const itemUrl = image;
    const oldPrice = getOldPrice();
    const currentPrice = getCurrentPrice(oldPrice);
    const freeSheeping = getFreeShipping();
    const shippingCost = getShippingCost(freeSheeping);
    const categoryId = getCategoryId();

    seedAlsoViewedItems.push({
      id,
      image,
      title,
      itemUrl,
      oldPrice,
      currentPrice,
      freeSheeping,
      shippingCost,
      categoryId,
    });
    if(seedAlsoViewedItems.length === 50000) {
      await ViewedItem.bulkCreate(seedAlsoViewedItems);
      seedAlsoViewedItems = []
    }
  }
  await ViewedItem.bulkCreate(seedAlsoViewedItems);
}
//ViewedItem.sync({ force: true }).then(() => ViewedItem.bulkCreate(seedAlsoViewedItems));

seeding();
