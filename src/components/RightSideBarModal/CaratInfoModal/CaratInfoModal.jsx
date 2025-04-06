
import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./CaratInfoModal.css";

const CaratInfoModal = ({ show, setShow }) => {
    
    
    return (
        <div className="cartinfo-popup" style={{ display: show === 'carat_info' ? 'block': 'none' }}>
            <div className="cartinfo-popup-title mb-5">
                <h3>Diamond Guide</h3> 
                <button className="close-btn-cartinfo"  onClick={() => setShow("")}>X</button>
            </div>
            <hr />
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="cartinfo-accourdian-header">CARAT</Accordion.Header>
                    <Accordion.Body>
                        <img src="../img/diamond-carat-guide-3x.jpg" alt="diamond-carat" height={'200px'} />
                        
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header className="cartinfo-accourdian-header">CLARITY</Accordion.Header>
                    <Accordion.Body>
                        <p>
                            Clarity is an essential criterion, defined by the number, size, nature and position of inclusions. Clarity classification ranges from FL (flawless) to I3 (imperfections visible to the naked eye).
                        </p>
                        <img src="../img/diamond-clarity-guide-3x-.jpg" alt="diamond-carat" height={'200px'} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className="cartinfo-accourdian-header">COLOR</Accordion.Header>
                    <Accordion.Body>
                        <p>
                            Color is a key element in diamond evaluation. It is graded on a scale ranging from D (exceptionally white diamond) to Z (white-tinted diamond). The whiter the diamond, the rarer it is.
                        </p>
                        <img src="../img/color-guide-3x.jpg" alt="diamond-carat" height={'150px'} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
        </div>
    )
}

export default CaratInfoModal