const fs = require('fs');
const path = require('path');

// Define the path to your JSON data file
const dataPath = path.join(__dirname, './data.json');

// Create a function to read data from the JSON file
function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Create a function to write data to the JSON file
function writeData(data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, jsonString);
}

// Define your model
const MyModel = {
  getAll: function() {
    return readData();
  },
  getById: function(id) {
    const data = readData();
    return data.find(item => item.id === id);
  },
  create: function(newItem) {
    const data = readData();
    const ids = data.map(item => item.id);
    const newId = Math.max(...ids) + 1;
    const newItemWithId = { ...newItem, id: newId };
    data.push(newItemWithId);
    writeData(data);
    return newItemWithId;
  },
  update: function(id, updatedItem) {
    const data = readData();
    const itemIndex = data.findIndex(item => item.id === id);
    if (itemIndex >= 0) {
      const updatedItemWithId = { ...updatedItem, id };
      data[itemIndex] = updatedItemWithId;
      writeData(data);
      return updatedItemWithId;
    } else {
      return null;
    }
  },
  delete: function(id) {
    const data = readData();
    const filteredData = data.filter(item => item.id !== id);
    if (filteredData.length < data.length) {
      writeData(filteredData);
      return true;
    } else {
      return false;
    }
  }
};

module.exports = MyModel;
