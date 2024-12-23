import React from "react";
import "./profilecard.css";
import { useAuth } from "../store/Auth";
import Footer from "./Footer";
import Nav from "./Nav";
import Bookings from "./Bookings";
import MyProduct from "./MyProduct";

const Profilecard = () => {

const {user} = useAuth();

  return (
    <>
    
    <Nav/>

    <div className="profile-card">
      <div className="profile-header">
        <h3>Aurora Customer Profile Information</h3>
        <img
          src="/img/webflow.jpg"
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-username">{user.username}</h2>
      </div>
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
    </div>

    <Bookings/>

    <MyProduct/>

    <Footer/>
    
    </>
  );
};

export default Profilecard;
