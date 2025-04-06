import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AuthMiddleware } from '../store/auth/authMiddleware';
import './style.css';

const Footer = () => {
    const [messages,setMessages] = useState({});
    const [emailAddress, setEmailaddress] = useState('');

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.common);

    const userSubscribe = () => {
        try {
            const newMessages = {};
            const formData = {
                emailphone:emailAddress
            };
            const response = dispatch(AuthMiddleware.UserSubscribe(formData));
            response.then((val) => {
                if (val?.status) {
                    newMessages.subscribeStatus = val.message;
                    setMessages(newMessages);
                }
                })
                .catch((err) => {
                    newMessages.subscribeStatus = err.message;
                    setMessages(newMessages);
                });
            
        } catch (error) {
            console.log("Login error:", error);
        }
    }

  return (
   <>
   
	<footer>
			<div className="footer-newsletter">
				<p className="newsletter-title">
					Newsletter
				</p>
				<p className="sub-text">Subscribe to the newsletter and discover the enchanting world of the House, its
					creations,<br />its heritage and its know-how.</p>
				<div className="f-input">
					<input type="email" value={emailAddress} onChange={(e) => setEmailaddress(e.target.value)} placeholder="E-MAIL ADDRESS" />
					{messages.subscribeStatus && <><br /><span className="error" style={{color: 'red', fontSize: '12px'}}>{messages.subscribeStatus}</span></>}
				</div>
				<button onClick={userSubscribe}>SUBSCRIBE</button>
			</div>
			<hr className="vca-hr-light" />
			<div className="footer-logo"><img src="/img/footer-logo.svg" alt="footer logo" /></div>
			<div className="footer-menu1 footer-menu">
				<ul>
					<li><Link to={'/contact-us'}>Contact us</Link></li>
					<li><Link to="/">Advice and services</Link></li>
					<li><Link to="/">Careers</Link></li>
					<li><Link to="/">FAQ</Link></li>
					<li><Link to="/">DANCE REFLECTIONS BY VAN CLEEF & ARPELS</Link></li>
					<li><Link to="/">The school of jewelry art</Link></li>
				</ul>
			</div>
			<div className="footer-menu2 footer-menu">
				<ul>
					<li><Link to="/">Instagram</Link></li>
					<li><Link to="/">facebook</Link></li>
					<li><Link to="/">youtube</Link></li>
					<li><Link to="/">pinterest</Link></li>
					<li><Link to="/">linkedin</Link></li>
				</ul>
			  </div>
			  <div className="nav-footer-container">
				  <nav className="nav-footer">
					  <ul className="footer-list">
						  <li><Link to="/" className="footer-links">Legal Notices</Link></li>
						  <li><Link to="/" className="footer-links">Alternative Dispute Resolution</Link></li>
						  <li><Link to={'/privacy-policy'} className="footer-links">Privacy Policy</Link></li>
						  <li><Link to="/" className="footer-links">Cookies Policy</Link></li>
						  <li><Link to="/" className="footer-links">General Conditions Of Sale</Link></li>
						  <li><Link to="/" className="footer-links">Csr Policy</Link></li>
						  <li><Link to="/" className="footer-links">Site Map</Link></li>
					  </ul>
				  </nav>
				  <p className="footer-text">- VAN CLEEF - ARPELS 2025</p>
			  </div>
		  </footer>
	</>
  )
}

export default Footer