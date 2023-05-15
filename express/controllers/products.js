const db = require('../utils/database.js')
class Products {
    static getAll(){
     return  db.execute('SELECT * FROM PRODUCTS')

    }
    static save(){
        return db.execute("INSERT INTO PRDODUCTS (name, desc, image) VALUES(?,?,?)",
        [this.name, this.desc, this.image])
    }
}
module.exports = Products;