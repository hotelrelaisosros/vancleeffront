import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { OrderMiddleware } from "../../store/order/orderMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import "./Order.css"

const OrderHistory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderItems = useSelector((state) => { return state.order.order_history; });

    const [page, setPage] = useState({
        skip: 0,
        take: 10
    });

    const [gemstoneFaceting, setGemstoneFaceting] = useState([
        { id: "B", value: "Brilliant" },
        { id: "CI", value: "Crushed Ice" },
        { id: "OMI", value: "Old Mint Ice" },
        { id: "RC", value: "Rose Cut" },
    ])

    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(OrderMiddleware.GetOrderHistory(page, token))
    }, [dispatch]);

    const {
        gemShapes, gemStoneColors, birthStones, gemStones, prongStyles, ringSizes,
        bandWidths, settingHeights, bespokeCustomizations, bespokeWithTypes,
        accentStoneTypes, metalTypes, } = useSelector((state) => state.customization);

    const data = useMemo(() => ({
        shapes: gemShapes, colors: gemStoneColors, widths: bandWidths, settingsHeight: settingHeights,
        ringSize: ringSizes, prongStyle: prongStyles, birthstones: birthStones, gemstones: gemStones,
        accentStoneTypes: accentStoneTypes, bespokeCustomizations: bespokeCustomizations, bespokeWithTypes: bespokeWithTypes,
        metalTypes: metalTypes,
    }),
        [gemShapes, gemStoneColors, bandWidths, settingHeights, ringSizes,
            prongStyles, birthStones, gemStones, accentStoneTypes, bespokeCustomizations,
            bespokeWithTypes, metalTypes,
        ]);

    // useEffect(() => {
    //     dispatch(CustomizationMiddleware.fetchAllCustomizationData());
    // }, [dispatch]);

    const getBandWidth = (item) => {
        return data.widths.find((width) => (width.id == item.attributes.band_width_id))?.name
    }

    const getSettingHight = (item) => {
        return data.settingsHeight.find((shight) => (shight.id == item.attributes.setting_height_id))?.name
    }

    const getRingSize = (item) => {
        return data.ringSize.find((size) => (size.id == item.attributes.ring_size_id))?.name
    }

    const getProngSize = (item) => {
        return data.prongStyle.find((style) => (style.id == item.attributes.prong_style_id))?.name
    }

    const getBespokeCustomizationTypeName = (item) => {
        return data.bespokeWithTypes.find((bespokeWithType) => {
            const parentID = bespokeWithType?.bsp_type.find((type) => {
                return type.id == item.id
            })
            if (parentID) {
                return bespokeWithType
            }

        })?.name
    }

    const getFactingName = (faceting_id) => {
        return gemstoneFaceting.find((gemstone) => (gemstone.id === faceting_id))?.value
    }

    const removeItemFromCart = (item) => {
        dispatch(CartMiddleware.RemoveItemFromCart(item.id, token))
        dispatch(CartMiddleware.GetCart(token))
    }

    const getTotalPriceOfCart = () => {
        return orderItems.reduce((total, item) => parseInt(total) + parseInt(item.price), 0);
    }

    const handleContinueShopping = () => {
        navigate('/rings');
    }

    const handleContinueCheckout = () => {
        navigate('/checkout');
    }

    return <>
        <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
            <h1>Order History</h1>
        </div>
        <div className="mt-4 mb-4 container">
            <div className="row">
                <div className="col-3">
                    <MyAccountSidebar />
                </div>
                <div className="col-9">
                    {
                        (orderItems?.length) ?
                            orderItems.map((item, index) => (
                                <div key={index} className="order-container container">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="order-header">ORDER PLACED</div>
                                            <div className="order-details">{item.order_date}</div>
                                        </div>
                                        <div className="col-2">
                                            <div className="order-header">TOTAL</div>
                                            <div className="order-details">₹549.00</div>
                                        </div>
                                        <div className="col-4">
                                            <div className="order-header">SHIP TO</div>
                                            <div className="order-details">{item.customer_name}</div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="order-header">Order # {item.order_number}</div>
                                            <div className="order-details">View order details  Invoice</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        {
                                            (item?.order_products?.length) ?
                                                item?.order_products.map((orderProduct, i) => (
                                                    <div className="col-4 mt-2 mb-2">
                                                        <div className="d-flex">
                                                            <img src="https://placehold.co/100/png" alt="Product Image" />
                                                            <div className="ms-4">
                                                                <div className="product-title">
                                                                    {orderProduct?.products?.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : null
                                        }
                                    </div>
                                    <hr />
                                    <div className="row">
                                        {/* <div className="col-3 ">
                                <div className="order-actions mt-3 flex-column text-end">
                                    <button className="btn mt-1 btn-outline-secondary custom-btn">Track package</button>
                                    <button className="btn mt-1 btn-outline-secondary custom-btn">Return or replace items</button>
                                    <button className="btn mt-1 btn-outline-secondary custom-btn">Leave seller feedback</button>
                                    <button className="btn mt-1 btn-outline-secondary custom-btn">Leave delivery feedback</button>
                                    <button className="btn mt-1 btn-outline-secondary custom-btn">Write a product review</button>
                                </div>
                            </div> */}
                                        <div className="text-end">
                                            <button className="btn btn-link text-decoration-none">Archive order</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : null
                    }
                    {
                        !(orderItems?.length) ?
                            <div className="container cart-page-noproduct">
                                <div className="row justify-content-center">
                                    <div className="col-3" style={{ 'margin': '50px' }}>
                                        <p>No Order found!</p>
                                        <button className="btn btn-outline-dark" onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    </>
};

export default OrderHistory;
