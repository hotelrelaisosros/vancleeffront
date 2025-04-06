import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import "./RingPage.css";
import "./vancleef.css";
import { WishListMiddleware } from "../../store/wishlist/wishlistMiddleware";

const RingSummary = ({step2,  step4, activeTab, setActiveTab, onNext}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productMeta, setProductMeta] = useState(null);
    const [primaryImage, setPrimaryImage] = useState(null);
    const token = localStorage.getItem('token')

    const [ totalFinalPrice, setTotalFinalPrice ] = useState(null);
    
    const [items, setItems] = useState({...step2,  ...step4});
    
    useEffect(() => {
        getEnumOfProduct({
            metal_type_id: items?.metal_type_id, 
            variant_id: items?.variant_id
        })
    }, []);

    const getEnumOfProduct = async (reqData) => {
        const ennum = await dispatch(ProductsMiddleware.GetProductEnumerations(reqData));
        setProductMeta(ennum)
        setProduct(ennum.varation[0]);
        setPrimaryImage(ennum?.image[0]?.image)
        setItems((prevItems) => ({ ...prevItems, metal_type_id: ennum.varation[0]?.metal_type_id }));       
    }
    
    // Get data from Redux store
    const { 
        gemShapes, gemStoneColors, birthStones, gemStones, prongStyles, ringSizes, 
        bandWidths, settingHeights, bespokeCustomizations, bespokeWithTypes, 
        accentStoneTypes, metalTypes, } = useSelector((state) => state.customization);

    // Update items state to use Redux data
    const data = useMemo(() => ({ 
        shapes: gemShapes, colors: gemStoneColors, widths: bandWidths, settingsHeight: settingHeights, 
        ringSize: ringSizes, prongStyle: prongStyles, birthstones: birthStones, gemstones: gemStones, 
        accentStoneTypes: accentStoneTypes, bespokeCustomizations: bespokeCustomizations, bespokeWithTypes: bespokeWithTypes, 
        metalTypes: metalTypes, }),
    [ gemShapes, gemStoneColors, bandWidths, settingHeights, ringSizes, 
        prongStyles, birthStones, gemStones, accentStoneTypes, bespokeCustomizations, 
        bespokeWithTypes, metalTypes, 
    ]);

    const handleAddToCart = async () => {
        const formData = {
            product_id: parseInt(items.product_id),
            product_image_id: parseInt(items.product_image_id),
            variation_id: parseInt(items.variant_id),
            variant_id: parseInt(items.variant_id),
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
        const response = await dispatch(CartMiddleware.AddToCart(formData, token)); 
        if (response.status === false) {
            console.log(response.data.errors);
            return false;
        }
        
        navigate('/cart');
    }

    const handleAddToWishlist = async () => {
        const formData = {
            product_id: parseInt(items.product_id),
            product_image_id: parseInt(items.product_image_id),
            variation_id: parseInt(items.variant_id),
            variant_id: parseInt(items.variant_id),
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
        const response = await dispatch(WishListMiddleware.AddToWishList(formData, token)); 
        if (response.status === false) {
            console.log(response.data.errors);
            return false;
        }
        
        navigate('/wishlist');
    }
    
    return (
        <>
            <div className="prdctz ring-product-summary">
                <div className="row">
                    <div className="col-6  col-12 col-md-6">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                {
                                    productMeta?.image?.map((item, i) => (
                                        <React.Fragment key={i} >
                                            {item.image_collection.map((singleimage, j) => (
                                                <div className="pb-3 image-list" key={`${i}-${j}`}>
                                                    <img src={singleimage} alt={product?.title} onClick={() => setPrimaryImage(singleimage)} width="100%" />
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))
                                }

                            </div>
                            <div className="  col-12 col-md-9">
                                <img id="mainProductImage" src={primaryImage} alt={product?.variation?.title} height={'550px'} width={'100%'}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-6  col-12 col-md-6">
                        <div className="product-options">
                            <div className="product-title mb-3 d-flex align-items-center justify-content-between">
                                <h3>{product?.title}</h3>
                            </div>
                            <hr />
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Precious Metal Type :&nbsp;</strong> </label>
                                {
                                    data?.metalTypes
                                    ?.filter(item => items.metal_type_id == item.id)
                                    ?.map((item, index) => (
                                        <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                            {item?.title}
                                        </label>
                                    ))
                                }
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Metal Karat :&nbsp;</strong></label>
                                <label className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                    {items?.metal_type_karat}
                                </label>
                            </div>

                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Band Width :&nbsp;</strong></label>
                                {
                                    productMeta?.enumerations?.band_width
                                        ?.filter(item => items.band_width_id === item.id)
                                        ?.map((item, index) => (
                                            <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }}>
                                                {item?.name}
                                            </label>
                                        ))
                                }
                            </div>
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Setting Height :&nbsp;</strong></label>
                                {
                                    productMeta?.enumerations?.setting_heights
                                        ?.filter(item => items.setting_height_id == item.id)
                                        ?.map((item, index) => (
                                            <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                                {item?.name}
                                            </label>
                                        ))
                                }
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Ring Size :&nbsp;</strong></label>
                                {
                                    productMeta?.enumerations?.ring_sizes
                                        ?.filter(item => items.ring_size_id == item.id)
                                        ?.map((item, index) => (
                                            <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                                {item?.name}
                                            </label>
                                        ))
                                }
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Prong Style :&nbsp;</strong></label>
                                {
                                    productMeta?.enumerations?.prong_styles
                                        ?.filter(item => items.prong_style_id == item.id)
                                        ?.map((item, index) => (
                                            <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                                {item?.name}
                                            </label>
                                        ))
                                }
                            </div>

                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Bespoke Customisations :&nbsp;</strong></label>
                                {productMeta?.enumerations?.bespoke_customizations
                                    ?.filter(item => items.bespoke_types_id.includes(item.id))
                                    ?.map(item => {
                                        const customization = data?.bespokeWithTypes?.find(c => c?.id === item.id);
                                        return (
                                            <div key={item.id} className="enum-product-title m-1" style={{ paddingLeft: "10px" }}>
                                                {item?.name}
                                                {customization?.bsp_type
                                                    ?.filter(i => items.bespoke_customization_types_id.includes(i.id))
                                                    ?.map(i => (
                                                        <span key={i.id}> - {i?.name}</span>
                                                    ))}
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Hidden Birthstones :&nbsp;</strong></label>
                                {
                                    productMeta?.enumerations?.birth_stones
                                        ?.filter(item => items.birth_stone_id == item.id)
                                        ?.map((item, index) => (
                                            <label key={index} className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                                {item?.name}
                                            </label>
                                        ))
                                }
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="enum-product-title"><strong>Complimentary Engraving :&nbsp;</strong></label>
                                <label className="enum-product-title" style={{ paddingLeft: "0px" }} >
                                    {items?.engraved_text}
                                </label>
                            </div>
                            <hr />
                            {
                                gemStones
                                    ?.filter(item => items.gem_stone_id == item.id)
                                    ?.map((item, index) => 
                                        <React.Fragment key={index}>
                                            <div className="form-group mb-2">
                                                <label className="enum-product-title"><strong>Gemstone :&nbsp;</strong></label>
                                                <label className="enum-product-title" >
                                                    {item?.shape}
                                                </label>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="enum-product-title"><strong>Carat :&nbsp;</strong></label>
                                                <label className="enum-product-title" >
                                                    {item?.carat} cr
                                                </label>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="enum-product-title"><strong>Colour :&nbsp;</strong></label>
                                                <label className="enum-product-title" >
                                                    {item?.color}
                                                </label>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="enum-product-title"><strong>Clarity :&nbsp;</strong></label>
                                                <label className="enum-product-title" >
                                                    {item?.clarity}
                                                </label>
                                            </div>
                                        </React.Fragment>
                                    )
                            }
                            <hr />

                            <div className="form-group">
                                <div className="full-width-btns form-group mb-3">
                                    <button type="button" className="button1" onClick={() => setActiveTab(2)}>
                                        BACK
                                    </button>
                                    
                                    <button type="button" className="button1" onClick={handleAddToWishlist}>
                                        WISHLIST
                                    </button>
                                    
                                    <button className="button2" onClick={handleAddToCart}>
                                        ADD TO CART
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div> 

                    
                    
                </div>
            </div>
        </>
    );
}

export default RingSummary;