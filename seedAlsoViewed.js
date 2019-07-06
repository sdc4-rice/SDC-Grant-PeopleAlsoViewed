var mysql = require('mysql');
var Faker = require ('Faker');


var dbConnection = mysql.createConnection ({
  user: 'root', // FILL IN WITH YOUR USERNAME
  password: '', // FILL IN WITH YOUR PASSWORD
  database: 'alsoviewed' //DON'T CHANGE
});

dbConnection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected: success');
  }
});

dbConnection.query('truncate alsovieweditems', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('truncated table \'alsovieweditems\' before seeding' + err);
  }
});


/// generates random product company / brand name
var getItemTitle = function () {
  return Faker.Company.companyName();
};

/// generates random old price between 10 to 10,000
/// else returns null as old price
var getOldPrice = function () {

  var oldPriceToken = Math.round( Math.random() * 10 );
  // not all items have discounted price
  // based on randomly generated token it will generate old price
  // if token is greater than 5 generate old price otherwise null
  if (oldPriceToken > 5) {
    return parseFloat((Math.random() * (10000 - 10)).toFixed(2));
  } else {
    return null;
  }

};

/// if oldprice is not null generates current price based of old price
/// else generates random current price between 10 to 10,000
var getCurrentPrice = function (oldPrice) {
  // generates discount token
  var discountToken = Math.round( Math.random() * 10 );

  if (oldPrice) {
    return parseFloat((oldPrice - (oldPrice * (discountToken / 100))).toFixed(2));
  } else {
    return parseFloat((Math.random() * (10000 - 10)).toFixed(2));
  }
};

/// uses https://picsum.photos/
var getImageUrl = function () {
  return 'https://picsum.photos/200/300';
};

/// randomly returns free shipping true or false
var getFreeShipping = function () {
  return (Math.round(Math.random() * 10) > 5);
};

/// based on free shipping true or false returns random shipping cost under 100
var getShippingCost = function (freeSheeping) {
  if (!freeSheeping) {
    return parseFloat((Math.random() * (100 - 10)).toFixed(2));
  } else {
    return null;
  }
};

///generate seed data with id 1 to given
var seedAlsoViewedItems = [];

for (var i = 1; i < 101; i++) {
  var id = i;
  var image = getImageUrl();
  var title = getItemTitle();
  var oldPrice = getOldPrice();
  var currentPrice = getCurrentPrice(oldPrice);
  var freeSheeping = getFreeShipping();
  var shippingCost = getShippingCost(freeSheeping);

  seedAlsoViewedItems.push([id, image, title, oldPrice, currentPrice, freeSheeping, shippingCost]);
}


/// insert seed data
var queryString = 'insert into alsovieweditems (id, image, title, oldprice, currentprice, freeshipping, shippingcost) values ?';
var queryArgs = seedAlsoViewedItems;

dbConnection.query(queryString, [queryArgs], function(err) {
  if (err) {
    throw err;
  }

  console.log('seeding data completed closing database connection');
  dbConnection.end();
});

