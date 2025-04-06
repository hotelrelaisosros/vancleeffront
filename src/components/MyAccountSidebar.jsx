import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MyAccountSidebar.css";

const MyAccountSidebar = () => {
    const location = useLocation();
    const menuItems = [
        { path: "/", label: "Home", icon: "bi bi-speedometer2" },
        { path: "/order/history", label: "My Orders", icon: "bi bi-box" },
        { path: "/address", label: "Addresses", icon: "bi bi-geo-alt" },
        { path: "/wishlist", label: "Wishlist", icon: "bi bi-heart" },
        { path: "/my-account", label: "Account Details", icon: "bi bi-person" },
        { path: "/logout", label: "Logout", icon: "bi bi-box-arrow-right" },
    ];


    return (
        <div className="account-sidebar">
            <ul className="list-group">
                {
                    menuItems.map((item, index) => (
                        <li key={index} className={`list-group-item ${location.pathname === item.path ? "active" : ""}`  }>
                            <Link to={item.path}><i className={item.icon}></i> {item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default MyAccountSidebar;
