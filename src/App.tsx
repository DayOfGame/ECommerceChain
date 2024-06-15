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
  const cacheDuration = 3600000; // Cache duration in milliseconds (e.g., 3600000ms = 1 hour)

  useEffect(() => {
    // Function to check if the cache is valid
    const isCacheValid = (cacheTimestamp: number) => {
      const now = new Date().getTime();
      return (now - cacheTimestamp) < cacheDuration;
    };

    const cachedProducts = localStorage.getItem('products');
    const cacheTimestamp = localStorage.getItem('products_timestamp');

    if (cachedProducts && cacheTimestamp && isCacheValid(parseInt(cacheTimestamp))) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      fetch(`${API_URL}/products`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
          localStorage.setItem('products_timestamp', new Date().getTime().toString());
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