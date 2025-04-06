import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AddressMiddleware } from "../../store/address/addressMiddleware";
import AddAddress from "./AddAddress";
import AddressCard from "./AddressCard";
import UpdateAddress from "./UpdateAddress";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import "./Address.css";

const AddressList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const addressList = useSelector((state) => state.address?.list);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        setAddresses(addressList || []);
    }, [addressList]);
    
    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(AddressMiddleware.GetAddressList(token));
    }, [dispatch]);

    const handleAdd = async (newAddress) => {
        newAddress = {
            address: `${newAddress.street_number} ${newAddress.street_name}`,
            ...newAddress
        }
        await dispatch(AddressMiddleware.CreateAddress(newAddress, token))
        // await dispatch(AddressMiddleware.GetAddressList(token))
        setShowAddForm(false);
    };

    const handleUpdate = async (id, updatedAddress) => {
        updatedAddress = {
            address: `${updatedAddress.street_number} ${updatedAddress.street_name}`,
            ...updatedAddress
        }
        await dispatch(AddressMiddleware.UpdateAddress(id, updatedAddress, token))
        setAddresses(addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
        setEditAddress(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            await dispatch(AddressMiddleware.DeleteAddress(id))
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    return (
    
        <>
            <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
                <h1>Saved Addresses</h1>
            </div>

            <div className="mt-4 mb-4 container">
                <div className="row">
                    <div className="col-3">
                        <MyAccountSidebar />
                    </div>
                    <div className="col-9">
                        {showAddForm ? (
                            <AddAddress onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
                        ) : editAddress ? ( 
                            <UpdateAddress address={editAddress} onUpdate={handleUpdate} onCancel={() => setEditAddress(null)} />
                        ) : (
                            <>
                                {addresses?.length > 0 ? (
                                    addresses.map((address) => (
                                        <AddressCard key={address.id} address={address} onRemove={handleDelete} onEdit={() => setEditAddress(address)} />
                                    ))
                                ) : (
                                    <div className="no-address">
                                        <p>No Address found!</p>
                                    </div>
                                )}

                                <button className="add-address-btn mt-4 mb-4" onClick={() => setShowAddForm(true)}>+ Add New Address</button>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AddressList;
