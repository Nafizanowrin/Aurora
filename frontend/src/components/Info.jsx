import React from 'react';
import './Info.css';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme styles

const Info = () => {
    // Slider settings
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Auto slide
        autoplaySpeed: 3000, // Time between slides
    };

    return (
        <section className='inner'>
            {/* Image Carousel */}
            <Slider {...settings} className="image-slider">
                <div>
                    <img className="slider-image" src="/img/inner9.jpg" alt="Slide 1" />
                </div>
                <div>
                    <img className="slider-image" src="/img/inner11.jpg" alt="Slide 2" />
                </div>
                <div>
                    <img className="slider-image" src="/img/inner3.jpg" alt="Slide 3" />
                </div>
                <div>
                    <img className="slider-image" src="/img/inner6.jpg" alt="Slide 4" />
                </div>
                <div>
                    <img className="slider-image" src="/img/inner8.jpg" alt="Slide 5" />
                </div>
            </Slider>

            {/* Text Content */}
            <div className="text-overlay">
                <div className='info'>
                    <div className="banner">
                        <span className="banner_text">WELCOME TO AURORA!!!</span>
                    </div>
                    <div className='content'>
                        ENHANCE YOUR BEAUTY AND LOOKS
                    </div>
                    <div className='content_text'>
                        Your body does a lot for you, and your caring therapist can help you return the favor in a way that benefits both your physical and mental wellness.
                    </div>
                    <button className='order'>
                        <NavLink to='/appointment'>Book Appointment</NavLink>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Info;
