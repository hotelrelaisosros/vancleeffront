
import React, { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./DiscoverTheStone.css";

const DiscoverTheStone = ({ show, setShow }) => {
    const [ owlSliderResponsiveOption, setOwlSliderResponsiveOption ] = useState({
        0:{
            items:1,
            nav: true
        },
        600:{
            items:2,
            nav: true
        },
        1000:{
            items:2,
            nav: true
        }
    })

    const imageCollectionOne = [
        {
            src: '../../img/Diamond, shuttle size.jpg',
            title: 'Diamond, shuttle size'
        },
        {
            src: '../../img/Diamond, cushion size.jpg',
            title: 'Diamond, cushion size'
        },
        {
            src: '../../img/Diamond, pear waist.jpg',
            title: 'Diamond, pear waist'
        },
        {
            src: '../../img/Diamond, round waist.jpg',
            title: 'Diamond, round waist'
        },
        {
            src: '../../img/Diamond, emerald waist.jpg',
            title: 'Diamond, emerald waist'
        },
        {
            src: '../../img/Diamond, size asscher.jpg',
            title: 'Diamond, size asscher'
        },
    ]
    
    return (
        <div className="discover-stone-popup" style={{ display: show === 'discover_stone' ? 'block': 'none' }}>
            <div className="discover-stone-popup-title mb-5">
                <h3>DISCOVER THE STONES OF THE HOUSE</h3> 
                <button className="close-btn-discover-stone"  onClick={() => setShow("")}>X</button>
            </div>
            <hr />
            <div className="discover-stone-popup-description">
                <p className="mb-0 text-center">Diamond</p>
            </div>
            <hr />
            <div className="discover-stone-popup-description">
                <p className="mb-0 text-start">With its remarkable brilliance, the diamond takes its name from the Greek adamas, which means "untamable" and evokes the extraordinary properties of this mineral. Van Cleef & Arpels combines its expertise and know-how in High Jewelry with this excellent stone to bring to life dazzling jewelry creations, such as its solitaires, or the Snowflake and À Cheval collections. The Maison's watch creations are also adorned with diamonds, as in the Cadenas® collection.</p>
                
                <OwlCarousel className='owl-theme' loop nav={true} responsiveClass={true} dots={false} responsive={owlSliderResponsiveOption}>
                    {
                        imageCollectionOne.map((item, index) => (
                            <div key={index} className="item" style={{ margin: '15px' }}>
                                <img src={item.src} alt={item.title} width={'100%'} height={'auto'}/>
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </OwlCarousel>
                
                <p className="mb-0 text-start">A pure carbon crystal, it has fascinated different eras and civilizations for its strength (diamond is the hardest of precious stones), as well as for its reflection of light. In Tibet, it was believed to lead to the path of truth. For Hindus, diamonds captured the fire of the Sun. The ancient Greeks saw them as the tears of the gods, and the Romans saw them as fragments of stars.</p>
                <p className="mb-0 text-start">Seen alternately as a symbol of heroism and a talisman bringing peace and good health, this precious stone evokes protection, purity, and immortality. Given to a loved one, it testifies to the strength of one's feelings.</p>
            </div>
            
        </div>
    )
}

export default DiscoverTheStone