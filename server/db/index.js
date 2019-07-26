const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/alsoviewed', { logging: false });
const { Model } = Sequelize;

class ViewedItem extends Model {}

ViewedItem.init({
  id: {
    type: Sequelize.DECIMAL,
    primaryKey: true,
  },
  image: Sequelize.STRING,
  title: Sequelize.STRING,
  itemurl: Sequelize.STRING,
  oldprice: Sequelize.DECIMAL,
  currentprice: Sequelize.DECIMAL,
  freesheeping: Sequelize.BOOLEAN,
  shippingcost: Sequelize.DECIMAL,
  categoryid: Sequelize.INTEGER,
}, { sequelize, modelName: 'vieweditems' });

module.exports = ViewedItem;
exports.sequelize = sequelize;
