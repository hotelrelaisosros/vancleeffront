import React, { useState, useEffect } from "react";
import "./style.css";
import { AuthMiddleware } from "../store/auth/authMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";

const TopNavbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
				<div className="container d-flex justify-content-between">
					<a href="#" className="btn btn-outline-secondary">
						<i className="bi bi-bag"></i> Back to Cart
					</a>
					<a className="navbar-brand mx-auto" href="#">Van Cleef & Arpels</a>
					<a href="tel:+33170700263" className="btn btn-link text-dark">
						<i className="bi bi-telephone"></i> Contact Us +33 1 70 70 02 63
					</a>
				</div>
			</nav>

			<div className="header-section">
				<h2>Order in progress</h2>
			</div>

			<p className="help-text">
				Our advisors will be happy to help you with this purchase at
				<a href="tel:+33170700263">+33 1 70 70 02 63</a>.
			</p>
		</>
	);
};

export default TopNavbar;
