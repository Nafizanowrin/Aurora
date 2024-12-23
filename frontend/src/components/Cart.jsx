import React, { useState, useEffect } from 'react';
import './Cart.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(localStorage.getItem('email'))
  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${localStorage.getItem('email')}`); // Get products from the API
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, increment) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, amount: item.amount + increment }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const handleProceed = (cartItems) => {
    console.log(cartItems)
    console.log(totalPrice)
    // Prepare the data to send to the API
  const data = {
    amount: totalPrice,
    cartItems: cartItems, // You can adjust this if you want to send only specific fields
  };

  // Extract the IDs of the cart items and join them into a comma-separated string
  const itemIds = cartItems.map(item => item._id).join(',');

  // Construct the API URL with the item IDs
  const apiUrl = `http://localhost:5000/api/pay/initiate-product/${itemIds}`;
  // Call the API using fetch
  fetch(apiUrl, {
    method: "POST", // You might use POST to send data
    headers: {
      "Content-Type": "application/json", // Indicating that we're sending JSON data
    },
    body: JSON.stringify(data), // Convert data to JSON format for the request body
  })
    .then((response) => response.json()) // Parse the response to JSON
    .then((data) => {
      console.log(data)
      if (data.result === "true") {
        const paymentUrl = data.payment_url;

        // Redirect the user to the payment URL
        window.location.href = paymentUrl;
      } else {
          alert('Failed to initiate payment. Please try again later.');
      }

      // Handle the response from the backend here
      console.log("Payment initiation response:", data);
      // You can navigate to a different page or show a success message here
    })
    .catch((error) => {
      // Handle any errors that occurred during the API call
      console.error("Error during payment initiation:", error);
    });
  }

  return (
    <div>
      <Nav />
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty-container">
            <p className="cart-empty">Your cart is empty!</p>
          </div>
        ) : (
          <div className="cart-container">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <h2 className="cart-item-title">{item.name}</h2>
                <p className="cart-item-price">Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-total">
              <h2>Total: ${totalPrice}</h2>
              <button className="checkout-btn"
              onClick={() => handleProceed(cartItems)}
              >Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
