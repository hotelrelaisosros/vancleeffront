import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./BirthstoneDialog.css"; // Custom CSS file

const BirthstoneDialog = ({ stone, showBirthStoneModal, onClose, onAdd }) => {
    
    return (
        <Modal show={showBirthStoneModal} onHide={onClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="custom-modal-header">
                <h3>{stone?.name}</h3>
            </div>
            <div className="row text-center display-month-color">
                <div>
                {
                    (stone?.month) ? <>Month: <span className="text-muted">{stone?.month}</span></> : null
                }
                {
                    (stone?.colour) ? <>Colour: <span className="text-muted">{stone?.colour}</span></> : null
                }
                
                {
                    (stone?.price) ? <>Price: <span className="text-muted">{stone?.price}</span></> : null
                }
                
                </div>
            </div>
            <div className="row text-center">
                <div>
                    <img src={stone?.image} alt={stone?.name} className="stone-image my-3" />
                    <p className="stone-description">{stone?.description}</p>
                </div>
            </div>
            <div className="row text-center">
                <div><Button className="add-ring-button" onClick={onAdd}> ADD TO YOUR RING </Button></div>
            </div>
        </Modal>
    );
};

export default BirthstoneDialog;