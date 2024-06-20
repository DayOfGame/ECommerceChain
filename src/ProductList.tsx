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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div key={product.id} className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => console.log(`Viewing details for ${product.name}`)}>View Details</button>
      <button onClick={() => console.log(`Adding ${product.name} to cart`)}>Add to Cart</button>
    </div>
  );
}

const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/products`);
    setProducts(response.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Consider setting an error state here to show an error message in your UI.
  }
};

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts(setProducts); 
  }, []);

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsGrid;