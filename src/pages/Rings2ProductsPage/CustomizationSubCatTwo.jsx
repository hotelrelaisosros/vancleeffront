import {
  faBowlFood,
  faCalendar,
  faHeart,
  faInfoCircle,
  faPhone,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CaratInfoModal from "../../components/RightSideBarModal/CaratInfoModal/CaratInfoModal";
import DiscoverTheStone from "../../components/RightSideBarModal/DiscoverTheStone/DiscoverTheStone";
import SelectSizeModal from "../../components/RightSideBarModal/SizeGuidModal/SelectSizeModal";
import SizeGuidModal from "../../components/RightSideBarModal/SizeGuidModal/SizeGuidModal";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import { WishListMiddleware } from "../../store/wishlist/wishlistMiddleware";
import "./CustomizationSubCatTwo.css";

const CustomizationSubCatTwo = ({ product, back }) => {
  const dispatch = useDispatch();
  const { clarity, ringSizeRing2, metalKarate } = useSelector(
    (state) => state.customization
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [customization, setCustomization] = useState({
    metal_kerat: "",
    clarity: "",
    color: "",
    sizering2: "",
  });

  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedClarity, setSelectedClarity] = useState("");
  const [selectedStone, setSelectedStone] = useState("");

  const [showSidebar, setShowSidebar] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [size, setSize] = useState();

  useEffect(() => {
    dispatch(CustomizationMiddleware.fetchRing2CustomizationData());
  }, [dispatch]);

  const handleMetalkarateChange = (item) => {
    setCustomization((prev) => ({ ...prev, metal_kerat: item.id }));
    setSelectedMetal(item);
  };

  const handleStoneChange = async (option) => {
    setCustomization((prev) => ({
      ...prev,
      stone_type: option,
      metal_kerat: "", // reset metal karate
      clarity: "", // optionally reset clarity too
    }));

    setSelectedStone({ stone_type: option });
    setSelectedMetal(""); // reset metal

    // Fetch carat list based on new stone
    const formData = new FormData();
    formData.append("stone_type", option);
    await dispatch(CustomizationMiddleware.fetchCaratRing2(formData));
  };

  const data = useMemo(
    () => ({ clarity, ringSizeRing2, metalKarate }),
    [clarity, ringSizeRing2, metalKarate]
  );
  const handleClarityChange = (item) => {
    setCustomization((prev) => ({ ...prev, clarity: item.id }));
    setSelectedClarity(item);
  };

  const handleAddToCart = async () => {
    if (!size || !selectedMetal || !selectedStone || !selectedClarity) {
      alert(
        "Please select size, carat, stone, and clarity before adding to the cart."
      );
      return; // Prevent the request from being sent
    }
    const formData = {
      product_id: product.product.id,
      variation_id: parseInt(product.varation[0].id),
      product_image_id: parseInt(product.image[0]?.id),
      metal_kerat: parseInt(customization.metal_kerat),
      clarity: parseInt(customization.clarity),
      size: parseInt(size),
    };

    const response = await dispatch(CartMiddleware.AddToCart(formData, token));
    if (response.status === false) {
      return false;
    }

    setSelectedMetal("");
    setSelectedClarity("");
    setSelectedStone("");
    setShowSidebar("");

    navigate("/cart");
  };

  const addToWishlist = async () => {
    const formData = {
      product_id: product.id,
      variation_id: parseInt(product.varation[0].id),
      product_image_id: parseInt(product.image[0]?.id),
      metal_kerat: parseInt(customization.metal_kerat),
      clarity: parseInt(customization.clarity),
    };

    const response = await dispatch(
      WishListMiddleware.AddToWishList(formData, token)
    );
    if (response.status === false) {
      console.log(response.data.errors);
      return false;
    }
  };

  const getTotal = () => {
    let total = 0;

    if (selectedMetal.price) {
      total += parseFloat(selectedMetal.price);
    }

    if (selectedClarity.price) {
      total += parseFloat(selectedClarity.price);
    }

    total += parseInt(product?.varation[0].price);

    return total;
  };

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 product-details-2">
        <div className="product-options row">
          <div className="product-title" style={{ marginBottom: "30px" }}>
            {product?.varation[0].title} {selectedMetal.kerate},{" "}
            {selectedClarity.clarity}
          </div>

          <p className="sub-title-tagline" style={{ marginBottom: "10px" }}>
            750/1000 white gold, Diamond
          </p>

          <div
            className="sub-title-tagline row"
            style={{ marginBottom: "15px" }}
          >
            <div className="col-11">
              VCARO1VM00 -{" "}
              <a
                className="sub-title-tagline-button"
                onClick={() => setShowSidebar("product_details")}
              >
                Product details
              </a>
            </div>
            <div className="col-1 m-0 p-0">
              <span style={{ cursor: "pointer" }} onClick={addToWishlist}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="ms-2"
                  style={{ fontSize: "18px", color: "#666" }}
                />
              </span>
            </div>
          </div>

          <div
            class="vca-pdp-price vca-body-02"
            style={{ marginBottom: "10px" }}
          >
            <span className="vca-pdp-price-info vca-mb-10 ">
              € {getTotal()}
            </span>
            <span className="vca-pdp-tax-info vca-mb-10">
              {/* Taxes included */}
            </span>
          </div>

          {/* Stone type */}
          <div className="form-group mb-3 row align-items-center">
            <div className="col-11">
              <Dropdown className="vca-custom-select">
                <Dropdown.Toggle
                  variant="outline-dark"
                  id="dropdown-clarity"
                  className="custom-dropdown-toggle vca-custom-select-button"
                >
                  {selectedStone
                    ? `Stone: ${
                        selectedStone === "LM" ? "Lab Missionate" : "Diamond"
                      }`
                    : "Choose Stone Type"}{" "}
                </Dropdown.Toggle>

                <Dropdown.Menu className="vca-custom-select-menu">
                  {["LM", "D"].map((option, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => handleStoneChange(option)}
                      className="vca-custom-select-menuitems d-flex align-items-center"
                      style={{ minWidth: "180px" }}
                    >
                      <img
                        src="https://media.istockphoto.com/id/1207698975/photo/sparkling-light-round-brilliant-cut-diamond-with-shadow-3d-rendering-illustration-isolated-on.jpg?s=1024x1024&w=is&k=20&c=W-WUO3cq4xAN618xdSyRi1aqrmEAo7XlZv5eya4OPxw="
                        alt={option}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginRight: "10px",
                          borderRadius: "50%",
                        }}
                      />
                      {option === "LM" && "Lab Missionate"}
                      {option === "D" && "Diamond"}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-1"></div>
          </div>

          {/* Metal carate */}

          <div className="form-group mb-3 row align-items-center">
            <div className="col-11">
              <Dropdown className="vca-custom-select">
                <Dropdown.Toggle
                  variant="outline-dark"
                  id="dropdown-metalKarate"
                  className="custom-dropdown-toggle vca-custom-select-button"
                  disabled={!selectedStone} // disable if no stone selected
                >
                  {selectedMetal && selectedMetal?.kerate
                    ? `Carat: ${selectedMetal?.kerate}`
                    : "Choice of Carat"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="vca-custom-select-menu">
                  {data?.metalKarate?.map((item, i) => (
                    <Dropdown.Item
                      className="vca-custom-select-menuitems"
                      key={i}
                      onClick={() => handleMetalkarateChange(item)}
                      style={{ minWidth: "180px" }}
                    >
                      {item.kerate}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-1 m-0 p-0">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setShowSidebar("carat_info")}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="ms-2"
                  style={{ fontSize: "18px", color: "#666" }}
                />
              </span>
            </div>
          </div>

          <div className="form-group mb-3 row align-items-center">
            <div className="col-11">
              <Dropdown className="vca-custom-select">
                <Dropdown.Toggle
                  variant="outline-dark"
                  id="dropdown-clarity"
                  className="custom-dropdown-toggle vca-custom-select-button"
                >
                  {selectedClarity && selectedClarity?.name
                    ? `Color: ${selectedClarity?.name}`
                    : "Choose Stone Color"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="vca-custom-select-menu">
                  {data?.clarity?.map((item, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => handleClarityChange(item)}
                      className="vca-custom-select-menuitems d-flex align-items-center"
                      style={{ minWidth: "180px" }}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginRight: "10px",
                          borderRadius: "50%",
                        }}
                      />
                      {/* Text */}
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="form-group mb-3 row align-items-center">
            <div className="col-11">
              <button
                className="ring-page2-transperant-button"
                style={{ marginRight: "10px" }}
                onClick={() => setShowSidebar("select_size")}
              >
                CHOOSE THE SIZE
              </button>
            </div>
            <div className="col-1"></div>
          </div>
          <div>
            <hr />
          </div>
          <div className="mb-0">
            <p
              className="mb-0 button-discover-the-stone"
              onClick={() => setShowSidebar("discover_stone")}
            >
              DISCOVER THE STONES OF THE HOUSE
            </p>
          </div>

          <div className="text-center mb-3 section-sizeguide">
            <hr />
            <a onClick={() => setShowSidebar("size_guide")}>Size Guide</a>
          </div>

          <div className="form-group">
            <div className="full-width-btns form-group mb-3">
              {/* <button type="button" className="button1" onClick={back}> BACK </button> */}

              {/* <button
                                type="button" 
                                className={`button1 ${(!customization.clarity && !customization.metal_kerat) ? "disabled" : ""}`} 
                                onClick={addToWishlist} 
                                disabled={!customization.clarity && !customization.metal_kerat}
                            > WISHLIST
                            </button> */}
              <button
                className="ring-page2-transperant-button"
                style={{ marginRight: "10px" }}
                onClick={addToWishlist}
              >
                Add To Wishlist
              </button>
              <button
                className={"ring-page2-transperant-button"}
                onClick={handleAddToCart}
                // disabled={!customization.clarity && !customization.metal_kerat}
              >
                {" "}
                Add to Cart{" "}
              </button>
            </div>
          </div>

          <div className="text-center section-sizeguide-button">
            <p>Engraving offered</p>
            <p>Returns free of charge within 30 days</p>
            <hr />
          </div>

          <div className="section-sizeguide-button">
            <p>
              <FontAwesomeIcon icon={faPhone} className="ms-2" />{" "}
              &nbsp;&nbsp;CONTACT US
            </p>
            <p>
              <FontAwesomeIcon icon={faCalendar} className="ms-2" />{" "}
              &nbsp;&nbsp;Make an appointment in the shop
            </p>
            <hr />
          </div>

          <div className="mb-3 section-sizeguide-button">
            <p>
              <FontAwesomeIcon icon={faBowlFood} className="ms-2" />{" "}
              &nbsp;&nbsp; Maintenance and services
            </p>
            <p>
              <FontAwesomeIcon icon={faWeightHanging} className="ms-2" />{" "}
              &nbsp;&nbsp; Tax evasion, delivery and payment
            </p>
          </div>
          <div className="mb-3 section-sizeguide-button">
            <img
              src="/img/van-cleef-arpels-packaging-panel-2400-1350.jpg"
              height={"100px"}
            />
            <p className="mt-1 ">The gift by 12eme Art</p>
          </div>
        </div>
      </div>

      {/* Product details modal */}
      <div
        className="product-details-popup"
        style={{
          display: showSidebar === "product_details" ? "block" : "none",
        }}
      >
        <div className="product-details-popup-title">
          <h3>Product details</h3>
          <button
            className="close-btn-product-details"
            onClick={() => setShowSidebar("")}
          >
            X
          </button>
        </div>

        <div className="vca-lightbox-content">
          {product?.desc ? (
            <>
              <div className="product-details-popup-description">
                <p className="mb-0 text-start">{product?.desc}</p>
              </div>
              <hr />
            </>
          ) : null}

          <div className="product-details-popup-description">
            <dt className="text-start vca-capital-link">REFERENCE</dt>
            <dd className="text-start vca-body-02">VCARO1VM00</dd>
          </div>
          <hr className="m-0 p-0"></hr>
          <div className="product-details-popup-description">
            <dt className="text-start vca-capital-link">ROCK</dt>
            <dd className="text-start vca-body-02">
              Diamond: 1 stone, {selectedMetal?.kerate} carat
            </dd>
          </div>
          <hr className="m-0 p-0"></hr>
          <p className="mb-0 text-start product-details-popup-instruction">
            <br />
            <br />
            The final price of the product, including actual shipping costs and
            applicable taxes, will be detailed on your order page before
            finalization. For more information, please see our Terms of Sale.
            The product details indicated above refer to the specified size and
            may vary for other sizes. Please contact us for more information on
            other sizes. Please note that each Van Cleef & Arpels creation is
            handmade. As such, carat weight, stone quantity, and chain length
            may vary slightly from one creation to another.
          </p>
        </div>
      </div>

      {/* Discover the  stone */}
      <DiscoverTheStone show={showSidebar} setShow={setShowSidebar} />
      <CaratInfoModal show={showSidebar} setShow={setShowSidebar} />
      <SizeGuidModal show={showSidebar} setShow={setShowSidebar} />
      <SelectSizeModal
        show={showSidebar}
        setShow={setShowSidebar}
        size={size}
        setSize={setSize}
        ringSizeRing2={ringSizeRing2}
      />
    </>
  );
};

export default CustomizationSubCatTwo;
