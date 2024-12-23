import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
//import Customerblog from '../components/Customerblog'

function Admin() {
  return (
    <div>
        <Nav/>
        {/* <Customerblog/> */}
        <AdminDashboard/>
        <Footer/>
    </div>
  )
}

export default Admin