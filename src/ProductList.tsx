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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>${product.price}</p>
    <button onClick={() => console.log(`Viewing details for ${product.name}`)}>View Details</button>
    <button onClick={() => console.log(`Adding ${product.name} to cart`)}>Add to Cart</button>
  </div>
);

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

const ProductsGrid: React.FC = () => {
  const { products, error } = useFetchProducts();

  if (error) {
    return <div>Error loading products...</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;