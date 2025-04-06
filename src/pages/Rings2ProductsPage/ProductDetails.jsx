import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import EditorialHighlight from '../../components/EditorialHighlight/EditorialHighlight';
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import { WishListMiddleware } from "../../store/wishlist/wishlistMiddleware";
import CustomizationSubCatTwo from './CustomizationSubCatTwo';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./ProductDetails.css";
import ProductInfoSection from './ProductInfoSection';
import ProductSlider from './ProductSlider';

const ProductDetails = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    const dispatch = useDispatch();
    let { variantID } = useParams();
    const navigate = useNavigate();
    const productMeta = useSelector((state) => { return state.products.selectedProduct; });
    
    
    useEffect(() => {
        if (productMeta && productMeta.image.length ) {
            setImages(productMeta.image);
            setPrimaryImage(productMeta.image[0].image);    
        }
    }, [productMeta])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [primaryImage, setPrimaryImage] = useState(null);
    const [images, setImages] = useState(productMeta?.image);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const formData = { variant_id: variantID };
        dispatch(ProductsMiddleware.GetRing2Product(formData));
    }, [dispatch, variantID]);


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
            <div className="container product-details-non-ring mb-5">
                <div className="prdctz">
                    <div className="row">
                        
                    {isMobile ? (
                        <div className="col-12">
                            <div className='row d-inline-block' style={{ marginTop: '10px', marginBottom: "15px" }}>
                                <Link to="/" className='vca-capital-link' style={{'paddingRight': '0px'}}>Home</Link>
                                <span className='p-0 vca-link-seprator'></span> 
                                <Link to="/products/ring-two" className='vca-capital-link' style={{'paddingRight': '0px'}}>Clothes</Link>
                            </div>
                            <div className="row">
                                {
                                    (primaryImage) ? 
                                        <OwlCarousel className='owl-theme' loop nav dots items={1} >
                                            <div className="image-list">
                                                <img id="mainProductImage" src={primaryImage} alt={productMeta?.varation[0].title} width={'100%'} />
                                            </div>
                                            {
                                                images?.map((item, i) =>
                                                    item.image_collection.map((singleimage, j) => (
                                                        <div className="image-list" key={`${i}-${j}`}>
                                                            <img src={`${singleimage}`} alt={productMeta?.varation[0].title} onClick={() => setPrimaryImage(singleimage)} width={'100%'} />
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </OwlCarousel>
                                    : null
                                }
                                
                            </div>
                        </div>
                    ) : (
                        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                            <div className='row d-inline-block' style={{ marginTop: '10px', marginBottom: "15px" }}>
                                <Link to="/" className='vca-capital-link' style={{'paddingRight': '0px'}}>Home</Link>
                                <span className='p-0 vca-link-seprator'></span> 
                                <Link to="/products/ring-two" className='vca-capital-link' style={{'paddingRight': '0px'}}>Clothes</Link>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9">
                                    <img id="mainProductImage" src={primaryImage} alt={productMeta?.varation[0].title} height={'500px'} width={'100%'} />
                                </div>
                            </div>
                            <div className="row">
                                {
                                    images?.map((item, i) =>
                                        item.image_collection.map((singleimage, j) => (
                                            <div className="col-6 pb-3 image-list" key={`${i}-${j}`}>
                                                <img src={`${singleimage}`} alt={productMeta?.varation[0].title} onClick={() => setPrimaryImage(singleimage)} width="100%" />
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    )}
                        <CustomizationSubCatTwo product={productMeta} back={handleBack} />
                    </div>

                    <hr />
                    <ProductInfoSection product={productMeta} />
                    
                </div>
            </div>

            <hr />
            {
                (productMeta?.other_vairants && productMeta?.other_vairants.length) ? 
                    <ProductSlider products={productMeta?.other_vairants}/>
                : null
            }
            <EditorialHighlight />
            
         

            <section>
                <div style={{ backgroundColor: "#F2EDEA" }}>
                    <div style={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
                        <img src="/img/van-cleef-arpels-bridal-editorialhighlight1-2160-2880.jpg" alt="" height={'500px'}/>
                    </div>
                </div>
            </section>

            {
                (productMeta?.other_vairants && productMeta?.other_vairants.length) ? 
                    <ProductSlider products={productMeta?.other_vairants}/>
                : null
            }
            
            
        </>
    )
}

export default ProductDetails