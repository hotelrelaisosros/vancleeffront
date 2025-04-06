
import React, { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./SizeGuidModal.css";

const SizeGuidModal = ({ show, setShow }) => {
    
    return (
        <div className="size-guide-popup" style={{ display: show === 'size_guide' ? 'block': 'none' }}>
            <div className="size-guide-popup-title mb-5">
                <h3>FIND YOUR Size</h3> 
                <button className="close-btn-select-size"  onClick={() => setShow("")}>X</button>
            </div>
            <div className="size-guide-popup-description">
                <h5>FIND YOUR SIZE OF BAGUE</h5>
                <p>Scan the QR code and follow the steps to measure your finger turn</p>
                <img src="../../img/size_guide_qr.png" />
            </div>
            
        </div>
    )
}

export default SizeGuidModal