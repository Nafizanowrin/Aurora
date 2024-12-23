import React, {useEffect} from 'react';
import './Lifestyle.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Lifestyle = () => {


    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

    return (
        <section className='about' data-aos='fade-right'>
            <div className='right'>
            <div className='lifestyle_name'>
            Take Your Care
            </div>
            <div className='lifestyle_text'>
            Enhance Your Lifestyle by Embracing Balance and Well-Being in Every Aspect of Your Life
            </div>
            <div className='lifestyle_longtext'>
            Our luxurious salon, in the heart of the City,provides hair services, treatments, and grooming for women.A barber chair ensures privacy while skilled barbers work. Clients will enjoy a great atmosphere where all services are performed with care, creativity, and expertise.
            </div>
            
            <div className='card_items'>
            <div className='card_item'>
                <img className="card_item_photo" src ='/img/monah.png'/>
                <p className='card_item_text'>Beauty <br/> Experts
                </p> 
            </div>

            <div className='card_item'>
                <img className="card_item_photo" src ='/img/cvetok.png'/>
                <p className='card_item_text'>Quality <br/> Services
                </p> 
            </div>

            <div className='card_item'>
                <img className="card_item_photo" src ='/img/shampoo.png'/>
                <p className='card_item_text'>100% <br/> Nature
                </p> 
            </div>
            </div>
           
            </div>
            <div className='left'>
            <img className="photo" src ='/img/monah.jpg'/>
            </div> 
            </section>
    )

}

export default Lifestyle;