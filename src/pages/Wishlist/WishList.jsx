import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MyAccountSidebar from "../../components/MyAccountSidebar";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import { WishListMiddleware } from "../../store/wishlist/wishlistMiddleware";
import "./WishList";

const WishList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => { return state.wishlist.wishlist_items; });

    const gemstoneFaceting = [
        { id: "B", value: "Brilliant" },
        { id: "CI", value: "Crushed Ice" },
        { id: "OMI", value: "Old Mint Ice" },
        { id: "RC", value: "Rose Cut" },
    ];

    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(WishListMiddleware.GetWishList(token))
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

    useEffect(() => {
        dispatch(CustomizationMiddleware.fetchAllCustomizationData());
    }, [dispatch]);

    const getBandWidth = (item) => {
        let width = data.widths.find((width) => (width.id == item.attributes.band_width_id))?.name;
        if (width) {
            width += "/ " + width
        }
        return width;
    }

    const getSettingHight = (item) => {
        let height = data.settingsHeight.find((shight) => (shight.id == item.attributes.setting_height_id))?.name
        if (height) {
            height += "/ " + height
        }
        return height;
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

    const removeItemFromWishList = async (item) => {
        await dispatch(WishListMiddleware.RemoveItemFromWishList(item.id, token))
        await dispatch(WishListMiddleware.GetWishList(token))
    }

    const addItemToCart = (items) => {

        let formData = {
            product_id: parseInt(items.product_id),
            product_image_id: parseInt(items.product_image.id),
            variation_id: parseInt(items.variant_id),
            variant_id: parseInt(items.variant_id)
        }
        if (isNaN(items.cart_id)) {
            formData = {
                ...formData, ...{
                    metal_type_id: parseInt(items.metal_type_id),
                    metal_type_karat: items.metal_type_karat,
                    band_width_id: parseInt(items.band_width_id),
                    setting_height_id: parseInt(items.setting_height_id),
                    ring_size_id: parseInt(items.ring_size_id),
                    prong_style_id: parseInt(items.prong_style_id),
                    engraved_text: items.engraved_text,

                    bespoke_type: items.bespoke_types_id,
                    bespoke_customization_id: items.bespoke_types_id,
                    bespoke_customization_types_id: items.bespoke_customization_types_id,

                    birth_stone: items.birth_stone_id,
                    birth_stone_id: items.birth_stone_id,

                    gem_stone: parseInt(items.gem_stone_id),
                    gem_stone_id: parseInt(items.gem_stone_id),
                    gem_shape_id: parseInt(items.gem_stone_id),
                    gem_stone_color_id: parseInt(items.gem_stone_color_id),
                    faceting_id: items.faceting_id
                }
            }
        }
        dispatch(CartMiddleware.AddToCart(formData, token));
        navigate('/cart');
    }

    const handleContinueShopping = () => {
        navigate('/rings');
    }

    return <>
        <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
            <h1>Wishlist</h1>
        </div>

        <div className="mt-4 mb-4 container">
            <div className="row">
                <div className="col-3">
                    <MyAccountSidebar />
                </div>
                <div className="col-9">

                    {
                        (wishlistItems?.length) ?
                            <>
                                <div className="container my-5 wishlist-page">
                                    <div className="row border-bottom pb-3">
                                        <div className="col-10">Wishlist Items</div>
                                        <div className="col-2 text-end text-muted">Price</div>
                                    </div>
                                </div>
                                {
                                    (wishlistItems).map((item, index) => (
                                        <div key={index} className="container my-5 cart-page">
                                            <div className="row my-4">
                                                <div className="col-md-2">
                                                    {
                                                        (item?.product_image?.image) ?
                                                            <img src={item?.product_image?.image} alt="Product" className="img-fluid rounded" /> :
                                                            <img src={"https://placehold.co/400x400"} alt="Product" className="img-fluid rounded" />
                                                    }
                                                </div>

                                                <div className="col-md-8 product-summary">
                                                    {
                                                        (isNaN(item.cart_id) && !Array.isArray(item.attributes)) ?
                                                            <React.Fragment>
                                                                <h5>Your Dream Ring</h5>
                                                                <p>Product inclusions:</p>
                                                                <ul className="list-disc-style" style={{ 'listStyle': 'disc' }}>
                                                                    <li>
                                                                        <strong>1x {item.variation.title}</strong>  {item?.attributes?.metal_type_karat} {item?.attributes?.metal_type} {getBandWidth(item)} {getSettingHight(item)}
                                                                        <ul className="list-circle-style ml-5" style={{ 'listStyle': 'circle' }}>
                                                                            <li>Ring Size: {getRingSize(item)} </li>
                                                                            <li>Prong Style: {getProngSize(item)}</li>
                                                                            <li>Crafting Timeframe: Standard Crafting: 12-14 weeks</li>
                                                                        </ul>
                                                                    </li>
                                                                    {
                                                                        (item?.bespoke_types?.length) ?
                                                                            (item?.bespoke_types).map((bespoke_type, index) => (
                                                                                <li key={index}>
                                                                                    1x {getBespokeCustomizationTypeName(bespoke_type)} - {bespoke_type?.name}
                                                                                </li>
                                                                            )) : null
                                                                    }

                                                                    {
                                                                        data?.gemstones?.length &&
                                                                        data.gemstones.map((gemstone, index) => ((gemstone.id === item?.gem_stone?.id) ?
                                                                            (item?.gem_stone.type === "M") ?
                                                                                <li key={index}>
                                                                                    1x {(item?.gem_stone.type === "M") ? "Moissanite" : "Lab Grown Diamond"} {gemstone.shape}
                                                                                    <ul className="list-circle-style ml-5" style={{ 'listStyle': 'circle' }}>
                                                                                        <li>Faceting Type: {getFactingName(item?.attributes?.faceting_id)}</li>
                                                                                        {
                                                                                            (item?.gem_stone.type === "M") ?
                                                                                                <li>Moissanite Colour: {item?.gem_stone?.color}</li>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            (item?.gem_stone.type === "LGD") ?
                                                                                                <li>Lab Grown Diamond Colour: {item?.gem_stone?.color}</li>
                                                                                                : null
                                                                                        }
                                                                                    </ul>
                                                                                </li> : null
                                                                            : null
                                                                        ))
                                                                    }
                                                                    {
                                                                        (item?.birth_stones?.length) ? item?.birth_stones.map((birth_stone, index) => (
                                                                            <li key={index}>
                                                                                1x {birth_stone.name}
                                                                                <ul className="list-circle-style ml-5" style={{ 'listStyle': 'circle' }}></ul>
                                                                            </li>
                                                                        )) : null
                                                                    }
                                                                </ul>
                                                            </React.Fragment>
                                                            : null
                                                    }

                                                    {
                                                        (isNaN(item.cart_id) && Array.isArray(item.attributes)) ? 
                                                            <React.Fragment>
                                                                <p>Product inclusions:</p>
                                                                <ul className="list-disc-style" style={{'listStyle': 'disc'}}>
                                                                    <li>
                                                                        <strong>1x {item.product.title}</strong>
                                                                        <ul className="list-circle-style ml-5" style={{'listStyle': 'circle'}}>
                                                                            <li>Clarity: { item?.clarity?.clarity } </li>
                                                                            <li>Kerat: { item?.kerat?.kerat }</li>
                                                                            <li>Crafting Timeframe: Standard Crafting: 12-14 weeks</li>
                                                                        </ul>
                                                                    </li>

                                                                </ul>
                                                            </React.Fragment> : null
                                                    }

                                                    {
                                                        (!isNaN(item.cart_id)) ? 
                                                            <React.Fragment>
                                                                <ul className="list-disc-style" style={{'listStyle': 'disc'}}>
                                                                    <li>
                                                                        <strong>1x {item.variation.title}</strong> {item?.attributes?.metal_type_karat} {item?.attributes?.metal_type} {getBandWidth(item)} {getSettingHight(item)}
                                                                        <ul className="list-circle-style ml-5" style={{'listStyle': 'circle'}}>
                                                                            <li>Crafting Timeframe: Standard Crafting: 12-14 weeks</li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </React.Fragment> : null
                                                    }

                                                    <div>
                                                        <button className="me-3 link-button" onClick={() => removeItemFromWishList(item)}>
                                                            Remove
                                                        </button>
                                                        <button className="me-3 link-button" onClick={() => addItemToCart(item)}>
                                                            Add Item To Cart
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-2 text-end">{item?.price}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            : null
                    }

                    {
                        !(wishlistItems?.length) ?
                            <div className="container cart-page-noproduct">
                                <div className="row justify-content-center">
                                    <div className="col-3" style={{ 'margin': '50px' }}>
                                        <p>Your wishlist is empty.</p>
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

export default WishList;
