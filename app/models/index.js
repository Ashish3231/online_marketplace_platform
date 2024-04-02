const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user/user.model.js')(sequelize, Sequelize);
db.product = require('./product/product.model.js')(sequelize, Sequelize);
db.orderHeader = require('./order/order_header.model.js')(sequelize, Sequelize);
db.orderLine = require('./order/order_line.model.js')(sequelize, Sequelize);

// user and product mapping
db.user.hasMany(db.product, { as: 'user_prdct', foreignKey: 'user_id' });
db.product.belongsTo(db.user, { as: 'user_prdct', foreignKey: 'user_id' });

//product and order mapping
db.product.hasMany(db.orderHeader, {
  as: 'prdct_ord',
  foreignKey: 'product_id',
});
db.orderHeader.belongsTo(db.product, {
  as: 'prdct_ord',
  foreignKey: 'product_id',
});

// order header and order line mapping
db.orderHeader.hasMany(db.orderLine, { as: 'item', foreignKey: 'ord_id' });
db.orderLine.belongsTo(db.orderHeader, { as: 'item', foreignKey: 'ord_id' });

module.exports = db;
