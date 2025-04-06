import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const ProductInfoSection = ({ product }) => {
    return (
        <>
            <section className="product-static-desc-info-section text-center">
                <div className="mx-auto col-sm-12 col-md-12 col-lg-10 col-xl-10">
                    <p>All in roundness, the lonely Perlée celebrates an emblematic know-how of the House: the golden pearls that adorn the contour of many creations, in a gentle and playful vision of the jewellery. The shimmering bead ring highlights a superb center diamond.
                    <br />The photos provided are only illustrative. The colors, purities and sizes of the parts can therefore vary slightly from the actual products. </p>
                </div>
                <div className="mx-auto col-12">
                    <a className="">
                        Product details &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faGreaterThan} className="ms-2"/> 
                    </a>
                </div>
            </section>
        </>
    )
}

export default ProductInfoSection