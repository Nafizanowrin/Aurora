import React, { useState } from "react";
import Nav from "./Nav"; // Import the Nav component
import Footer from "./Footer"; // Import the Footer component
import "./ProductPage.css";

const ProductPage = () => {
  const products = [
    { id: 1, name: "Luxury Lipstick", price: 20.99, image: "img/product1.jpg" },
    { id: 2, name: "Silky Foundation", price: 30.22, image: "img/product2.jpg" },
    { id: 3, name: "Colorful Eyeshadow Palette", price: 25.30, image: "img/Product3.jpg" },
    { id: 4, name: "Secret Perfume", price: 45.65, image: "img/product4.jpg" },
    { id: 5, name: "Rare Beauty", price: 25.69, image: "img/product5.jpg" },
    { id: 6, name: "Glow Highlighter", price: 25.25, image: "img/product6.jpg" },
    { id: 7, name: "Iconic London", price: 15.50, image: "img/product7.jpg" },
    { id: 8, name: "Pink Lover", price: 7.99, image: "img/product8.jpg" },
    { id: 9, name: "Colorful Eyeshadow Palette", price: 25.50, image: "img/product9.jpg" },
    { id: 10, name: "NARS", price: 15, image: "img/product10.jpg" },
    { id: 11, name: "Luxury Lipstick", price: 20.99, image: "img/product12.jpg" },
    { id: 12, name: "Luxury Lipstick", price: 19.99, image: "img/product13.jpg" },
    { id: 13, name: "Luxury Lipstick", price: 25.25, image: "img/product14.jpg" },
    { id: 14, name: "Luxury Lipstick", price: 25.99, image: "img/product15.jpg" },
    { id: 15, name: "True Match", price: 30.25, image: "img/product16.jpg" },
    { id: 16, name: "Luxury Lipstick", price: 25.50, image: "img/product17.jpg" },
    { id: 17, name: "Silky Foundation", price: 20.50, image: "img/product18.jpg" },
    { id: 18, name: "Silky Foundation", price: 23.16, image: "img/product19.jpg" },
    { id: 19, name: "Secret Perfume", price: 35.75, image: "img/product20.jpg" },
    { id: 20, name: "Silky Foundation", price: 22.25, image: "img/product21.jpg" },
    { id: 21, name: "Diamond Brush Set", price: 26.25, image: "img/product22.jpg" },
    { id: 22, name: "Gift Box", price: 50.75, image: "img/product23.jpg" },
    { id: 23, name: "Stylish Nails", price: 16.25, image: "img/product24.jpg" },
    { id: 24, name: "Stylish Nails", price: 15.99, image: "img/product25.jpg" },
    { id: 25, name: "Gift Box", price: 39.99, image: "img/product26.jpg" },
    { id: 26, name: "Mink Lashes", price: 30.75, image: "img/product27.jpg" },
    { id: 27, name: "Gift Box", price: 40.25, image: "img/product28.jpg" },
    { id: 28, name: "Dove Body Care", price: 50.99, image: "img/product29.jpg" },
    { id: 29, name: "Hair Care", price: 55.25, image: "img/product30.jpg" },
    { id: 30, name: "Combo Set_1", price: 60, image: "img/product31.jpg" },
    { id: 31, name: "Dove Body Care", price: 85.50, image: "img/product32.jpg" },
    { id: 32, name: "Dove Body Care", price: 199.99, image: "img/product33.jpg" },
    { id: 33, name: "Combo Set_2", price: 60.50, image: "img/product34.jpg" },
    { id: 34, name: "Combo Set_3", price: 99.25, image: "img/product35.jpg" },
    { id: 35, name: "Combo Set_4", price: 299, image: "img/product36.jpg" },
    { id: 36, name: "Combo Set_4", price: 389, image: "img/product37.jpg" },
    { id: 37, name: "Mink Lashes", price: 35.50, image: "img/product11.jpg" },
    { id: 38, name: "Combo Set_5", price: 255, image: "img/product38.jpg" },
    { id: 39, name: "Combo Set_6", price: 355, image: "img/product39.jpg" },
    { id: 40, name: "Night Cream", price: 69.99, image: "img/product40.jpg" },
    { id: 41, name: "Hair Care", price: 99.25, image: "img/product41.jpg" },
    { id: 42, name: "Hair Care", price: 99.99, image: "img/product42.jpg" },
    { id: 43, name: "Hair Care", price: 299, image: "img/product43.jpg" },
    { id: 44, name: "Hair Care", price: 399.90, image: "img/product44.jpg" },
    { id: 45, name: "Almond Body Care", price: 259.69, image: "img/product45.jpg" },
    { id: 46, name: "Farmasi Combo", price: 155.25, image: "img/product46.jpg" },
    { id: 47, name: "Hand Cream", price: 25.50, image: "img/product47.jpg" },
    { id: 48, name: "Cleansing Water", price: 6.99, image: "img/product48.jpg" },
    { id: 49, name: "Loreal Hair Pack", price: 12.99, image: "img/product49.jpg" },
    { id: 50, name: "Stylish Nails", price: 9.99, image: "img/product50.jpg" },
    { id: 51, name: "Stylish Nails", price: 5.99, image: "img/product51.jpg" },
    { id: 52, name: "Loreal Combo Set", price: 299.95, image: "img/product52.jpg" },
    { id: 53, name: "Loreal Combo Set", price: 399.99, image: "img/product53.jpg" },
    { id: 54, name: "Aloe Vera Gel", price: 5.99, image: "img/product54.jpg" },
    { id: 55, name: "Lavender Lover", price: 285.99, image: "img/product55.jpg" },
    { id: 56, name: "Aloe Vera Gel", price: 10.99, image: "img/product56.jpg" },
    { id: 57, name: "Loreal Hair Combo Set", price: 399.90, image: "img/product57.jpg" },
    { id: 58, name: "Mielle Hair Combo Set", price: 150.55, image: "img/product58.jpg" },
    { id: 59, name: "Dove Body care", price: 55.55, image: "img/product59.jpg" },
    { id: 60, name: "Vaseline Set", price: 6.99, image: "img/product60.jpg" },
    { id: 61, name: "Body Care Set", price: 199.50, image: "img/product61.jpg" },
    { id: 62, name: "Skin Care Tools", price: 3.99, image: "img/product62.jpg" },
    { id: 63, name: "Hair Massage Tools", price: 2.99, image: "img/product63.jpg" },
    { id: 64, name: "Loreal Combo Set", price: 290.90, image: "img/product64.jpg" },
    { id: 65, name: "Serum", price: 19.99, image: "img/product65.jpg" },
    { id: 66, name: "Black Serum Mask", price: 6.99, image: "img/product66.jpg" },
    { id: 67, name: "Pearl Face Mask", price: 5.95, image: "img/product67.jpg" },
    { id: 68, name: "Face Mask Set", price: 19.50, image: "img/product68.jpg" },
    { id: 69, name: "Hair Vitamins", price: 25.99, image: "img/product69.jpg" },
    { id: 70, name: "Loreal serum", price: 35.50, image: "img/product70.jpg" },
    { id: 71, name: "Face Mask Set", price: 20.50, image: "img/product71.jpg" },
    { id: 72, name: "Hair Care Set", price: 89.99, image: "img/product72.jpg" },
    { id: 73, name: "Optimal Solutions (3 in 1)", price: 99.99, image: "img/product73.jpg" },
    { id: 74, name: "Beauty Box Set_1", price: 20.90, image: "img/product74.jpg" },
    { id: 75, name: "Beauty Box Set_2", price: 99.99, image: "img/product75.jpg" },
    { id: 76, name: "Beauty Box Set_3", price: 120.50, image: "img/product76.jpg" },
    { id: 77, name: "Beauty Box Set_4", price: 50.99, image: "img/product77.jpg" },
    { id: 78, name: "Beauty Box Set_5", price: 199.90, image: "img/product78.jpg" },
    { id: 79, name: "Secret Perfume", price: 499.99, image: "img/product79.jpg" },
    { id: 80, name: "Dior Gift Box", price: 599.95, image: "img/product80.jpg" },

  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const email = localStorage.getItem("email");
  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = async (product) => {
    try {
      
      console.log(email)
      const productWithEmail = {
        email: email,  // Add email first
        ...product,    // Spread the product details after the email
      };

      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productWithEmail),
      });
  
      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        const errorData = await response.json();
        alert(`Failed to add to cart: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Nav /> {/* Add Nav component at the top */}
      <div className="product-page">
        <header className="product-header">
          <h1>Aurora Products</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </header>
        <div className="product-container">
          {currentProducts.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <Footer /> {/* Add Footer component at the bottom */}
    </>
  );
};

export default ProductPage;
