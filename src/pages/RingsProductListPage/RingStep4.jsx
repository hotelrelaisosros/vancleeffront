import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RingPage.css";
import "./vancleef.css";

const RingsStep4 = ({ selectedProduct, setActiveTab, onNext }) => {

    const dispatch = useDispatch();
    const [selectedGemstone, setSelectedGemstone] = useState("M");
    const [openAccordion, setOpenAccordion] = useState(null);
    const [ gemstoneFaceting, setGemstoneFaceting ] = useState([
        { id: "B", value: "Brilliant" },
        { id: "CI", value: "Crushed Ice" },
        { id: "OMI", value: "Old Mint Ice" },
        { id: "RC", value: "Rose Cut" },
    ])
    const [items, setItems] = useState({ 
        gem_stone_color_id: "",
        faceting_id: '',
        gem_stone_id: '',
    });
    
    const { gemStoneColors, gemStones } = useSelector((state) => state.customization);
    const data = useMemo( () => ({ colors: gemStoneColors, gemstones: gemStones }), [ gemStoneColors, gemStones ] );

    const [moissaniteStones, setMoissaniteGemstones] = useState(data?.gemstones.filter(x => x.type == "M"));
    const [labGrownDiamondStones, setlabGrownDiamondstones] = useState(data?.gemstones.filter(x => x.type == "LGD"));

    const toggleAccordion = (index) => {
        setOpenAccordion((prev) => (prev === index ? null : index));
    };

    const handleSelectGemstone = (item) => {
        setItems((prevItems) => ({
            ...prevItems,
            gem_stone_id: item.id,
        }))
    }

    const handleUnselectGemstone = () => {
        setItems((prevItems) => ({
            ...prevItems,
            gem_stone_id: "",
        }))
    }

    const handleNext = () => {

        switch (selectedGemstone) {
            case "M":
                if (!(items.gem_stone_color_id && items.faceting_id && items.gem_stone_id)) {
                    return false;
                }
                break;
            case "LGD":
                if (!items.gem_stone_id) {
                    return false;
                }
                break;
        }

        onNext(items);
        setActiveTab('all')
    };

    return (
        <>
            <div className="gemstone-selection ring-product-step4">
                <h2>Select Your Gemstone</h2>

                <div className="gemstone-type">
                    <button className={(selectedGemstone == 'M') ? "active" : ""} onClick={() => {setSelectedGemstone('M'); setOpenAccordion(null)}}>
                        <p className="btn-txt-main">Moissanite</p>
                        Learn More
                    </button>
                    <button className={(selectedGemstone == 'LGD') ? "active" : ""} onClick={() => {setSelectedGemstone('LGD'); setOpenAccordion(null)}}>
                        <p className="btn-txt-main">Lab Grown Diamond</p>
                        Learn More
                    </button>
                </div>

                {/* <!-- Oval Moissanite Table --> */}
                <div className="table-container">
                    {(selectedGemstone == "M") ?
                    <table id="moissaniteTable" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Carat</th>
                                <th>Colour</th>
                                <th>Clarity</th>
                                <th>Faceting</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(moissaniteStones?.length) ? moissaniteStones.map((item, index) => (
                                <React.Fragment key={index} >
                                    <tr className="accordion-tab" onClick={() => toggleAccordion(index)}>
                                        <td>{item.carat}cr</td>
                                        <td>
                                            <span className="dropdown-cell">
                                                <i className="fas fa-chevron-down" />
                                            </span>
                                        </td>
                                        <td>{item.clarity}</td>
                                        <td>
                                            <span className="dropdown-cell">
                                                <i className="fas fa-chevron-down" />
                                            </span>
                                        </td>
                                        <td>{item.price}</td>
                                    </tr>
                                    {openAccordion === index && (
                                        <tr className="accordion-content">
                                            <td colSpan="5">
                                                <div className="accordion-details">
                                                    <div className="accord-deets row">
                                                        <div className="details-column col-12 col-md-4">
                                                            <p>
                                                                <strong>Shape:</strong> {item.shape}
                                                            </p>
                                                            <p>
                                                                <strong>Carat Equivalent:</strong> {item.carat}ct
                                                            </p>
                                                        </div>
                                                        <div className="details-column col-12 col-md-4">
                                                            <p>
                                                                <strong>Dimension:</strong> {item.dimension}
                                                            </p>
                                                            <p>
                                                                <strong>Cut:</strong> {item.faceting}
                                                            </p>
                                                        </div>
                                                        <div className="details-column col-12 col-md-4">
                                                            <p>
                                                                <strong>Colour:</strong> {item.color}
                                                            </p>
                                                            <p>
                                                                <strong>Price:</strong> {item.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="button-row pt-2 pb-2 row">
                                                        <div className="col-12 col-md-4 mt-2">
                                                            <select
                                                                name="faceting_id"
                                                                value={items.faceting_id || ""}
                                                                onChange={(e) =>
                                                                    setItems((prevItems) => ({
                                                                        ...prevItems,
                                                                        faceting_id: e.target.value,
                                                                    }))
                                                                }
                                                            >
                                                                <option value={""}>Select Gemstone Faceting</option>
                                                                {
                                                                    gemstoneFaceting.map((item, i) => (
                                                                        <option value={item.id} key={i}>{item.value}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12 col-md-4 mt-2">
                                                            <select 
                                                                name="gem_stone_color_id"
                                                                value={items.gem_stone_color_id || ""}
                                                                onChange={(e) =>
                                                                    setItems((prevItems) => ({
                                                                        ...prevItems,
                                                                        gem_stone_color_id: e.target.value,
                                                                    }))
                                                                }
                                                            >
                                                                <option value={''}>Select Moissanite Colour</option>
                                                                {
                                                                    (data?.colors?.length) ? data?.colors.map((color, i) => (
                                                                        <option key={i} value={color.id}>{color.name}</option>
                                                                    )) : null
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12 col-md-4 mt-2">
                                                            {
                                                                (item.id === items.gem_stone_id) ? 
                                                                    <button onClick={handleUnselectGemstone}>Unselect Gemstone</button>
                                                                :
                                                                    <button 
                                                                        onClick={() => handleSelectGemstone(item)}
                                                                        disabled={
                                                                            !items.gem_stone_color_id ||
                                                                            !items.faceting_id
                                                                        }
                                                                        style={{ "cursor": (!items.gem_stone_color_id || !items.faceting_id) ? 'not-allowed': ''}}
                                                                    >Select Gemstone</button>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="more-info mt-3 mb-3">
                                                        <span>More Gemstone Information</span>
                                                        <i className="fas fa-chevron-down"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                                )) : null
                            }
                        </tbody>
                    </table> : null
                    }

                    {(selectedGemstone == "LGD") ?
                        <table id="labGrownDiamondTable" className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Carat</th>
                                    <th>Colour</th>
                                    <th>Clarity</th>
                                    <th>Faceting</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(labGrownDiamondStones?.length) ? labGrownDiamondStones.map((item, index) => (
                                    <React.Fragment key={index} >
                                        <tr  className="accordion-tab" onClick={() => toggleAccordion(index)}>
                                            <td>{item.carat}ct</td>
                                            <td>{item.color}</td>
                                            <td>{item.clarity}</td>
                                            <td>{item.faceting}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                        {openAccordion === index && (
                                        <tr className="accordion-content">
                                            <td colSpan="5">
                                                <div className="accordion-details">
                                                    <div className="row p-4">
                                                        <div className="col-12 col-lg-3 text-center img-accordion">
                                                            <img src={'https://placehold.co/180x200'} alt=""  />
                                                        </div>
                                                        <div className="col-12 col-lg-9">
                                                            <ul className="pl-0" style={{'listStyle': 'none'}}>
                                                                <li><strong>Shape:</strong> {item.shape}</li>
                                                                <li><strong>Carat Equivalent:</strong> {item.carat}ct</li>
                                                                <li><strong>Dimension:</strong> {item.dimension}</li>
                                                                <li><strong>Cut:</strong> {item.faceting}</li>
                                                                <li><strong>Colour:</strong> {item.color}</li>
                                                                <li><strong>Price:</strong> {item.price}</li>
                                                            </ul>
                                                            <div className="row">
                                                                <div className="col-12 col-md-6 more-info">
                                                                    <span>More Gemstone Information</span>
                                                                    <i className="fas fa-chevron-down"></i>
                                                                </div>
                                                                <div className="buttons col-12 col-md-6 text-end">
                                                                    {
                                                                        (item.id === items.gem_stone_id) ? 
                                                                            <button onClick={handleUnselectGemstone}>Unselect Gemstone</button>
                                                                        :
                                                                            <button onClick={() => handleSelectGemstone(item)} >Select Gemstone</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        )}
                                    </React.Fragment>
                                )) : null
                            }
                        </tbody>
                    </table> : null
                }
                </div>

                <div className="step4-buttons-bottom">
                    <button>Send a Hint</button>
                    <button className="button1" onClick={() => setActiveTab(3)}> BACK </button>
                    <button 
                        onClick={handleNext}
                        disabled={
                            (selectedGemstone === "M" && !items.faceting_id && !items.gem_stone_color_id || !items.gem_stone_id) ||
                            (selectedGemstone === "LGD" && !items.gem_stone_id)
                        }
                        style={{ 
                            "cursor": (selectedGemstone === "M" && items.faceting_id && items.gem_stone_color_id && items.gem_stone_id) || (selectedGemstone == "LGD" && items.gem_stone_id) ? '': 'not-allowed'}
                        }
                    >Ring Summary</button>
                </div>
            </div>
        </>
    );
}

export default RingsStep4;