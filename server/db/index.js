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
  itemUrl: Sequelize.STRING,
  oldPrice: Sequelize.DECIMAL,
  currentPrice: Sequelize.DECIMAL,
  freeSheeping: Sequelize.BOOLEAN,
  shippingCost: Sequelize.DECIMAL,
  categoryId: Sequelize.INTEGER,
}, { sequelize, modelName: 'vieweditems' });

module.exports = ViewedItem;
exports.sequelize = sequelize;
