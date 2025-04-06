import React, { useState } from 'react';

const ProductSummary = ({ cartItems, data }) => {

    const [gemstoneFaceting, setGemstoneFaceting] = useState([
        { id: "B", value: "Brilliant" },
        { id: "CI", value: "Crushed Ice" },
        { id: "OMI", value: "Old Mint Ice" },
        { id: "RC", value: "Rose Cut" },
    ])

    const getBandWidth = (item) => {
		let width = data.widths.find((width) => (width.id == item.attributes.band_width_id))?.name;
		if (width) {
			width = "/ " + width
		}
		return width;
	}

	const getSettingHight = (item) => {
		let height = data.settingsHeight.find((shight) => (shight.id == item.attributes.setting_height_id))?.name
		if (height) {
			height = "/ " + height
		}
		return height;
	}

	const getRingSize = (item) => {
		return data.ringSize.find((size) => (size.id == item.attributes.ring_size_id))?.name
	}

	const getProngSize = (item) => {
		return data.prongStyle.find((style) => (style.id == item.attributes.prong_style_id))?.name
	}

	const getBespokeCustomizationTypeName = (item) => {
		return data.bespokeWithTypes.find((bespokeWithType) => {
			const parentID = bespokeWithType?.bsp_type.find((type) => {
				return type.id == item.id
			})
			if (parentID) {
				return bespokeWithType
			}

		})?.name
	}

	const getFactingName = (faceting_id) => {
		return gemstoneFaceting.find((gemstone) => (gemstone.id === faceting_id))?.value
	}

	const getTotalPriceOfCart = () => {
		return cartItems.reduce((total, item) => parseInt(total) + parseInt(item.price), 0);
	}


    return (
        <div className="border rounded p-4 bg-light">
            <h6>Your Dream Ring</h6>
            <ul className="list-unstyled mb-3">
                {
                    (cartItems?.length) ? (cartItems).map((item, index) => (
                        <React.Fragment key={index} >
                            {
                                (isNaN(item.cart_id) && item.attributes && item.attributes.length) ?
                                    <li className="border-bottom pb-3 mb-3">
                                        <strong>{item.variation.title}</strong>
                                        {item.attributes.metal_type_karat} {item.attributes.metal_type}  {getBandWidth(item)} {getSettingHight(item)}
                                        <span style={{ float: "right" }}>1x {item?.variation?.price} <i className="fa-solid fa-euro-sign"></i></span>
                                        <p className="p-0 m-0"><b>Ring Size</b>: {getRingSize(item)}</p>
                                        <p className="p-0 m-0"><b>Prong Style</b>: {getProngSize(item)}</p>
                                        <p className="p-0 m-0"><b>Crafting Timeframe</b>: Standard Crafting: 12-14 weeks</p>
                                        <div className="p-0 m-0"><b>Bespoke Customisations</b>
                                            {item?.bespoke_types?.length > 0 && (
                                                <ul>
                                                    {item.bespoke_types.map((bespoke_type, index) => (
                                                        <li key={index}>
                                                            {getBespokeCustomizationTypeName(bespoke_type)} - {bespoke_type?.name} <span style={{ float: "right" }}>{bespoke_type.price} <i className="fa-solid fa-euro-sign"></i></span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="p-0 m-0">
                                            {data?.gemstones?.length > 0 &&
                                                data.gemstones.map((gemstone, index) => {
                                                    if (gemstone.id === item?.gem_stone?.id && item?.gem_stone?.type === "M") {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <b>
                                                                    {item.gem_stone.type === "M" ? "Moissanite" : "Lab Grown Diamond"}{" "}
                                                                    {gemstone.shape}
                                                                </b>
                                                                <ul>
                                                                    <li>Faceting Type: {getFactingName(item?.attributes?.faceting_id)}</li>
                                                                    {item.gem_stone.type === "M" && (
                                                                        <li>Moissanite Colour: {item?.gem_stone?.color}</li>
                                                                    )}
                                                                    {item.gem_stone.type === "LGD" && (
                                                                        <li>Lab Grown Diamond Colour: {item?.gem_stone?.color}</li>
                                                                    )}
                                                                    <li>Price <span style={{ float: "right" }}>{item?.gem_stone?.price} <i className="fa-solid fa-euro-sign"></i></span></li>
                                                                </ul>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </div>
                                        <div className="p-0 m-0"><b>Birthstones</b>
                                            {
                                                item?.birth_stones?.length > 0 && (
                                                    <ul>
                                                        {item.birth_stones.map((birth_stone, index) => (
                                                            <li key={index}>
                                                                1x {birth_stone.name} <span style={{ float: "right" }}>{birth_stone.price} <i className="fa-solid fa-euro-sign"></i></span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )
                                            }
                                        </div>
                                        <div className="p-0 mt-2"><b>Subtotal </b>
                                            <span style={{ float: "right" }}>{item.price} <i className="fa-solid fa-euro-sign"></i></span>
                                        </div>
                                    </li> : <></>
                            }
                            {
                                (isNaN(item.cart_id) && item.attributes && !item.attributes.length) ?
                                    <>
                                        <li>
                                            <strong>1x {item.product.title}</strong>
                                            <ul className="list-circle-style ml-5" style={{ 'listStyle': 'circle' }}>
                                                <li>Clarity: {item?.clarity?.clarity} </li>
                                                <li>Kerat: {item?.kerat?.kerat}</li>
                                                <li>Crafting Timeframe: Standard Crafting: 12-14 weeks</li>
                                            </ul>
                                        </li>
                                    </> : null
                            }

                            {
                                (!isNaN(item.cart_id)) ?
                                    <>
                                        <li>
                                            <strong>1x {item.variation.title}</strong> {item?.attributes?.metal_type_karat} {item?.attributes?.metal_type} {getBandWidth(item)} {getSettingHight(item)}
                                            <ul className="list-circle-style ml-5" style={{ 'listStyle': 'circle' }}>
                                                <li>Crafting Timeframe: Standard Crafting: 12-14 weeks</li>
                                            </ul>
                                        </li>
                                    </> : null
                            }
                        </React.Fragment>
                    )) : null
                }
            </ul>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>{getTotalPriceOfCart()}<i className="fa-solid fa-euro-sign"></i></span>
            </div>
        </div>
    )
}

export default ProductSummary