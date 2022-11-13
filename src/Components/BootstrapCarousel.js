import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';

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
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                        
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.punogreenery.co.za/wp-content/uploads/2022/11/slide2.jpg"
                        alt="Second slide"
                    />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>                    
                                        
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.punogreenery.co.za/wp-content/uploads/2022/11/slide3.jpg" 
                    />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>                                        
                </Carousel.Item>
            </Carousel>
            
        }


        </div>
    )
}
