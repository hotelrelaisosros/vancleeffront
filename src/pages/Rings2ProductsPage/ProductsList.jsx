import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import "./style.css";
import "./ProductsList.css";

const ProductsList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let categoryID = 2;
    const allProducts = useSelector((state) => { return state.products.products; });
    
    const { categories } = useSelector((state) => state.category);
    const [subCategory, setSubCategory] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, [allProducts]);

    useEffect(() => {
        const filtered = categories.filter(item => item.sub_category.some(it => it.id == categoryID));
        setSubCategory(filtered);
    }, [categories]);

    useEffect(() => {
        dispatch(ProductsMiddleware.GetAllRing2Products({}));
    }, [dispatch]);

    const handleClickOnProduct = (product) => {
        navigate(`/products/ring-two/${product?.variation?.id}`)
    }

    return (
        <>
            <section className="products-section mt-5 non-ring-product-list-page">
                <div className="container">
                    <div className="title">
                        <h6>{subCategory[0]?.name}</h6>
                        <h3>{subCategory[0]?.sub_category.filter(item => item.id == categoryID)[0].name}</h3>
                        <h6>From simple, worked gold rings to diamond-set models, Van Cleef & Arpels rings are revealed in all their variations. Some creations, such as the Bagues Entre les Doigts™, feature precious motifs that unfold on the hand.</h6>
                    </div>
                    <div className="content">
                        <div className="toppp d-flex">
                            <h5><img src="../img/filter.png" /> Filter</h5>
                            <select>
                                <option defaultValue>SORT BY</option>
                                <option>Recommendations</option>
                                <option>What's new</option>
                                <option>Price (ascending order)</option>
                                <option>Price (descending order)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container-fluid nopad">
                    <div className="products-card-main grid-container">
                        <div className="row">
                            {filteredProducts?.map((product, index) => (
                                <div key={index} className={`product-box col-sm-12 col-md-6 col-lg-4 col-xl-4 grid-item`} onClick={() => handleClickOnProduct(product)}>
                                    { (product?.images.length) ? <img src={product?.images[0]?.image} alt={product?.variation?.title}  /> : <img src="../img/MOQEqajYdECDwcsmouTOdA.jpeg.transform.vca-w350-1x.avif" /> }
                                    <h5>{product?.variation?.title}</h5>
                                    <p>{product?.variation?.desc} </p>
                                    <p>{product?.variation?.price} €</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProductsList