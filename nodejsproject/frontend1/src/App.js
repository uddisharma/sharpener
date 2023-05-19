import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
function App() {
  const [products, setProducts] = useState([])
  const getdata=()=>{
    axios.get('http://localhost:3000/products')
    .then((res) => {
      console.log(res.data)
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
  getdata();
  }, [])
  const [data, setData] = useState({
    name: "",
    price: "",
    desc: "",
    stock: ""
  })
  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const addproduct = (e) => {
    e.preventDefault();
    console.log(data)

    axios.post('http://localhost:3000/products', data)
      .then((res) => {
        console.log(res)
        getdata()
      })
      .catch(err =>
        console.log(err)
      )
  }
  const updatestock = (id, stock) => {
    axios.patch('http://localhost:3000/update-stock', {
      id: id,
      stock: stock
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="App">
      <h1>Add product</h1>
      <form>
        <input onChange={handlechange} name="name" type="text" placeholder="Product name" />
        <input onChange={handlechange} name="price" type="number" placeholder="Product price" />
        <input onChange={handlechange} name="desc" type="text" placeholder="Product desc" />
        <input onChange={handlechange} name="stock" type="number" placeholder="Product stock" />
        <button onClick={addproduct}>add product</button>
      </form>
      <h1>Product List</h1>
      <tr>
        <th>name</th>
        <th>price</th>
        <th>Desc</th>
        <th>stock</th>
        {/* <th>actions</th> */}
      </tr>
      {products.length > 0 ? products.map((e) => (
        <tr>
          <td>{e.name}</td>
          <td>{e.price}</td>
          <td>{e.desc}</td>
          <td>{e.stock}</td>
          <td><button onClick={() => {
            updatestock(e.id, e.stock - 1)
          }}>buy 1</button></td>
          <td><button onClick={() => {
            updatestock(e.id, e.stock - 2)
          }}>buy 2</button></td>
          <td><button onClick={() => {
            updatestock(e.id, e.stock - 3)
          }}>buy 3</button></td>

        </tr>
      )) : "no data"}
    </div>
  );
}

export default App;
