import React from "react";

const Contactus = () => {
	return (
		<>
			<div className="banner-home">
				<img src="../img/homebanner.jpg" alt="Banner Image" />
				<div className="banner-content">
					<h1 style={{ color: "white" }}>Timeless elegance</h1>
					<p>Culminating on the wrist or suspended from the neck, jewelry watches offer time a precious setting</p>
					<a href="#" className="click-link upt">Contemplate the passing of time</a>
				</div>
			</div>
			<section className="contacts txt1">
				<div className="row justify-content-center align-items-center">
					<div className="contact-cards">
						<div className="row">
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/email.webp" alt="" />
									</div>
									<h6 className="contact-card-heading">Email Us</h6>
									<p>Be guided by our experts:<br />
										info@themoissanitecompany.com</p>
									<button>EMAIL US</button>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/phone.webp" alt="" />
									</div>
									<h6 className="contact-card-heading">Call Us</h6>
									<p>For urgent support Monday through<br />
										Friday, call us: (07) 2140 7193</p>
									<button>CALL US</button>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/calendar.webp" alt="" />
									</div>
									<h6 className="contact-card-heading">Book An Appointment</h6>
									<p>Discover a consultation with us, in-boutique<br />
										or online.</p>
									<button>BOOKINGS</button>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/faq.webp" alt="" />
									</div>
									<h6 className="contact-card-heading">FAQs</h6>
									<p>24/7 assistance, we're here to help your<br />
										journey to forever feel seamless.</p>
									<button>FAQ's</button>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/lifetime.png" alt="" />
									</div>
									<h6 className="contact-card-heading">Lifetime Warranty</h6>
									<p>Forever, and a day. Learn about our Lifetime<br />
										Warranty.</p>
									<button>LIFETIME WARRANTY</button>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="contact-card-1">
									<div className="img">
										<img src="../img/location.webp" alt="" />
									</div>
									<h6 className="contact-card-heading">Our Showrooms</h6>
									<p>Step into our world of lab-grown gemstones,<br />
										and begin designing your dream ring.</p>
									<button>OUR SHOWROOMS</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contactus;
