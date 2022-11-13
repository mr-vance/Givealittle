import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function BootstrapCarousel() {
    return (
        <div>
            {
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.punogreenery.co.za/wp-content/uploads/2022/11/slide1.jpg"
                        alt="First slide"   
                    />
                        <Carousel.Caption>
                            <h3>Smart Phones</h3>
                            <p>Buy 2 get 30% off. Promotion valid untill 31 Dec 2022.</p>
                        </Carousel.Caption>
                        
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.punogreenery.co.za/wp-content/uploads/2022/11/slide2.jpg"
                        alt="Second slide"
                    />
                        <Carousel.Caption>
                            <h3>Sound Cacelling Headsets</h3>
                            <p>Buy 2 get 30% off. Promotion valid untill 31 Dec 2022.</p>
                        </Carousel.Caption>                    
                                        
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.punogreenery.co.za/wp-content/uploads/2022/11/slide3.jpg" 
                    />
                        <Carousel.Caption>
                            <h3>High Performance Computers</h3>
                            <p>Buy 2 get 30% off. Promotion valid untill 31 Dec 2022.</p>
                        </Carousel.Caption>                                        
                </Carousel.Item>
            </Carousel>
            
        }


        </div>
    )
}
