import React, { useState } from 'react';
import { useNavigate } from "react-router";
import OwlCarousel from 'react-owl-carousel';
import "./ProductsList.css";
import "./style.css";

const ProductsList = ({ products }) => {
    const [ owlSliderResponsiveOption, setOwlSliderResponsiveOption ] = useState({
        0:{
            items:1,
            nav: true
        },
        600:{
            items:3,
            nav: true
        },
        900:{
            items:3,
            nav: true
        }
    })
    
    const navigate = useNavigate();
    const handleClickOnProduct = (product) => {
        navigate(`/products/ring-two/${product?.id}`)
    }
    
    return (
        <>
            <section className="products-section mt-5 veriant-product-section-ring2">
                <div className="container-fluid nopad">
                    <div className="products-card-title">
                        <h3> DISCOVER ALSO THERE CREATIONS </h3>
                        <p><a >Explore other creations</a></p>
                    </div>
                    <div className="products-card-main">
                        <div className="row">
                            <OwlCarousel className='owl-theme' loop={true} nav={true} dots={true} responsiveClass={true} responsive={owlSliderResponsiveOption} >
                                {products?.map((product, index) => (
                                    <div key={index} className='product-box col-12' onClick={() => handleClickOnProduct(product)}>
                                        { (product?.product_images.length) ? <img src={product?.product_images[0]?.image} alt={product?.title}  /> : <img src="../img/MOQEqajYdECDwcsmouTOdA.jpeg.transform.vca-w350-1x.avif" /> }
                                        <h5>{product?.title}</h5>
                                        <p>{product?.desc} </p>
                                        <p>{product?.price} €</p>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className="products-card-footer">
                        <a>VOIR TOUTE LA COLLECTION Engagement Rings </a>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProductsList