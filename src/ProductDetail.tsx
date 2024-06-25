import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const handleAddToCart = () => {
    console.log("Product added to cart:", product?.id);
  };

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "auto" }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;