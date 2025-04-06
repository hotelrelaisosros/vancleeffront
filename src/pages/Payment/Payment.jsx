import React from 'react'

const Payment = () => {
  return (
    <>
    <div className="banner-home">
        <img src="../img/homebanner.jpg" alt="Banner Image"/>
        <div className="banner-content">
            <h1 style={{color: "white"}}>Timeless elegance</h1>
            <p>Culminating on the wrist or suspended from the neck, jewelry watches offer time a precious setting</p>
            <a href="#" className="click-link upt">Contemplate the passing of time</a>
        </div>
    </div>
    <section className="paymentt" >
    <div className="container ">
  <h3 className="text-center mb-4">MY CART</h3>
  
  {/* <!-- Cart Items --> */}
  <div className="row mb-3">
    <div className="col-12 col-md-8">
      <div className="cart-item d-flex align-items-center">
        <img src="../img/1893859.png.transform.vca-w350-1x.avif" alt="Ring Image" className="me-3"/>
        <div>
          <h6>Frivole ring 1 flower small model</h6>
          <p className="text-muted">750/1000 yellow gold, Diamond<br/>Size: 55</p>
          <a href="#" className="text-decoration-none">Add engraving</a>
        </div>
        <div className="ms-auto text-end">
          <p>3,550 €</p>
          <p className="text-muted">Taxes included</p>
          <button className="btn btn-link text-danger">×</button>
        </div>
      </div>
      <div className="cart-item d-flex align-items-center">
        <img src="../img/1893859.png.transform.vca-w350-1x.avif" alt="Ring Image" className="me-3"/>
        <div>
          <h6>Frivole ring 1 flower small model</h6>
          <p className="text-muted">750/1000 yellow gold, Diamond<br/>Size: 50</p>
          <a href="#" className="text-decoration-none">Add engraving</a>
        </div>
        <div className="ms-auto text-end">
          <p>3,550 €</p>
          <p className="text-muted">Taxes included</p>
          <button className="btn btn-link text-danger">×</button>
        </div>
      </div>
      <div className="gift-wrap d-flex align-items-center">
        <a href="#" className="text-decoration-none">Add a personal message</a>
      </div>
      <div className="gift-wrap d-flex align-items-center">
        <img src="../img/van-cleef-arpels-signature-packaging-checkout.avif"/>
        <div>
          <h6>Gift wrapping</h6>
          <p className="text-muted">All our creations are delicately packaged in an elegant box.</p>
        </div>
      </div>

      
    </div>
    
    {/* <!-- Order Summary --> */}
    <div className="col-12 col-md-4">
      <div className="summary-box">
        <h6>Country / Place of delivery</h6>
        <select className="form-select mb-3">
          <option>France</option>
          <option>Germany</option>
          <option>Italy</option>
          <option>Spain</option>
        </select>
        
        <h6>Delivery method</h6>
        <p>Pick up in store <span className="text-muted">OFFERED</span></p>
        
        <hr/>
        
        <div className="d-flex justify-content-between">
          <p>Total (Taxes included):</p>
          <p>7,100 €</p>
        </div>
        
      </div>
        <button className="btn btn-outline-dark payment-btn">PAYMENT</button>
      
      <div className="text-center mt-4 payment-icons">
       <img src="../img/payment.png"/>
      </div>
    </div>
  </div>

  <div className="text-center mt-5">
    <p>Jewelers and watch experts at your disposal</p>
    <p>Personalized advice</p>
    <p>Discovery of the collections</p>
    <p>Contact Us: +33 1 70 70 02 63</p>
  </div>
</div>
</section>






<section className="extraa">
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <a href="javascript:void(0)">CONTACT US: +33 1 70 70 02 63</a>
                <p>Our advisors are at your disposal for any information you may require.</p>
            </div>

            <div className="col-md-4">
                <a href="javascript:void(0)">FREE DELIVERIES AND RETURNS</a>
                <p>Up to 30 days for refunds and exchanges.</p>
            </div>

            <div className="col-md-4">
                <a href="javascript:void(0)">Authenticity card</a>
                <p>Receive your authenticity card and the certificate of the stone of your piece with your online order.</p>
            </div>
        </div>
    </div>
</section>

    </>
  )
}

export default Payment
