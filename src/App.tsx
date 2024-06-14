import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

const API_URL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cachedProducts = localStorage.getItem('products');

    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      fetch(`${API_URL}/products`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
        })
        .catch(error => console.error("Fetching products failed", error));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
        </nav>
        <Switch>
          <Route exact path="/" render={(props) => <ProductList {...props} products={products} />} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;