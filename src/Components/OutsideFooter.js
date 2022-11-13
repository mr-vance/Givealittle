import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                ABOUT
              </h6>
              <p>
              This project is an implementation of an online marketplace, similar to Takealot. Only features requested by the SDP client were made available.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Navigation</h6>
              <p>
                <a href='http://localhost:3000/' className='text-reset'>
                  HomePage
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  About
                </a>
              </p>
              <p>
                <a href='http://localhost:3000/login' className='text-reset'>
                  LogIn
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Shopping</h6>
              <p>
                <a href='http://localhost:3000/login' className='text-reset'>
                  Cart
                </a>
              </p>
              <p>
                <a href='http://localhost:3000/login' className='text-reset'>
                  WishList
                </a>
              </p>
              <p>
                <a href='http://localhost:3000/login' className='text-reset'>
                  SellPoint
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Braam, Jhb 2001, SA
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@givealittle.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 27 12 345 6789
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright: &nbsp;&nbsp;&nbsp;
        <a className='text-reset fw-bold' href='http://localhost:3000/'>
          Givealittle
        </a>
      </div>
    </MDBFooter>
  );
}