import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProduct.css'; // Include CSS for styling

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get logged-in user from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your products.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/product/email/${loggedInUser.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [loggedInUser.email]);

  if (loading) {
    return <div className="products-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="products-error">{error}</div>;
  }

  return (
    <div className="products-section">
      <h3>Your Products</h3>
      {products.length === 0 ? (
        <div className="products-empty">No products found.</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <h4>{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>Amount: {product.amount}</p>
              <p>Status: {product.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
