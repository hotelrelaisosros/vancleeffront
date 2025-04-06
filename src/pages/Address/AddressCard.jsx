import React from "react";
import { Button, Card } from "react-bootstrap";

const AddressCard = ({ address, onRemove, onEdit }) => {
    return (
        <Card className="address-card">
            <Card.Body>
                <div className="justify-content-between align-items-start">
                    <div>
                        <Card.Title className="address-name">{address.first_name} {address.last_name} {address.surname}</Card.Title>
                        <p className="mb-0"><strong>Address:</strong> {address.address}, {address.address2}</p>
                        <p className="mb-0"><strong>City:</strong> {address.city}</p>
                        <p className="mb-0"><strong>Country:</strong> {address.country}</p>
                        <p className="mb-0"><strong>Zip Code:</strong> {address.zip}</p>
                        <p className="mb-0"><strong>Phone:</strong> {address.phone_country_code} {address.phone}</p>
                    </div>
                </div>

                <div className="address-actions">
                    <Button className="edit-btn" onClick={onEdit}>EDIT</Button>
                    <Button className="remove-btn" onClick={() => onRemove(address.id)}>REMOVE</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AddressCard;
