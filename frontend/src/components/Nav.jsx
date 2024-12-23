import React, { useState } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';

function Nav() {
    const [menuActive, setMenuActive] = useState(false);
    const { isLoggedin, LogoutUser, user } = useAuth();

    const handleLogout = () => {
        LogoutUser();
    };

    const toggleMenu = () => {
        setMenuActive((prevState) => !prevState);
    };

      
    return (
        <header className="nav">
            {/* Left Section - Logo */}
            <div className="nav_left">
                <NavLink to="/" className="logo">
                    <img src="/img/logo_beauty.png" alt="Logo" />
                </NavLink>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="nav_right">
                {/* Hamburger Menu */}
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>

                {/* Navigation Menu */}
                <ul className={`menu ${menuActive ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" className="nav-item">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className="nav-item">
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/packages" className="nav-item">
                            Packages
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="nav-item">
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blogs" className="nav-item">
                            Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className="nav-item cart-icon">
                            <i className="fa fa-shopping-cart"></i>
                        </NavLink>
                    </li>

                    {isLoggedin ? (
                        <>
                            {user.isAdmin && (
                                <li>
                                    <NavLink to="/admin" className="nav-item">
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink
                                    className="nav-item logout"
                                    to="/logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className="nav-item profile-icon">
                                    <i className="fa fa-user-circle"></i>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink to="/login" className="nav-item profile-icon">
                                <i className="fa fa-user-circle"></i>
                            </NavLink>
                        </li>
                    )}
                </ul>

            </div>
        </header>
    );
}

export default Nav;
