import React, { useState } from 'react';
import axios from 'axios';

interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Payment {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

const CheckoutForm: React.FC = () => {
  const [address, setAddress] = useState<Address>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [payment, setPayment] = useState<Payment>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'address' | 'payment') => {
    const { name, value } = e.target;
    if (type === 'address') {
      setAddress({ ...address, [name]: value });
    } else {
      setPayment({ ...payment, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orderData = {
        address,
        payment,
      };
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, orderData);
      
      console.log('Order Success:', response.data);

    } catch (error) {
      console.error('Order Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="addressLine1" placeholder="Address Line 1" value={address.addressLine1} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="addressLine2" placeholder="Address Line 2" value={address.addressLine2} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="city" placeholder="City" value={address.city} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="country" placeholder="Country" value={address.country} onChange={(e) => handleChange(e, 'address')} />
      <input type="text" name="cardNumber" placeholder="Card Number" value={payment.cardNote']} />
      <input type="text" name="expiryMonth" placeholder="Expiry Month" value={payment.expiryMonth} onChange={(e) => handleChange(e, 'payment')} />
      <input type="text" name="expiryYear" placeholder="Expiry Year" value={payment.expiryYear} onChange={(e) => handleChange(e, 'payment')} />
      <input type="text" name="cvv" placeholder="CVV" value={payment.cvv} onChange={(e) => handleChange(e, 'payment')} />
      
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default CheckoutForm;