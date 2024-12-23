import React from 'react';
import './Error.css';
import Footer from './Footer';
import Nav from './Nav';

function Error() {
  return (
    <div className='error'>
      <Nav />
      <div className="error-content">
        <h1></h1>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
