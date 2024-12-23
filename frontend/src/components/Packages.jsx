import React, { useState } from 'react';
import beautyPackages from './data/Packagedata';
import './Packages.css';
import Footer from './Footer';
import Nav from './Nav';
import {useNavigate} from 'react-router-dom'

const BeautyPackages = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedData, setSortedData] = useState(beautyPackages);
  const [sortOrder, setSortOrder] = useState('default');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterPackages(e.target.value, sortOrder);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterPackages(searchTerm, order);
  };

  const filterPackages = (search, sortOrder) => {
    let filteredData = beautyPackages.filter((packageItem) =>
      packageItem.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === 'lowToHigh') {
      filteredData.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortOrder === 'highToLow') {
      filteredData.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    setSortedData(filteredData);
  };

  const handleAddToCart = (packageItem) => {
    //alert(`${packageItem.name} has been added to your cart!`);
    navigate('/appointment')
  };

  return (
    <>
      <Nav />

      <div className="container">
        {/* Search and Filter Controls */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search Packages..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select onChange={handleSort} value={sortOrder}>
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Package Cards */}
        <div className="package-cards">
          {sortedData.map((packageItem) => (
            <div className="package-card" key={packageItem.id}>
              <div className="card-inner">
                {/* Front Side */}
                <div className="card-front">
                  <img
                    src={packageItem.image}
                    alt={packageItem.name}
                    className="package-image"
                  />
                  <div className="package-info">
                    <h3>{packageItem.name}</h3>
                    <p className="price">{packageItem.price}</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <h3>{packageItem.name}</h3>
                  <p>{packageItem.description}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(packageItem)}
                  >
                    BOOK APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BeautyPackages;
