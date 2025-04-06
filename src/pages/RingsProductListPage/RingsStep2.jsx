import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsMiddleware } from "../../store/products/productsMiddleware";
import BirthstoneDialog from './Dialogs/BirthstoneDialog'
import "./RingPage.css";
import "./vancleef.css";

const RingsStep2 = ({metalTypeId, variantId, activeTab, setActiveTab, onNext}) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [productMeta, setProductMeta] = useState(null);
    const [primaryImage, setPrimaryImage] = useState(null);
    const [productAvailableMetalTypes, setProductAvailableMetalTypes] = useState([]);
    const [selectedBespokeCustomizations, setSelectedBespokeCustomizations] = useState({});
    const [showBirthStoneModal, setShowBirthStoneModal] = useState(false);
    const [selectedStone, setSelectedStone] = useState(null);

    const [items, setItems] = useState({ 
        product_id: "",
        product_image_id: "",
        metal_type_karat: "",
        metal_type_id: metalTypeId,
        band_width_id: '',
        setting_height_id: '',
        ring_size_id: '',
        prong_style_id: '',
        bespoke_customization_types_id: [],
        bespoke_types_id: [],
        birth_stone_id: [],
        engraved_text: "",
        variant_id: variantId
    });

    const handleUpdateVarient = (item) => {        
        const data = getVarientIdFromMetalType(item.id);
        getEnumOfProduct({ metal_type_id: data.metal_type_id, variant_id: data.id })
        setItems((prevItems) => ({ ...prevItems, metal_type_id: data.metal_type_id, variant_id: data.id  }));
    }

    const getVarientIdFromMetalType = (metalTypeId) => {
        return productMeta.other_vairants.find((product, i) => parseInt(product.metal_type_id) === parseInt(metalTypeId))
    }

    useEffect(() => {
        getEnumOfProduct({
            metal_type_id: metalTypeId, 
            variant_id: variantId
        })
    }, [metalTypeId, variantId]);


    const getEnumOfProduct = async (reqData) => {
        const ennum = await dispatch(ProductsMiddleware.GetProductEnumerations(reqData));
        setProductMeta(ennum)
        setProduct(ennum.varation[0]);
        setPrimaryImage(ennum?.image[0]?.image)
        setItems((prevItems) => ({ ...prevItems, metal_type_id: ennum.varation[0]?.metal_type_id, product_id: ennum.varation[0]?.product_id, product_image_id: ennum.image[0]?.id }));       
    }
    
    // Get data from Redux store
    const { 
        gemShapes, gemStoneColors, birthStones, gemStones, prongStyles, ringSizes, 
        bandWidths, settingHeights, bespokeCustomizations, bespokeWithTypes, 
        accentStoneTypes, metalTypes, } = useSelector((state) => state.customization);

    // Update items state to use Redux data
    const data = useMemo(() => ({ 
        shapes: gemShapes, colors: gemStoneColors, widths: bandWidths, settingsHeight: settingHeights, 
        ringSize: ringSizes, prongStyle: prongStyles, birthstones: birthStones, gemstones: gemStones, 
        accentStoneTypes: accentStoneTypes, bespokeCustomizations: bespokeCustomizations, bespokeWithTypes: bespokeWithTypes, 
        metalTypes: metalTypes, }),
    [ gemShapes, gemStoneColors, bandWidths, settingHeights, ringSizes, 
        prongStyles, birthStones, gemStones, accentStoneTypes, bespokeCustomizations, 
        bespokeWithTypes, metalTypes, 
    ]);

    useEffect(() => {
        const metal_type = new Set(); // Use a Set for uniqueness
    
        if (productMeta?.other_vairants?.length) {
            productMeta.other_vairants.forEach((variant) => {
                metal_type.add(parseInt(variant.metal_type_id));
            });
        }
    
        metal_type.add(parseInt(product?.metal_type_id));
    
        const uniqueMetalTypes = Array.from(metal_type); // Convert Set back to Array if needed
    
        setProductAvailableMetalTypes(uniqueMetalTypes); // Output the unique values
        
    }, [product]);

    const handleRemoveSelectedBespokeCustomizations = (customizationId) => {
        setSelectedBespokeCustomizations((prevItems) => {
            const updatedItems = { ...prevItems };
            delete updatedItems[customizationId]; // Remove the key
            return updatedItems;
        })
    };

    const handleNext = () => {
        onNext(items);
        setActiveTab(3);
    };

    const handleNextStep4 = () => {
        onNext(items);
        setActiveTab(4);
    };

    const handleSelectedBespokeCustomizations = (bespokeItem, bespokeCustomisationsItem) => {
        setSelectedBespokeCustomizations((prevItems) => ({
            ...prevItems,
            [bespokeItem.id]: bespokeCustomisationsItem.id
        }))
    }

    const handleAddBirthStone = () => {
        setItems((prevItems) => {
            const birthStone = prevItems.birth_stone_id || [];
            if (birthStone.length < 4) {
                return {
                    ...prevItems,
                    birth_stone_id: [...birthStone, selectedStone.id],
                };
            }
            return prevItems;
        });
        handleBirthStoneModalClose();
    };    

    const handleRemoveStone = (index) => {
        setItems((prevItems) => ({
            ...prevItems,
            birth_stone_id: prevItems.birth_stone_id.filter((_, i) => i !== index)
        }));
    };
    
    const handleBirthStoneModalClose = () => {
        setSelectedStone(null); 
        setShowBirthStoneModal(false)
    };

    useEffect(() => {
        setItems((prevItems) => ({
            ...prevItems,
            bespoke_types_id: Object.keys(selectedBespokeCustomizations).map(key => parseInt(key, 10)),
            bespoke_customization_types_id: Object.values(selectedBespokeCustomizations).map(key => parseInt(key, 10))
        }))
    }, [selectedBespokeCustomizations])

    return (
        <>
            <div className="prdctz ring-product-step2">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="row">
                            <div className="col-lg-3 clo-0 ring-product-step-left">
                                {
                                    productMeta?.image?.map((item, i) => 
                                        item.image_collection.map((singleimage, j) => (
                                            <div className="pb-3 image-list" key={`${i}-${j}`}>
                                                <img src={singleimage} alt={product?.title} onClick={() => setPrimaryImage(singleimage)} width="100%" />
                                            </div>
                                        ))
                                    )
                                }

                            </div>
                            <div className="col-9 col-12 col-lg-9">
                                <img id="mainProductImage" src={primaryImage} alt={product?.variation?.title} height={'550px'} width={'100%'}/>
                            </div>
                        </div>
                    </div>
                    
                    { (activeTab === 2) ?
                        <div className="col-12 col-lg-6 ">
                            <div className="product-options">
                                <div className="product-title">
                                    <h3>{product?.title}</h3>
                                </div>
                                <hr />
                                <div className="form-group mb-3">
                                    <label className="enum-product-title"> Precious Metal Type</label>
                                    <div id="category-filter-buttons">
                                        <div className="row">
                                            {
                                                data?.metalTypes?.map((item, index) => {
                                                    const isAvailable = productAvailableMetalTypes?.some((id) => id === item.id);
                                                    if (!isAvailable) return null; // Skip rendering if metal type is not available.

                                                    return (
                                                        <div key={index} className="col-3">
                                                            <label className={ "radio-container d-flex align-items-center text-center " + (parseInt(items?.metal_type_id) === item.id ? "selected" : "") } style={{ paddingLeft: "0px" }} >
                                                                <input 
                                                                    className="metal_type_checkbox" 
                                                                    type="radio" 
                                                                    name="metal_type_id" 
                                                                    value={item?.title} 
                                                                    checked={parseInt(items?.metal_type_id) === item.id} onChange={() => handleUpdateVarient(item)} 
                                                                />
                                                                <img src={item?.image} className="rounded-circle me-2" height={"25px"} width={"25px"} title={item?.title} />
                                                                {" "}{item?.title}
                                                            </label>
                                                        </div>
                                                    );
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Metal Karat</label>
                                    <div className="select-padding">
                                        <select
                                            className="form-select"
                                            id="metalKarat"
                                            name="metal_type_karat"
                                            value={items.metal_type_karat || ""}
                                            onChange={(e) =>
                                                setItems((prevItems) => ({
                                                    ...prevItems,
                                                    metal_type_karat: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">Select Metal Type</option>
                                            <option value="14 K">14K</option>
                                            <option value="18 K">18K</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="enum-product-title"> Band Width </label>
                                    <div className="selectables">
                                        {productMeta?.enumerations?.band_width?.map((item, index) => {
                                            return (
                                                <label key={index} className={'selectable-div radio-container ' + (items.band_width_id === item?.id ? 'selected' : '')}>
                                                    <input
                                                        type="radio"
                                                        id={`width-${index}`}
                                                        name="band_width_id"
                                                        value={item?.id}
                                                        checked={items.band_width_id === item?.id}
                                                        onChange={(e) => {
                                                            setItems((prevItems) => ({
                                                                ...prevItems,
                                                                band_width_id: item?.id
                                                            }));
                                                        }}
                                                    />
                                                    {item?.name}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Setting Height</label>
                                    <div className="selectables">
                                        {productMeta?.enumerations?.setting_heights?.map((item, index) => {
                                            return (
                                                <label key={index} className={ "selectable-div radio-container " + (items.setting_height_id === item?.id ? "selected" : "") } >
                                                    <input
                                                        type="radio"
                                                        id={`height-${index}`}
                                                        name="setting_height_id"
                                                        value={item?.id}
                                                        checked={items.setting_height_id === item?.id}
                                                        onChange={() =>
                                                            setItems((prevItems) => ({
                                                                ...prevItems,
                                                                setting_height_id: item?.id,
                                                            }))
                                                        }
                                                    />
                                                    {item?.name}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Ring Size</label>
                                    <div className="select-padding">
                                        <select
                                            className="form-select"
                                            id="ring_size_id"
                                            name="ring_size_id"
                                            value={items.ring_size_id || ""}
                                            onChange={(e) =>
                                                setItems((prevItems) => ({
                                                    ...prevItems,
                                                    ring_size_id: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">Select Ring Size</option>
                                            {productMeta?.enumerations?.ring_sizes?.map((item, index) => (
                                                <option key={index} value={item?.id}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Prong Style</label>
                                    <div className="selectables form-group mb-3">
                                        {productMeta?.enumerations?.prong_styles?.map((item, index) => {
                                            return (
                                                <label key={index} className={ "selectable-div radio-container " + (items.prong_style_id === item?.id ? "selected" : "") } >
                                                    <input
                                                        type="radio"
                                                        id={`prong-${index}`}
                                                        name="prong_style_id"
                                                        value={item?.id}
                                                        checked={items.prong_style_id === item?.id}
                                                        onChange={() =>
                                                            setItems((prevItems) => ({
                                                                ...prevItems,
                                                                prong_style_id: item?.id,
                                                            }))
                                                        }
                                                    />
                                                    {item?.name}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr />
                                <div className="full-width-btns form-group mb-3">
                                    <button className="button1" onClick={() => setActiveTab(1)}> BACK </button>
                                    <button
                                        className="button2"
                                        onClick={handleNext}
                                        disabled={
                                            !items.metal_type_karat ||
                                            !items.metal_type_id ||
                                            !items.band_width_id ||
                                            !items.setting_height_id ||
                                            !items.ring_size_id ||
                                            !items.prong_style_id
                                        }
                                    > NEXT STEP </button>
                                </div>
                                {/* <hr />
                                <div className="extra-links form-group mb-3">
                                    <a href="#">send a link</a>
                                    <a href="#">Book Appointment</a>
                                    <a href="#"> Talk to an expert </a>
                                </div> */}
                            </div>
                        </div> 
                        : null
                    }

                    {
                        (activeTab === 3) ? 
                        <div className="col-12 col-lg-6 ring-product-step3">
                            <div className="product-options">
                                <div className="product-title">
                                    <h3>{product?.title}</h3>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Bespoke Customisations</label>
                                    {productMeta?.enumerations?.bespoke_customizations?.map((item, index) => {
                                        const customization = data?.bespokeWithTypes?.find((customization) => customization?.id === item.id);
                                        return (
                                            <div key={index} className="custom-option">
                                                {/* <img src={customization?.image} alt={customization?.name} height={'100px'} width={'100px'}/> */}
                                                <img src={'https://placehold.co/100/png'} alt={customization?.name} height={'100px'} width={'100px'} />
                                                <div style={{ 'width': '100%' }}>
                                                    <div className="custom-contents">
                                                        <label className="enum-product-title">
                                                            <strong>{customization?.name}</strong>
                                                            {
                                                                (selectedBespokeCustomizations[customization.id]) ? 
                                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleRemoveSelectedBespokeCustomizations(customization.id) }} > Remove </a> : null
                                                            }
                                                        </label>
                                                        <div className="enum-product-title">Select stone</div>
                                                        <div className="select-bespoke-stone">
                                                            {customization?.bsp_type?.map((i, index) => {
                                                                return (
                                                                    <div key={index} className="select-stone-radio">
                                                                        <label>
                                                                            <input
                                                                                type="radio"
                                                                                name={`bespoke_customization_types_id_${selectedBespokeCustomizations[customization.id]}`}
                                                                                value={i?.id}
                                                                                checked={i?.id === selectedBespokeCustomizations[customization.id]}
                                                                                onChange={() => handleSelectedBespokeCustomizations(customization, i)}
                                                                            /> {i?.name} | USD {i?.price}
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="form-group mb-3 hidden-birthstone">
                                    <label className="enum-product-title">Hidden Birthstones</label>
                                    <p className="mb-3">Add sentimental meaning to your dream ring.</p>
                                    <div className="row" >
                                        {data?.birthstones?.map((birthstone, index) => {
                                            
                                            const isAvailable = productMeta?.enumerations?.birth_stones?.some((item) => item.id === birthstone.id);
                                            if (!isAvailable) return null;

                                            return (
                                                <div key={index} className="birthstone-radio-container col-2 text-center hidden-birthstone-list" onClick={() => { setSelectedStone(birthstone); setShowBirthStoneModal(true); }}>
                                                    <label key={index} className="align-items-center">
                                                        <img src={birthstone?.image} alt={birthstone?.name} title={birthstone?.name} height={'50px'} width={'50px'} /> <br />
                                                        <span className={'birthstone-name ' + (items.birth_stone_id == birthstone.id ? "selected" : "")}>{birthstone?.name}</span>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="form-group mb-3 hidden-birthstone">
                                    <label className="enum-product-title">Birthstone Selection</label>
                                    <p className="mb-3">Select up to four Hidden Gemstones and their placement within your band. Click and drag to arrange them in your desired order.</p>
                                    <div className="row" >
                                        {[0, 0, 0, 0].map((id, index) => {
                                            const stone = productMeta?.enumerations?.birth_stones?.find((item) => item.id === items?.birth_stone_id[index]);
                                            return (
                                                <div key={index} className="birthstone-radio-container col-2 text-center hidden-birthstone-list">
                                                    {stone ? (
                                                        <label className="align-items-center position-relative">
                                                            <img src={window?.env?.STORAGE_URL + stone?.image} alt={stone?.name} title={stone?.name} height="50px" width="50px" />
                                                            <button type="button" className="close-btn-birthstone" onClick={() => handleRemoveStone(index)} aria-label="Remove stone" > × </button>
                                                        </label>
                                                    ) : (
                                                        <label className="align-items-center">
                                                            <div style={{ height: '50px', width: '50px', background: 'lightgray' }} />
                                                        </label>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="enum-product-title">Complimentary Engraving</label>
                                    <p className="mb-3">
                                        Personalise your dream ring with engraving. If you wish to add this to your
                                        ring, it will be laser engraved on the inside of your band.
                                    </p>
                                    <div className="customize">
                                        <input
                                            type="text"
                                            className="form-control engraved_text"
                                            name="engraved_text"
                                            placeholder="A name, date, initials, or a word"
                                            maxLength="30"
                                            value={items.engraved_text || ""} // Bind state value
                                            onChange={(e) =>
                                                setItems((prevItems) => ({ ...prevItems, engraved_text: e.target.value }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="full-width-btns form-group mb-3">
                                        <button type="button" className="button1" onClick={() => setActiveTab(2)}> Back </button>
                                        <button
                                            className="button2"
                                            onClick={handleNextStep4}
                                            // disabled={
                                            //     !items.birth_stone_id ||
                                            //     !items.engraved_text
                                            // }
                                        > NEXT STEP </button>
                                    </div>
                                </div>
                                <div className="extra-links">
                                    <a href="#">Book Appointment</a>
                                    <a href="#">Talk to an expert</a>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    
                </div>
            </div>

            <BirthstoneDialog stone={selectedStone} showBirthStoneModal={showBirthStoneModal} onClose={handleBirthStoneModalClose} onAdd={handleAddBirthStone}/>
        </>
    );
}

export default RingsStep2;