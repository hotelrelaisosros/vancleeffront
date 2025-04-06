import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CheckoutLayout = ({ children }) => {
    return (
      <>
        <Navbar styleName="navbar-background" />
        <p class="all_children">
        {children}
        </p>
        <Footer />
      </>
    );
};

export default CheckoutLayout;
  