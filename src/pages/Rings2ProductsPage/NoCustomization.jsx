import React, { useState } from 'react';

const NoCustomization = ({ productMeta, back, addToCart, addToWishlist }) => {
    console.log(productMeta);
    
    const [product, setProduct] = useState(productMeta);
    
    return (
        <div className="col-6">
            <div className="product-options">
                <div className="product-title">
                    <h3>{product?.title}</h3>
                </div>
                <hr />
                
                <p>Adorn yourself in ethical luxury. Our necklaces are bespoke, made to order in 8 weeks, lovingly handcrafted in Australia from the finest ethically sourced precious metals and hand-selected, certified lab-grown diamonds and moissanites.</p>
                <hr />

                <div className="form-group mb-3">
                    <label className="form-label">CRAFTING TIMEFRAME</label>
                    <input type="text" className="form-control" value="Standard Crafting: 8 weeks" disabled />
                </div>

                <hr />
                <div className="price mb-3">
                    Price <del>€{parseInt(product?.price) }</del>  <b>€{parseInt(product?.price) - parseInt(product?.discount_price)}</b>              
                </div>

                <div className="form-group">
                    <div className="full-width-btns form-group mb-3">
                        <button type="button" className="button1"  onClick={back}>
                            BACK
                        </button>
                        
                        <button type="button" className="button1" onClick={addToWishlist}>
                            WISHLIST
                        </button>
                        
                        <button className="button2" onClick={addToCart}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NoCustomization