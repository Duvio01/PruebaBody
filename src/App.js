import axios from 'axios';
import './App.css';
import TableProduct from './components/tableProduct';
import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([])

  const allProducts = async() => {
    const url = 'http://localhost:3002/'
    const allProductsBack =  await axios(url)
    setProducts(allProductsBack.data.rows)
  }

  useEffect( () =>{
    allProducts()
  }, [])

  return (
    <div className="App">
      <h1>Crud</h1>
        <TableProduct products={products}/>
    </div>
  );
}

export default App;
