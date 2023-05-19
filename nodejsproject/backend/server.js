const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var cors = require('cors')


// Connect to the database
const sequelize = new Sequelize('node_project', 'root', 'Deepak@123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Product model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Create Express app
const app = express();
app.use(express.json());
app.use(cors())
// Create a new product
app.post('/products', (req, res) => {
  const { name, price, desc, stock } = req.body;
  console.log(name, price, desc, stock)
    // Product.create({ name, price,desc,stock })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Fetch all products
app.get('/products', (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching products' });
    });
});
app.patch('/update-stock', async (req, res) => {
  const { id, stock } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.send('no product find')
    }

    product.stock = stock;
    await product.save();
    res.send("stock is updated successfully")
    // console.log('Stock updated successfully');
  } catch (error) {
    res.send(error)
    // console.error('Error updating stock:', error);
  }
})

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
