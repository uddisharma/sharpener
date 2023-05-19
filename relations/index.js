const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const app = express();
app.use(bodyParser.json());


const sequelize = new Sequelize('new_schema', 'root', 'Deepak@123', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


const User = sequelize.define('User', {
    name: Sequelize.STRING,
});


const Product = sequelize.define('Product', {
    name: Sequelize.STRING,
});


User.belongsToMany(Product, { through: 'CartItems' });
Product.belongsToMany(User, { through: 'CartItems' });

sequelize.sync().then(() => {
    console.log('Models synchronized with the database.');

    app.listen(3000, () => {
        console.log('Server listening on port 3000...');
    });
});
// app.listen(3000, () => {
//     console.log('Server listening on port 3000...');
// });

