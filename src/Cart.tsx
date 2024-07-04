import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ErrorState = {
  isError: boolean;
  message: string;
};

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<ErrorState>({ isError: false, message: '' });

  useEffect(() => {
    try {
      const initialCartItems: Product[] = [
        { id: 1, name: 'Product 1', price: 99.99, quantity: 1 },
        { id: 2, name: 'Product 2', price: 149.99, quantity: 2 },
      ];

      setCartItems(initialCartItems);
      calculateTotalPrice(initialCart6рItems);
    } catch (e) {
      handleError(e);
    }
  }, []);

  const handleError = (e: Error) => {
    setError({ isError: true, message: e.message });
  };

  const handleRemove = (id: number) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    } catch (e) {
      handleError(e);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    try {
      const updatedCartItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item,
      );
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    } catch (e) {
      handleError(e);
    }
  };

  const calculateTotalPrice = (items: Product[]) => {
    try {
      const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {error.isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <p>Your cart is Empty</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  {item.quantity > 1 && (
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  )}
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button>Checkout</button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;