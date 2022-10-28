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
                        src="https://i.pinimg.com/736x/2a/43/e4/2a43e4b0ca973b99d49254b71b8f8aab.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://png.pngtree.com/png-vector/20200314/ourlarge/pngtree-discount-sale-tag-png-image_2156051.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://www.buenosairesopmaat.com/wp-content/uploads/2015/08/banner-shop.gif"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            
        }


        </div>
    )
}
