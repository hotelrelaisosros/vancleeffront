import React, { useState } from "react";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const HoverSubMenu = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/`);
  };
  return (
    <span className="icon user-ico myaccounticon">
      <div className="myaccount-hoverbox">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/'}>My Account</Link></li>
          <li><Link to={'/order/history/'}>Order</Link></li>
          <li><Link to={'/wishlist'}>WishList</Link></li>
          <li><Link to={'/address'}>Address</Link></li>
          <li><Link to={'/'} onClick={handleLogout}>Logout</Link></li>
        </ul>
      </div>
    </span>
  );
};

export default HoverSubMenu;
