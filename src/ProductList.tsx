import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsGrid.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => console.log(`Viewing details for ${product.name}`)}>View Details</button>
          <button onClick={() => console.log(`Adding ${product.name} to cart`)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsGrid;