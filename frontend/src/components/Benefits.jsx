import React, { useEffect } from 'react';
import './Benefits.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Benefits = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const benefitsData = [
        {
            uptitle: "Built with you in mind",
            title: "We know how important it is to maintain strong relationships with clients.",
        },
        {
            uptitle: "The Perfect Salon Services",
            title: "Talented, educated, and fashion-forward artists meet the unique needs of client.",
        },
        {
            uptitle: "Skin Deep Experiences",
            title: "Appropriate for all skin types, sun damage, fine lines and wrinkles, acne, and oily.",
        },
        {
            uptitle: "Essential Spa Pedicure",
            title: "Indulge in a soothing foot bath along with a callous smoothing exfoliating scrub.",
        },
        {
            uptitle: "Skilled Spa Services",
            title: "Our skilled estheticians offer an array of refreshing treatments.",
        },
        {
            uptitle: "Perfect & Natural Products",
            title: "We offer the very best in luxury beauty products for both hair and skin.",
        },
    ];

    return (
        <section className='benefits' data-aos='fade-up'>
            <div className='container'>
                <div className="benefits_uptitle">Our Awesome Benefits</div>
                <div className="benefits_title">What you’ll get from Us</div>
                <div className='arrows'>
                    {benefitsData.map((benefit, index) => (
                        <div className='arrow' key={index}>
                            <div className="arrow_inner">
                                {/* Front Face */}
                                <div className="arrow_front">
                                    <div className='arrow_uptitle'>{benefit.uptitle}</div>
                                    <div className='arrow_title'>{benefit.title}</div>
                                </div>
                                {/* Back Face */}
                                <div className="arrow_back">
                                    <div className='arrow_uptitle'>{benefit.uptitle}</div>
                                    <div className='arrow_title'>Discover More Benefits!</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;


// import React, { useEffect } from "react";
// import "./Benefits.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Benefits = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <section className="benefits" data-aos="fade-up">
//       <div className="container">
//         <div className="benefits_uptitle">Our Awesome Benefits</div>
//         <div className="benefits_title">What you’ll get from Us</div>
//         <div className="arrows">
//           <div className="arrow">
//             <div className="arrow_flip">
//               {/* Front Side */}
//               <div className="arrow_front">
//                 <img
//                   className="arrow_image"
//                   src="/img/benefit1.jpg"
//                   alt="Benefit 1"
//                 />
//               </div>
//               {/* Back Side */}
//               <div className="arrow_back">
//                 <div className="arrow_uptitle">Built with you in mind</div>
//                 <div className="arrow_title">
//                   We know how important it is to maintain strong relationships
//                   with clients.
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="arrow">
//             <div className="arrow_flip">
//               <div className="arrow_front">
//                 <img
//                   className="arrow_image"
//                   src="/img/benefit2.jpg"
//                   alt="Benefit 2"
//                 />
//               </div>
//               <div className="arrow_back">
//                 <div className="arrow_uptitle">The Perfect Salon Services</div>
//                 <div className="arrow_title">
//                   Talented, educated, and fashion-forward artists meet the
//                   unique needs of client.
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="arrow">
//             <div className="arrow_flip">
//               <div className="arrow_front">
//                 <img
//                   className="arrow_image"
//                   src="/img/benefit3.jpg"
//                   alt="Benefit 3"
//                 />
//               </div>
//               <div className="arrow_back">
//                 <div className="arrow_uptitle">Skin Deep Experiences</div>
//                 <div className="arrow_title">
//                   Appropriate for all skin types, sun damage, fine lines and
//                   wrinkles, acne, and oily.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Benefits;
