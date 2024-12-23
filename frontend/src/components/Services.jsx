import React, { useState, useEffect } from "react";
import "./Services.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const [expanded, setExpanded] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Track active image for each card

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Automatically rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevState) => {
        const newState = { ...prevState };
        servicesData.forEach((service, index) => {
          const currentIndex = prevState[index] || 0;
          newState[index] = (currentIndex + 1) % service.images.length;
        });
        return newState;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const servicesData = [
    {
      name: "Spa & Massage",
      description:
        "Your wellness goals and the areas of preference, then unwind with a customized massage experience. This massage will help you relax, reduce stress, and achieve a state of calmness and well-being.",
      images: ["/img/spa.jpg", "/img/spa_back.jpg"],
    },
    {
      name: "Hair & Beauty",
      description:
        "Combining skin-type-specific cleansing & toning, exfoliation, deep-pore cleansing extractions customized treatment for a radiant glow and healthy skin.",
      images: ["/img/hair.jpg", "/img/hair-back.jpg"],
    },
    {
      name: "Body Treatments",
      description:
        "Offers therapeutic benefits such as relief of muscle tension and increased circulation to the areas worked, ensuring both mental and physical relaxation.",
      images: ["/img/skin1.jpg", "/img/skin1-back.jpg"],
    },
    {
      name: "Nail Care",
      description:
        "Indulge in relaxing manicures and pedicures, featuring nail shaping, buffing, and the perfect polish, all while enjoying a soothing hand or foot massage.",
      images: ["/img/nail.jpg", "/img/nail_back.jpg"],
    },
    {
      name: "Makeup Services",
      description:
        "Professional makeup for every occasion, tailored to enhance your natural beauty and confidence for both casual and special events.",
      images: ["/img/makeup.jpg", "/img/makeup-back.jpg"],
    },
    {
      name: "Facial Treatments",
      description:
        "Revitalize your skin with our rejuvenating facial treatments, customized for your unique needs to hydrate, exfoliate, and refresh.",
      images: ["/img/facial.jpg", "/img/facial-back.jpg"],
    },
  ];

  return (
    <section className="services" data-aos="fade-up">
      <div className="services_container">
        {servicesData.map((service, index) => (
          <div className="spa" key={index}>
            {/* Image Slider */}
            <div className="spa_slider">
              <img
                className="spa_photo"
                src={service.images[activeImageIndex[index] || 0]} // Default to first image
                alt={service.name}
              />
            </div>
            {/* Text Information */}
            <div className="spa_name">{service.name}</div>
            <div className={`spa_text ${expanded[index] ? "expanded" : ""}`}>
              {expanded[index]
                ? service.description
                : `${service.description.substring(0, 50)}...`}
            </div>
            <button
              className="read_more"
              onClick={() => toggleReadMore(index)}
            >
              {expanded[index] ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
