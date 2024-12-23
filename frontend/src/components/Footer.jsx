import React from 'react';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Social Media Links */}
                <div className="social-footer_wrapper">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social_footer_item">
                        <img className="social_footer" src="/img/f.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social_footer_item">
                        <img className="social_footer" src="/img/ptica.png" alt="Twitter" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social_footer_item">
                        <img className="social_footer" src="/img/link.png" alt="LinkedIn" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social_footer_item">
                        <img className="social_footer" src="/img/insta.png" alt="Instagram" />
                    </a>
                </div>

                {/* Footer Links */}
                <div className="footer_blocks_wrapper">
                    {/* Explore Section */}
                    <div className="footer_block">
                        <h4 className="footer_block_title">Explore</h4>
                        <ul className="footer_block_links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/articles">Articles</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        
                        </ul>
                    </div>

                    {/* Utility Pages Section */}
                    <div className="footer_block">
                        <h4 className="footer_block_title">Utility Pages</h4>
                        <ul className="footer_block_links">
                            <li><a href="/style-guide">Style Guide</a></li>
                            <li><a href="/404">404 Not Found</a></li>
                            <li><a href="/password-protected">Password Protected</a></li>
                            <li><a href="/licenses">Licenses</a></li>
                            <li><a href="/changelog">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Keep in Touch Section */}
                    <div className="footer_block">
                        <h4 className="footer_block_title">Keep in Touch</h4>
                        <ul className="footer_block_links">
                            <li>Address: 10 Trinity Square, London EC3N 4AJ, UK</li>
                            <li><a href="mailto:aurora@doctors.com">Mail: aurora@doctors.com</a></li>
                            <li><a href="tel:+442077022580">Phone: 020 7702 2580</a></li>
                        </ul>
                    </div>

                    {/* Working Hours Section */}
                    <div className="footer_block">
                        <h4 className="footer_block_title">Working Hours</h4>
                        <ul className="footer_block_links">
                            <li><span>Monday</span><span>Closed</span></li>
                            <li><span>Tuesday</span><span>9am - 6pm</span></li>
                            <li><span>Wednesday</span><span>9am - 6pm</span></li>
                            <li><span>Thursday</span><span>9am - 6pm</span></li>
                            <li><span>Friday</span><span>9am - 6pm</span></li>
                            <li><span>Saturday</span><span>9am - 6pm</span></li>
                            <li><span>Sunday</span><span>Closed</span></li>
                            <li>Out of hours appointments can be arranged through reception.</li>
                        </ul>
                    </div>
                </div>

                {/* TOP Button */}
                <div className="top-button">
                    <button onClick={scrollToTop}>TOP</button>
                </div>

                <div className="footer_end">© Aurora {new Date().getFullYear()}</div>
            </div>
        </footer>
    );
};

export default Footer;
