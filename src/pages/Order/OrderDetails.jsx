import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { OrderMiddleware } from "../../store/order/orderMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import "./Order.css"

const OrderDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderID } = useParams();

    const order = useSelector((state) => { return state.order?.orderDetails; });

    const [page, setPage] = useState({
        skip: 0,
        take: 10
    });

    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(OrderMiddleware.GetOrderDetails(orderID, token))
    }, [dispatch]);


    return <>
        <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
            <h1>Order Details</h1>
        </div>

        <div className="order-container container mt-4">
            <div className="card p-3 mb-4">
                <h5>Order placed {order?.order_date} | Order number {order?.order_number}</h5>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Shipping Address</h6>
                        <p>{order?.customer_name}</p>
                        <p>{order?.delivery_address}</p>
                        <p>India</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Payment Methods</h6>
                        <p>Mastercard ending in 8003</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Order Summary</h6>
                        { console.log(order?.order_products) }
                        <p>Item(s) Subtotal: €{order?.order_products?.length > 0 ? order?.order_products[0].subtotal : null}</p>
                        <p>Shipping: €0.00</p>
                        <hr />
                        <h6>Grand Total: €{order?.order_products?.length > 0 ? order?.order_products[0].subtotal : null}</h6>
                    </div>
                </div>
            </div>

            <div className="card p-3 mb-4">
                <h6>Delivered on {order?.order_date} at 1:24 PM</h6>
                <p>Delivered in 2 hrs 52 mins.</p>
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <img src="https://placehold.co/100/png" alt="Product" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <p><strong>{order?.order_products?.length > 0 ? order?.order_products[0]?.products.title : null }</strong></p>
                        <p>€{order?.order_products?.length > 0 ? order?.order_products[0]?.subtotal : null}</p>
                        <p>Sold by: Clicktech Retail Private Ltd</p>
                        <p>Return window closed on 15 February 2025</p>
                    </div>
                    <div className="col-md-4 text-end">
                        <button className="btn btn-warning btn-sm me-2">Buy it again</button>
                        <button className="btn btn-outline-secondary btn-sm">View your item</button>
                    </div>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between">
                <button className="btn btn-warning">Get product support</button>
                <button className="btn btn-outline-secondary">Track package</button>
                <button className="btn btn-outline-secondary">Leave seller feedback</button>
                <button className="btn btn-outline-secondary">Leave delivery feedback</button>
                <button className="btn btn-outline-secondary">Write a product review</button>
            </div> */}
        </div>
    </>
};

export default OrderDetails;
