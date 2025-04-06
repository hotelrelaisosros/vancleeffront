import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import { WishListMiddleware } from "../../store/wishlist/wishlistMiddleware";
import NoCustomization from './NoCustomization';
import "./ProductDetails.css";

const ProductDetails = () => {

    const dispatch = useDispatch();
    let { productID } = useParams();
    const navigate = useNavigate();
    const productMeta = useSelector((state) => { return state.products.selectedProduct; });

    useEffect(() => {
        if (productMeta) {
            setImages(productMeta?.images);
            setPrimaryImage(productMeta?.images[0]?.image);    
        }
    }, [productMeta])

    const [primaryImage, setPrimaryImage] = useState(null);
    const [images, setImages] = useState(productMeta?.images);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const formData = { product_id: productID };
        dispatch(ProductsMiddleware.GetSingleProduct(formData));
    }, [dispatch]);


    const handleBack = () => {
        navigate(-1);
    }

    const handleAddToCart = async () => {
        const formData = {
            product_id: productMeta.product.id,
            product_image_id: parseInt(productMeta.image[0]?.id),
            variation_id: parseInt(productMeta?.varation[0]?.id),
            variant_id: parseInt(productMeta?.varation[0]?.id),
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
            product_id: productMeta.product.id,
            product_image_id: parseInt(productMeta.image[0]?.id),
            variation_id: parseInt(productMeta?.varation[0]?.id),
            variant_id: parseInt(productMeta?.varation[0]?.id),
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
            <div className="container product-details-non-ring mt-5 mb-5">
                <div className="prdctz">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-9">
                                    <img id="mainProductImage" src={primaryImage} alt={productMeta?.product?.title} height={'500px'} width={'100%'} />
                                </div>
                            </div>
                            <div className="row">
                                {
                                    images?.map((item, i) =>
                                        JSON.parse(item.image_collection)?.map((singleimage, j) => (
                                            <div className="col-sm-3 col-xl-6 pb-3 image-list" key={`${i}-${j}`}>
                                                <img src={`${window?.env?.STORAGE_URL}${singleimage}`} alt={productMeta?.product?.title} onClick={() => setPrimaryImage(singleimage)} width="100%" />
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <NoCustomization productMeta={productMeta} back={handleBack} addToCart={handleAddToCart} addToWishlist={handleAddToWishlist}/>
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default ProductDetails