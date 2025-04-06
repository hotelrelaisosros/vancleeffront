import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import "./Cart.css";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.cart.cart_items;
  });
  const [gemstoneFaceting, setGemstoneFaceting] = useState([
    { id: "B", value: "Brilliant" },
    { id: "CI", value: "Crushed Ice" },
    { id: "OMI", value: "Old Mint Ice" },
    { id: "RC", value: "Rose Cut" },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(CartMiddleware.GetCart(token));
  }, [dispatch]);

  const {
    gemShapes,
    gemStoneColors,
    birthStones,
    gemStones,
    prongStyles,
    ringSizes,
    bandWidths,
    settingHeights,
    bespokeCustomizations,
    bespokeWithTypes,
    accentStoneTypes,
    metalTypes,
  } = useSelector((state) => state.customization);

  const data = useMemo(
    () => ({
      shapes: gemShapes,
      colors: gemStoneColors,
      widths: bandWidths,
      settingsHeight: settingHeights,
      ringSize: ringSizes,
      prongStyle: prongStyles,
      birthstones: birthStones,
      gemstones: gemStones,
      accentStoneTypes: accentStoneTypes,
      bespokeCustomizations: bespokeCustomizations,
      bespokeWithTypes: bespokeWithTypes,
      metalTypes: metalTypes,
    }),
    [
      gemShapes,
      gemStoneColors,
      bandWidths,
      settingHeights,
      ringSizes,
      prongStyles,
      birthStones,
      gemStones,
      accentStoneTypes,
      bespokeCustomizations,
      bespokeWithTypes,
      metalTypes,
    ]
  );

  useEffect(() => {
    dispatch(CustomizationMiddleware.fetchAllCustomizationData());
  }, [dispatch]);

  const getBandWidth = (item) => {
    let width = data.widths.find(
      (width) => width.id == item.attributes.band_width_id
    )?.name;
    if (width) {
      width += "/ " + width;
    }
    return width;
  };

  const getSettingHight = (item) => {
    let height = data.settingsHeight.find(
      (shight) => shight.id == item.attributes.setting_height_id
    )?.name;
    if (height) {
      height += "/ " + height;
    }
    return height;
  };

  const getRingSize = (item) => {
    return data.ringSize.find((size) => size.id == item.attributes.ring_size_id)
      ?.name;
  };

  const getProngSize = (item) => {
    return data.prongStyle.find(
      (style) => style.id == item.attributes.prong_style_id
    )?.name;
  };

  const getBespokeCustomizationTypeName = (item) => {
    return data.bespokeWithTypes.find((bespokeWithType) => {
      const parentID = bespokeWithType?.bsp_type.find((type) => {
        return type.id == item.id;
      });
      if (parentID) {
        return bespokeWithType;
      }
    })?.name;
  };

  const getFactingName = (faceting_id) => {
    return gemstoneFaceting.find((gemstone) => gemstone.id === faceting_id)
      ?.value;
  };

  const removeItemFromCart = (item) => {
    dispatch(CartMiddleware.RemoveItemFromCart(item.id, token));
    dispatch(CartMiddleware.GetCart(token));
  };

  const handleMoveToWishlist = (items) => {
    const formData = {
      product_id: parseInt(items.product.id),
      product_image_id: parseInt(items.product_image.id),
      variation_id: parseInt(items.variation.id),
      // metal_type_id: parseInt(items.metal_type_id),
      metal_type_karat: items.attributes.metal_type_karat,
      // band_width_id: parseInt(items.band_width_id),
      // setting_height_id: parseInt(items.setting_height_id),
      // ring_size_id: parseInt(items.ring_size_id),
      // prong_style_id: parseInt(items.prong_style_id),
      // engraved_text: items.engraved_text,

      // bespoke_type: items.bespoke_types_id,
      // bespoke_customization_id: items.bespoke_types_id,
      // bespoke_customization_types_id: items.bespoke_customization_types_id,

      // birth_stone: items.birth_stone_id,
      // birth_stone_id: items.birth_stone_id,

      // gem_stone: parseInt(items.gem_stone_id),
      // gem_stone_id: parseInt(items.gem_stone_id),
      // gem_shape_id: parseInt(items.gem_stone_id),
      // gem_stone_color_id: parseInt(items.gem_stone_color_id),
      // faceting_id: items.faceting_id
    };
    console.log(items, formData);

    // dispatch(CartMiddleware.RemoveItemFromCart(item.id, token))
    // dispatch(CartMiddleware.GetCart(token))
  };

  const getTotalPriceOfCart = () => {
    return cartItems.reduce(
      (total, item) => parseInt(total) + parseInt(item.price),
      0
    );
  };

  const handleContinueShopping = () => {
    navigate("/rings");
  };

  const handleContinueCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div
        style={{
          paddingTop: 60,
          paddingBottom: 60,
          backgroundColor: "#ECF2EA",
          textAlign: "center",
        }}
      >
        <h1>Shopping cart</h1>
      </div>

      {cartItems?.length ? (
        <>
          <div className="container my-5 cart-page">
            <div className="row border-bottom pb-3">
              <div className="col-8">Cart Product</div>
              <div className="col-2 text-end text-muted">Quantity</div>
              <div className="col-2 text-end text-muted">Price</div>
            </div>
          </div>
          {cartItems.map((item, index) => (
            <div key={index} className="container my-5 cart-page">
              <div className="row my-4">
                <div className="col-md-2">
                  <img
                    src={item.product_image.image}
                    alt="Product"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6 product-summary">
                  {item.cart_id?.includes("-") &&
                  !Array.isArray(item.attributes) ? (
                    <React.Fragment>
                      <h5>Your Dream Ring</h5>
                      <p>Product inclusions:</p>
                      <ul
                        className="list-disc-style"
                        style={{ listStyle: "disc" }}
                      >
                        <li>
                          <strong>1x {item.variation.title}</strong>{" "}
                          {item?.attributes?.metal_type_karat}{" "}
                          {item?.attributes?.metal_type} {getBandWidth(item)}{" "}
                          {getSettingHight(item)}
                          <ul
                            className="list-circle-style ml-5"
                            style={{ listStyle: "circle" }}
                          >
                            <li>Ring Size: {getRingSize(item)} </li>
                            <li>Prong Style: {getProngSize(item)}</li>
                            <li>
                              Crafting Timeframe: Standard Crafting: 12-14 weeks
                            </li>
                          </ul>
                        </li>
                        {item?.bespoke_types?.length
                          ? (item?.bespoke_types).map((bespoke_type, index) => {
                              return (
                                <li key={index}>
                                  1x{" "}
                                  {getBespokeCustomizationTypeName(
                                    bespoke_type
                                  )}{" "}
                                  - {bespoke_type?.name}
                                </li>
                              );
                            })
                          : null}

                        {data?.gemstones?.length &&
                          data.gemstones.map((gemstone, index) =>
                            gemstone.id === item?.gem_stone?.id ? (
                              item?.gem_stone.type === "M" ? (
                                <li key={index}>
                                  1x{" "}
                                  {item?.gem_stone.type === "M"
                                    ? "Moissanite"
                                    : "Lab Grown Diamond"}{" "}
                                  {gemstone.shape}
                                  <ul
                                    className="list-circle-style ml-5"
                                    style={{ listStyle: "circle" }}
                                  >
                                    <li>
                                      Faceting Type:{" "}
                                      {getFactingName(
                                        item?.attributes?.faceting_id
                                      )}
                                    </li>
                                    {item?.gem_stone.type === "M" ? (
                                      <li>
                                        Moissanite Colour:{" "}
                                        {item?.gem_stone?.color}
                                      </li>
                                    ) : null}
                                    {item?.gem_stone.type === "LGD" ? (
                                      <li>
                                        Lab Grown Diamond Colour:{" "}
                                        {item?.gem_stone?.color}
                                      </li>
                                    ) : null}
                                  </ul>
                                </li>
                              ) : null
                            ) : null
                          )}
                        {item?.birth_stones?.length
                          ? item?.birth_stones.map((birth_stone, index) => (
                              <li key={index}>
                                1x {birth_stone.name}
                                <ul
                                  className="list-circle-style ml-5"
                                  style={{ listStyle: "circle" }}
                                ></ul>
                              </li>
                            ))
                          : null}
                      </ul>
                      <div>
                        <button
                          className="me-3 link-button"
                          onClick={() => removeItemFromCart(item)}
                        >
                          Remove
                        </button>

                        <button
                          className="me-3 link-button"
                          onClick={() => handleMoveToWishlist(item)}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </React.Fragment>
                  ) : null}

                  {item.cart_id?.includes("_") ? (
                    <React.Fragment>
                      <p>Product inclusions:</p>
                      <ul
                        className="list-disc-style"
                        style={{ listStyle: "disc" }}
                      >
                        <li>
                          <strong>1x {item.product.title}</strong>
                          <ul
                            className="list-circle-style ml-5"
                            style={{ listStyle: "circle" }}
                          >
                            <li>Clarity: {item?.clarity?.name} </li>
                            <li>
                              Stone Type :
                              {item?.kerat?.stone_type === "D" && "Diamond"}
                              {item?.kerat?.stone_type === "LM" &&
                                "Lab Missionate"}
                            </li>

                            <li>Kerat: {item?.kerat?.kerat}</li>
                            <li>Size: {item?.attributes?.size}</li>

                            <li>
                              Crafting Timeframe: Standard Crafting: 12-14 weeks
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <div>
                        <button
                          className="me-3 link-button"
                          onClick={() => removeItemFromCart(item)}
                        >
                          Remove
                        </button>
                        <button
                          className="me-3 link-button"
                          onClick={() => handleMoveToWishlist(item)}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </React.Fragment>
                  ) : null}

                  {!isNaN(item.cart_id) ? (
                    <>
                      <ul
                        className="list-disc-style"
                        style={{ listStyle: "disc" }}
                      >
                        <li>
                          <strong>1x {item.variation.title}</strong>{" "}
                          {item?.attributes?.metal_type_karat}{" "}
                          {item?.attributes?.metal_type} {getBandWidth(item)}{" "}
                          {getSettingHight(item)}
                          <ul
                            className="list-circle-style ml-5"
                            style={{ listStyle: "circle" }}
                          >
                            <li>
                              Crafting Timeframe: Standard Crafting: 12-14 weeks
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <div>
                        <button
                          className="me-3 link-button"
                          onClick={() => removeItemFromCart(item)}
                        >
                          Remove
                        </button>
                        <button
                          className="me-3 link-button"
                          onClick={() => handleMoveToWishlist(item)}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="col-md-2 text-end">
                  <input
                    type="number"
                    disabled
                    value="1"
                    className="form-control"
                    style={{ width: "80px", display: "inline" }}
                  />
                </div>
                <div className="col-md-2 text-end">{item?.price}</div>
              </div>
            </div>
          ))}
          <div className="container my-5 cart-page">
            <div className="row border-top pt-3">
              <div className="col-md-6"></div>
              <div className="col-md-4 text-end">
                <p className="mb-0">Subtotal</p>
                <p className="mb-0">
                  Taxes and <a href="#">shipping</a> calculated at checkout
                </p>
              </div>
              <div className="col-md-2 text-end">
                <h5>
                  {getTotalPriceOfCart()}
                  <i className="fa-solid fa-euro-sign"></i>
                </h5>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-6">
                <button
                  className="btn btn-outline-dark"
                  onClick={handleContinueShopping}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
              <div className="col-12 col-md-6 text-md-end mt-md-o mt-3">
                <button
                  className="btn btn-dark"
                  onClick={handleContinueCheckout}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {!cartItems?.length ? (
        <div className="container cart-page-noproduct">
          <div className="row justify-content-center">
            <div className="col-12 your-cart" style={{ margin: "50px" }}>
              <p>Your cart is currently empty.</p>
              <button
                className="btn btn-outline-dark"
                onClick={handleContinueShopping}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Cart;
