import React, { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SubCategoryMiddleware } from "../../store/category/categoryMiddleware";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./Home.css";

const Home = () => {

    const dispatch = useDispatch();
    const subCategories = useSelector((state) => { return state.subCategory.subCategories });
    const [activeIndex, setActiveIndex] = useState(0);
    const [ owlSliderResponsiveOption, setOwlSliderResponsiveOption ] = useState({
        0:{
            items:1,
            nav: true
        },
        600:{
            items:3,
            nav: true
        },
        1000:{
            items:3,
            nav: true
        }
    })
    useEffect(() => {
        dispatch(SubCategoryMiddleware.GetSubCategory({ id: 1 }));
        dispatch(SubCategoryMiddleware.GetSubCategory({ id: 2 }));
    }, [dispatch]);

    return (
        <>
            <div className="banner-home">
                <img src="../img/homebanner.jpg" alt="Banner" className="homebanner1"/>
                <img src="../img/homebanner_mobile.png" alt="Banner" className="homebanner2" />
                <div className="banner-content">
                    <h1>Timeless elegance</h1>
                    <p>Culminating on the wrist or suspended from the neck, jewelry watches offer time a precious setting</p>
                    <Link to="/" className="click-link upt">Contemplate the passing of time</Link>
                </div>
            </div>
            <div className="container-col-wrap">
                <div className="left-column">
                    <div>
                        <div className="carousel-section">
                            <div id="carouselExampleIndicators" className="carousel carousel-dark slide">
                                <div className="carousel-indicators">
                                    {
                                        (subCategories[1]?.length) ? subCategories[1]?.map((item, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={index}
                                                className={index === activeIndex ? 'active' : ''}
                                                aria-current={index === activeIndex ? 'true' : undefined}
                                                aria-label={`Slide ${index + 1}`}
                                                onClick={() => setActiveIndex(index)}
                                            ></button>
                                        )) : null
                                    }
                                </div>
                                <div className="carousel-inner">
                                    {
                                        (subCategories[1]?.length) ? subCategories[1]?.map((item, index) => (
                                            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                                <img className="carousel-item-image" src={item.images.length > 0 ? item.images[0].image:''} alt={item.title} />
                                                <h2><Link style={{ textDecoration: "none", color: "inherit" }} to="/rings">{item.title}</Link></h2>
                                                <p className="slider-body">{item.desc}</p>
                                                <p className="slider-price">{item.price} €</p>
                                                <p className="product-variations">+{item.variation_count} variations de pierres</p>
                                            </div>
                                        ))
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="btslider">
                            <Link to="/rings" className="click-link upt">more creations</Link>
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <img src="../img/s2img.jpg" alt="Description" />
                </div>
            </div>
            <div className="container-fluid our-creation-section-home">
                <div className="row">
                    <div className="ourcreations-title">
                        <h1> Our creations </h1>
                        <p>Discover our wide selection of parts</p>
                    </div>
                </div>
                <div className="row">
                    <OwlCarousel className='owl-theme' loop nav={true} responsiveClass={true} dots={false} responsive={owlSliderResponsiveOption}>
                        {
                            subCategories[2]?.map((item, index) => (
                                <div key={index} className="item">
                                    <img src="../img/p1.png" alt={item.title} width={'60%'} height={'auto'}/>
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                    </OwlCarousel>
                </div>

            </div>
            <div className="video-container">
                <video autoPlay muted loop>
                    <source src="../videos/_4000x2000.mp4" type="video/mp4" />
                </video>
                <div className="overlay">
                    <h1 className="title">Joyful bounces with the<br /> Perlée collection</h1>
                    <Link to="/" className="click-link upt">Up to you ! </Link>
                </div>
            </div>
            <div className="bimg video-container">
                <img src="../img/bluedesktop-FR.jpg" alt="bing" />
                <div className="overlay">
                    <Link to="/" className="click-link upt blacktxt">meet our artisan jewelers</Link>
                </div>
            </div>

            <div className="video-container">
                <img src="../img/van-cleef-arpels-vendome-desktop.jpg" alt="video" />
                <div className="overlay">
                    <h1 className="title  blacktxt">Paris, Tokyo, New York, ...</h1>
                    <Link to="/" className="click-link upt blacktxt">After you </Link>
                </div>
            </div>

            <div className="wrapper engifts-sec">
                <div className="bordr">
                    <h1>Enchanting gifts</h1>
                    <img src="../img/desktop-3480-1740.jpg" alt="wrapper" />

                </div>
                <div className="downbn">
                    <p>Thanks to its know-how, creativity and excellence, Van Cleef & Arpels accompanies you to celebrate the
                        moments of life.</p>
                    <Link to="/" className="click-link">
                        Enter a timeless universe
                    </Link>
                </div>
            </div>




            <div className="news-sec">
                <div className="news-title">NEWS</div>
                <div className="wrapper-2col container">
                    <div className="sec1">
                        <Link to="/">
                            <div className="column">
                                <img src="../img/newpost1-img.jpg" alt="col 1" className="image" />
                                <p className="date">October 29, 2024</p>
                                <h1 className="title">Seasons 5 and 6 of the School of Jewelry Arts podcast, "The Voice of Jewels"
                                </h1>
                            </div>
                        </Link>
                    </div>
                    <div className="sec2">
                        <Link to="/">
                            <div className="column">
                                <img src="../img/newpost1-img.jpg" alt="col 1" className="image" />
                                <p className="date">October 29, 2024</p>
                                <h1 className="title">Seasons 5 and 6 of the School of Jewelry Arts podcast, "The Voice of Jewels"
                                </h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="multifield-wrapper">
                <ul className="component">
                    <Link to="/">
                        <li>
                            <h2>Free shipping and returns</h2>
                            <p>Free for all orders</p>
                            <span className="caption">more information</span>
                        </li>
                    </Link>
                    <Link to="/">
                        <li>
                            <h2>Free shipping and returns</h2>
                            <p>Free for all orders</p>
                            <span className="caption">more information</span>
                        </li>
                    </Link>
                    <Link to="/">
                        <li>
                            <h2>Free shipping and returns</h2>
                            <p>Free for all orders</p>
                            <span className="caption">more information</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    );
}

export default Home;