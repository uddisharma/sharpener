const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primarykey: true
    },
    name: Sequelize.STRING,
    image: Sequelize.STRING
})
module.exports= Product;