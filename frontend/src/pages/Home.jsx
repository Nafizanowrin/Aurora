import React from 'react'
import Nav from '../components/Nav';
import Info from '../components/Info';
import Services from '../components/Services';
import Lifestyle from '../components/Lifestyle';
import Customers from '../components/Customers';
import Benefits from '../components/Benefits';
import Discount from '../components/Discount';
import Updates from '../components/Updates';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
    
      <Nav />
      <Info/>
      <Services/>
      <Lifestyle/>
      <Customers/>
      <Benefits/>
      <Discount/>
      <Updates/>
      <Footer/>

      
    </>
  )
}

export default Home