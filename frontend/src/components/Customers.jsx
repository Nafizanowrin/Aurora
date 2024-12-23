import React, {useEffect} from 'react';
import './Customers.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Customers = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);


    return (
        <section className='customers' data-aos='fade-up'>
            <div className='container '>
                    <div className="customers_uptitle">Testimonials</div>
                    <div className="customers_title">What our Customers says...</div>
                    
                    <div className='cards'>
                    <div className="customers_wrapper">
                    <div className='customers_text'>“ Made an appointment with Aurora and it was the best experience in a salon I have ever had. They went above and beyond to make sure I got what I wanted, & patiently explained her process “
                    </div>
                    <div className='customers_card'>
                        <img className="james" src ='/img/james1.jpg'/>
                        <div className='customers_info'>
                            <img className="stars" src ='../img/star.png'/>
                            <div className='customers_name'>Pat McGrath</div>
                            <div className='customers_citizen'>United Kingdom</div>
                         </div>
                         <div className='customers_vector_wrapper'>
                            <img className="customers_vector" src ='/img/ugol.png'/>
                            <img className="customers_vector" src ='/img/ugol.png'/>
                        </div>
                    </div>
                 </div>


                
                    
                    <div className="customers_wrapper2">
                    <div className='customers_text2'>“ I've been going to Aurora they are always goes above and beyond my expectations and leaves my hair looking and feeling fantastic and looking exactly as I hoped, if not better “
                    </div>
                    <div className='customers_card'>
                        <img className="james" src ='/img/carolyn.png'/>
                        <div className='customers_info'>
                            <img className="stars" src ='/img/star.png'/>
                            <div className='customers_name'>Gucci Westman</div>
                            <div className='customers_citizen'>United Kingdom</div>
                         </div>
                         <div className='customers_vector_wrapper'>
                            <img className="customers_vector" src ='/img/ugol.png'/>
                            <img className="customers_vector" src ='img/ugol.png'/>
                        </div>
                    </div>
                 </div>
                 </div>
           
           
           </div>
        </section>
    )
}

export default Customers;