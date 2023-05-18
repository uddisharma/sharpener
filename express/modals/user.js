const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        required: true,

    },
    photo: {
        type: Sequelize.STRING,
        required: false
    },
    address: {
        type: Sequelize.JSON,
        required: true,
        notNull: true
    }
})
module.exports= User;