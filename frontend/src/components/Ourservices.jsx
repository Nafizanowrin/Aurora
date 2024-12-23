import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Ourservices.css";

const Ourservices = () => {
  const services = [
    { name: "Deep Tissue", description: "A therapeutic massage used for relieving muscles.", price: "from $48.00" },
    { name: "Body Scrub", description: "Perfect way to relieve all that unwanted stress in the body.", price: "from $18.00" },
    { name: "Foot Massage", description: "Get a relaxing massage focused on your feet and lower legs.", price: "from $18.00" },
    { name: "Scalp Treatments", description: "Superior gray creates a rich, natural look with less fading.", price: "from $15.00" },
    { name: "Hair Cut", description: "A stylish haircut tailored to your preferences and face shape.", price: "from $25.00" },
    { name: "Hair Color", description: "Vibrant color for your hair, from bold shades to subtle highlights.", price: "from $50.00" },
    { name: "Fertility Massage", description: "Help support reproductive health and the menstrual cycle.", price: "from $18.00" },
    { name: "Blemish Buster", description: "Deep cleansing facial rebalances to promote healthy skin.", price: "from $40.00" },
    { name: "Oxygen Facial", description: "Hydrates, tones, lifts, and adds radiance to the skin.", price: "from $32.00" },
    { name: "Lash Lift", description: "Treatment for natural lashes that can add curl and definition.", price: "from $25.00" },
    { name: "Manicure", description: "Get your nails beautifully shaped and polished with a relaxing hand massage.", price: "from $20.00" },
    { name: "Pedicure", description: "Pamper your feet with a soothing pedicure, including nail care and exfoliation.", price: "from $25.00" },
    { name: "Facial", description: "A rejuvenating facial to cleanse, hydrate, and refresh your skin. 4 types of facial.", price: "from $40.00" },
    { name: "Makeup Makeover", description: "A personalized makeup makeover to enhance your features and create a flawless look for any occasion.", price: "from $60.00" },
    { name: "Bridal Package", description: "A complete bridal beauty package, including makeup, facial, hair styling, and more.", price: "$300.00" },
    { name: "Party Makeover", description: "A glamorous makeover for a night out, including makeup, hair, and styling.", price: "$150.00" },
    { name: "Facial Combo", description: "A rejuvenating facial package that includes cleansing, exfoliation, and hydrating masks.", price: "$80.00" },
    { name: "Spa Day Package", description: "A relaxing spa day package with body massage, foot scrub, and steam bath.", price: "$120.00" },
    { name: "Makeup Makeover", description: "A personalized makeup makeover to enhance your features and create a flawless look.", price: "$100.00" },
    { name: "Hair Styling Package", description: "A complete hair styling service including cut, color, and styling for any occasion.", price: "$80.00" },
    { name: "Luxury Anti-Aging Facial", description: "An advanced anti-aging facial that uses the latest technology to reduce fine lines and wrinkles.", price: "$180.00" },
    { name: "Body Scrub & Wrap", description: "A body scrub and wrap treatment to exfoliate your skin and hydrate it deeply.", price: "$100.00" },
    { name: "Hair Color & Highlights", description: "A luxurious hair coloring and highlighting service to bring vibrance and shine to your hair.", price: "$120.00" },
    { name: "Women’s Grooming Package", description: "A grooming package for men that includes hair styling, facial, and beard trimming.", price: "$90.00" },
    { name: "Luxury Pedicure & Manicure", description: "A pampering pedicure and manicure session that includes exfoliation, hydration, and nail care.", price: "$70.00" },
    { name: "Acne Treatment Facial", description: "A targeted facial for acne-prone skin that helps reduce inflammation and clear up blemishes.", price: "$90.00" },
    { name: "Herbal Facial Detox", description: "A detoxifying facial using herbal products to cleanse and refresh the skin.", price: "$70.00" },
    { name: "Hot Stone Massage", description: "A relaxing hot stone massage therapy to relieve tension and promote deep relaxation.", price: "$110.00" },
    { name: "Teen Acne Facial", description: "A facial designed for teens to manage and treat acne while nourishing the skin.", price: "$60.00" },
    { name: "Classic Manicure & Pedicure", description: "A classic treatment for manicures and pedicures to keep your hands and feet looking their best.", price: "$50.00" },
    { name: "Gel Nail Art", description: "A creative gel nail art design, perfect for those who want stylish, long-lasting nails.", price: "$40.00" },
    { name: "Brow & Lash Tint", description: "Enhance your brows and lashes with a tint that adds definition and depth.", price: "$45.00" }

  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="services">
      <section className="ourservices">
        <div className="container">
          <div className="ourservice_uptitle">Our Services</div>
          <div className="ourservices_title">Creative excellence and unparalleled hospitality</div>
          <input
            type="text"
            placeholder="Search for a service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="praces_wrapper">
            <div className="prices_list">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <div
                    key={index}
                    className={`prices_item ${index === activeIndex ? "active" : ""}`}
                    onClick={() => handleItemClick(index)}
                  >
                    <div className="prices_title">
                      <div>{service.name}</div>
                      <div>{service.price}</div>
                    </div>
                    <div className="prices_description">{service.description}</div>
                  </div>
                ))
              ) : (
                <p>No services match your search.</p>
              )}
            </div>
            <button className="appoinment">
              <NavLink to="/appointment">Get an appointment</NavLink>
            </button>
          </div>
        </div>
      </section>
      <div className="services-img">
        <img className="mask" src="/img/maska.jpg" alt="Mask" />
      </div>
    </div>
  );
};

export default Ourservices;
