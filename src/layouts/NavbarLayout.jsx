import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavbarLayout = ({ children }) => {
    return (
      <>
        <Navbar styleName="position-absolute mb-5" />
        {children}
        <Footer />
      </>
    );
};

export default NavbarLayout;
  