import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import "./RingPage.css";
import RingsStep2 from "./RingsStep2";
import RingsStep4 from "./RingStep4";
import RingSummary from "./RingSummary";
import "./vancleef.css";

const RingsProductListPage = () => {

    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const {
        gemShapes, gemStoneColors, birthStones, gemStones, prongStyles, ringSizes,
        bandWidths, settingHeights, bespokeCustomizations, bespokeWithTypes,
        accentStoneTypes, metalTypes,
    } = useSelector((state) => state.customization);

    const allProducts = useSelector((state) => { return state.products.products; });
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    
    const [selectedMetalType, setSelectedMetalType] = useState(null);
    const [selectedStoneType, setSelectedStoneType] = useState(null);
    
    const [step2Items, setStep2Items] = useState(null);
    const [step4Items, setStep4Items] = useState(null);
    const [ringSummary, setRingSummary] = useState(false);

    const handleNextFromStep2 = (items) => {
        setStep2Items(items);
    };

    const handleNextFromStep4 = (items) => {
        setStep4Items(items);
        setRingSummary(true)
        setActiveTab('all')
    };

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, [allProducts]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...allProducts];
            if (selectedStoneType) {
                filtered = filtered.filter(
                    (product) => product?.variation?.gem_shape_id == selectedStoneType
                );
            }
            if (selectedMetalType) {
                filtered = filtered.filter(
                    (product) => product?.variation?.metal_type_id == selectedMetalType
                );
            }
            setFilteredProducts(filtered);
        };

        applyFilters();
    }, [selectedMetalType, selectedStoneType, allProducts]);

    const handleFilterChange = (type, value) => {
        if (type === "stoneType") {
            setSelectedStoneType(value);
        } else if (type === "metalType") {
            setSelectedMetalType(value);
        }
    };

    useEffect(() => {
        const formData = { skip: 0, take: 10, };
        dispatch(CustomizationMiddleware.fetchAllCustomizationData());
        dispatch(ProductsMiddleware.GetAllProducts(formData));
    }, [dispatch]);

    // Update items state to use Redux data
    const data = useMemo(
        () => ({
            shapes: gemShapes, colors: gemStoneColors, widths: bandWidths,
            settingsHeight: settingHeights, ringSize: ringSizes, prongStyle: prongStyles, birthstones: birthStones,
            gemstones: gemStones, accentStoneTypes: accentStoneTypes, bespokeCustomizations: bespokeCustomizations,
            bespokeWithTypes: bespokeWithTypes, metalTypes: metalTypes,
        }),
        [
            gemShapes, gemStoneColors, bandWidths, settingHeights, ringSizes, prongStyles,
            birthStones, gemStones, accentStoneTypes, bespokeCustomizations, bespokeWithTypes, metalTypes,
        ]
    );

    useEffect(() => {
        if (selectedProduct == null) {
            setActiveTab(1)
        } else {
            setActiveTab(2);
        }
    }, [selectedProduct]);

    useEffect(() => {
        if ((activeTab == 2 || activeTab == 3 || activeTab == 4) && selectedProduct == null) {
            alert("Please select product first!");
            setActiveTab(1);
        }
    }, [activeTab, selectedProduct])

    return (
        <>
         <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
            <h1>Customize Your Ring</h1>
        </div>

            <div className="container d-flex mt-5 mb-5">
                <div className={'tab ' + (activeTab >= 1 || activeTab == 'all' ? 'active' : '')} style={{ zIndex: 10 }} onClick={() => setActiveTab(1)}>
                    1. Select your Setting
                </div>
                <div className={'tab ' + (activeTab >= 2 || activeTab == 'all' ? 'active' : '')} style={{ zIndex: 9 }} onClick={() => setActiveTab(2)}>
                    2. Customise your Setting
                </div>
                <div className={'tab ' + (activeTab >= 3 || activeTab == 'all' ? 'active' : '')} style={{ zIndex: 8 }} onClick={() => setActiveTab(3)}>
                    3. Bespoke Customisations
                </div>
                <div className={'tab ' + (activeTab >= 4 || activeTab == 'all' ? 'active' : '')} style={{ zIndex: 7 }} onClick={() => setActiveTab(4)}>
                    4. Select your Gemstone
                </div>
            </div>

            <div className={`container`} hidden={activeTab != 1} id="content1">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12" >
                        <h5>Select Gemstone Type</h5>
                        <div className="btn-images list-gemstone-type">
                            {data?.shapes?.map((item, index) => {
                                return (
                                    <label key={index} className="radio-container d-flex align-items-center text-center mr-2" aria-label={item.name} onClick={() => handleFilterChange("stoneType", item.id)} style={{ "paddingLeft": "0px", "marginRight": "5px" }}>
                                        <input className="gemstone_type" type="radio" name="stoneType" value={item.title} />
                                        <img src={item.image} className="rounded-circle" height={'40px'} width={'40px'} title={item.name} />
                                        {/* <img src={'https://placehold.co/40/png'} className="rounded-circle" height={'40px'} width={'40px'} /> */}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12" >
                        <h5>Select Metal Type</h5>
                        <div className="row">
                            {
                                (data?.metalTypes?.length) ? data.metalTypes.map((item, index) => (
                                    <div key={index} className="col-3">
                                        <label className="radio-container d-flex align-items-center text-center" style={{ "paddingLeft": "0px" }} onClick={() => handleFilterChange("metalType", item.id)} >
                                            <input className="metal_type_checkbox" type="radio" name="metalType" value={item.title} />
                                            <img src={item.image} className="rounded-circle me-2" height={'25px'} width={'25px'} title={item.title}/>
                                            {/* <img src={'https://placehold.co/25/png'} className="rounded-circle me-2" height={'25px'} width={'25px'} />  */}
                                            {item.title}
                                        </label>
                                    </div>
                                )) : null
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredProducts?.map((product, index) => {
                        if (product.product.sub_category_id == "1") {
                            return (
                                <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4 ring-product-card" key={index}>
                                    {/* { (product?.images.length) ? <img src={product?.images[0]?.image} alt={product.variation.title} className={`img-fluid ${product?.product_customizations?.gem_shape_id} ${product?.product_customizations?.default_metal_id}`} onClick={() => setSelectedProduct(product)} /> : */}
                                    <img src={'https://placehold.co/400/png'} alt={product.variation.title} className={`img-fluid product-image-thubnail`} onClick={() => { setSelectedProduct(product); setActiveTab(2) }} />
                                    <p className="mt-2 mb-1 text-left">{product.variation.title}</p>
                                    <p className="text-left text-muted">From {product.variation.price} <i className="fa-solid fa-euro-sign"></i></p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <div className={`container`} hidden={activeTab != 2 && activeTab != 3} id="content2">
                {
                    (activeTab == 2 || activeTab ==  3) && selectedProduct != null ? 
                        <RingsStep2 
                            metalTypeId={selectedProduct.variation.metal_type_id} 
                            variantId={selectedProduct.variation.id} 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                            onNext={handleNextFromStep2} 
                        /> 
                        : null
                }
            </div>

            <div className={`container`} hidden={activeTab != 4} id="content4">
                {
                    activeTab == 4 && selectedProduct != null ? <RingsStep4 selectedProduct={selectedProduct} setActiveTab={setActiveTab} onNext={handleNextFromStep4} /> : null
                }
            </div>
            
            <div className={`container`} hidden={!ringSummary || activeTab != 'all'} id="content5">
                {
                    activeTab == "all" && selectedProduct != null ? <RingSummary step2={step2Items} step4={step4Items} activeTab={activeTab} setActiveTab={setActiveTab} onNext={handleNextFromStep4} /> : null
                }
            </div>

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="top-mid-text">
                            <h6>Made To Order For You</h6>
                            <p>
                                We're here for the journey with you. Our Bespoke Process allows us to work with
                                through the <br />
                                design process, so we can meticulously bring to life your dream ring.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row d-flex mt-3">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="why-us-card-1">
                            <div className="image-holder">
                                <img src="../img/why-us-pic-1.webp" alt="" />
                            </div>
                            <p>Memorable and Personal</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="why-us-card-1">
                            <div className="image-holder">
                                <img src="../img/why-us-pic-2.webp" alt="" />
                            </div>
                            <p>Bespoke, One of A Kind</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="why-us-card-1">
                            <div className="image-holder">
                                <img src="../img/why-us-pic-3.webp" alt="" />
                            </div>
                            <p>Expertly Crafted In Australia</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="container-fluid accordion-sxn">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="top-mid-text2">
                                <h6>About Us</h6>
                                <p>
                                    We're here for the journey with you. Our Bespoke Process allows us to work with through the <br /> design process, so we can meticulously bring to life your dream ring.
                                </p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="accordion accordion-flush">

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <label className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Book a consultation
                                        </label>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Wherever you are in the world, be guided on your journey by our expert consultants. We have two showrooms located in Sydney and Brisbane, as well as offering Virtual Consultations. Book Your Appointment.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <label className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Production Timeframes
                                        </label>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>
                                                We lovingly craft our pieces in Australia, all being bespoke and made to order,
                                                with the exception of our Ready To Propose Collection.
                                                <br />
                                                Our Standard Crafting Timeframe is 8-10 weeks.
                                                <br />
                                                Our Priority Crafting Timeframe is 4-6 weeks.
                                                <br />
                                                Please note, we have a Holiday Crafting Deadline of September 30th if you wish
                                                to receive your piece before Christmas.
                                                <br />
                                                Learn more about our production timeframes and our craft, here.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <label className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            Payment Options & Ring Shippings
                                        </label>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>
                                                At TMC, we provide a variety of payment plans including Afterpay, Humm, ZipPay,
                                                and PayIn4 through PayPal. All of these payment plans divide the total amount
                                                into smaller fees to be paid in increments over a certain period. They are
                                                completely interest free and can be selected and implemented at the payment
                                                checkout.
                                                <br />
                                                Upon your rings completion, you have the ability to book an appointment to
                                                collect your ring from our Sydney or Brisbane Showrooms, if you're located
                                                locally.
                                                <br />
                                                For all of our interstate and international clients, we offer complimentary
                                                express-insured shipping via DHL.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <label className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            Lifetime warranty and our commitment
                                        </label>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>We proudly offer a lifetime warranty on all of our pieces. Learn more here.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <label className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            International clients
                                        </label>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Wherever you are in the world, we can journey with you to bring your dream ring
                                                to life. We offer complimentary Online Consultations, thorough crafting updates
                                                and free insured-express shipping via DHL to ensure your ring arrives to you
                                                swiftly and safely.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div className="our-process">
                            <h6>Our Process</h6>
                            <p>
                                Lovingly designed and crafted in Australia. A craft thousands of years old, meets
                                modern sustainable practices and design. Each ring is created with intention,
                                unrivalled craftsmanship and most importantly passion. We walk the journey with you
                                to create your dream bespoke ring, from our Signature Range or a one-of-a-kind
                                custom commission.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="our-process">
                            <h6>Our Promise</h6>
                            <p>Crafted to order, for you in 8-12 weeks</p>
                            <p>Lifetime Warranty for all our pieces</p>
                            <p>Gemstone Certification and authenticity</p>
                            <p>Complimentary Ring Resizing for your piece</p>
                            <p>Responsibly Crafted In Australia from ethically sourced materials</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="video-background">
                <video autoPlay muted loop className="video-background">
                    <source src="../videos/vid1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay"></div>
                <div className="video-content">
                    <h2 style={{ 'color': 'white' }}>Build Your Dream Ring</h2>
                    <button className="discover-more-button">Discover</button>
                </div>
            </section>
        </>
    );
};

export default RingsProductListPage;
