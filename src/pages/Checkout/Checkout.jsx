import * as formik from "formik";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartMiddleware } from "../../store/cart/cartMiddleware";
import { AddressMiddleware } from "../../store/address/addressMiddleware";
import { CustomizationMiddleware } from "../../store/customize/customizationMiddleware";
import { OrderMiddleware } from "../../store/order/orderMiddleware";
import { validationSchema } from "../../utils/validation/CheckoutForm";
import "./checkout.css";
import GoogleMapSuggetionBoxCustom from "./GoogleMapSuggetionBoxCustom";
import ProductSummary from "./ProductSummary";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.cart.cart_items;
  });
  const addressList = useSelector((state) => state.address?.list);
  const [paymentMethod, setPaymentMethod] = useState();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { Formik } = formik;
  const formRef = useRef();

  useEffect(() => {
    dispatch(CartMiddleware.GetCart(token));
    dispatch(AddressMiddleware.GetAddressList(token));
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

  const handleUpdateAddress = (address, setFieldValue) => {
    if (address) {
      setFieldValue("street_number", address.street_number || "");
      setFieldValue("street_name", address.street_name || "");
      setFieldValue("city", address.city + " " + address.state || "");
      setFieldValue("zip", address.zip || "");
      setFieldValue("lat", address.lat || "");
      setFieldValue("lon", address.lon || "");
    }
  };

  const handlePlaceOrder = async () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onSubmit = async (value) => {
    // const params = convertCartItemsToOrderParam();
    const order = {
      sellerId: 1,
      name: `${value.first_name} ${value.last_name}`,
      email: "kotadiya.chintan7@gmail.com",
      phone: `${value.phone}`,
      pay_status: "unpaid",
      cart_ids: cartItems.map((items) => items.id),
      address: {
        surname: value.surname,
        first_name: value.first_name,
        last_name: value.last_name,
        address: `${value.street_number} ${value.street_name}`,
        street_name: value.street_name,
        lat: value.lat,
        lon: value.lon,
        street_number: value.street_number,
        address2: value.address2,
        country: value.country,
        city: value.city,
        zip: value.zip,
        phone: value.phone,
        phone_country_code: value.phone,
        is_primary: value.is_primary,
      },
    };

    const formData = {
      order: [order],
      payment_method: paymentMethod,
      txt_refno: "123456789",
      response_code: "000",
      response_message: "Payment Pending",
    };

    const response = await dispatch(
      OrderMiddleware.CreateOrder(formData, token)
    );
    if (response) {
      window.location.href = response.payment_link;
    }
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
        <h1>Order in progress</h1>
      </div>
      <div className="container checkout-page my-5">
        <div className="row ">
          <div className="col-lg-7 col-12 checkout_page">
            <div className="border rounded p-4 bg-light">
              <div>
                <h6 className="mb-4">Account</h6>
                <div className="mb-3">
                  {/* <input
                    type="email"
                    className="form-control"
                    placeholder={user?.email}
                    disabled
                  /> */}
                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="newsOffers"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="newsOffers">
                      Email me with news and offers
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <section>
                <h6 className="mb-4">Shipping Address</h6>
                <React.Fragment>
                  <Formik
                    initialValues={{
                      first_name: "",
                      last_name: "",
                      surname: "",
                      street_number: "",
                      street_name: "",
                      address2: "",
                      city: "",
                      country: "",
                      zip: "",
                      phone: "",
                      is_primary: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(values)}
                    innerRef={formRef}
                  >
                    {({
                      isSubmitting,
                      values,
                      handleSubmit,
                      handleChange,
                      setFieldValue,
                      touched,
                      errors,
                    }) => {
                      const handlePhoneChange = (value, data) => {
                        setFieldValue("phone", value);
                        setFieldValue(
                          "phone_country_code",
                          "+" + data.dialCode
                        );
                        setFieldValue(
                          "country",
                          data.countryCode.toUpperCase()
                        );
                      };

                      return (
                        <Form noValidate onSubmit={handleSubmit}>
                          <GoogleMapSuggetionBoxCustom
                            updateAddress={(address) =>
                              handleUpdateAddress(address, setFieldValue)
                            }
                          />
                          <Form.Control
                            type="hidden"
                            name="country"
                            value={values.country}
                          />
                          <Form.Control
                            type="hidden"
                            name="phone_country_code"
                            value={values.country}
                          />
                          <div className="mb-3">
                            <label htmlFor="surname" className="form-label">
                              Greeting. *
                            </label>
                            <Form.Select
                              name="surname"
                              isValid={touched.surname && !errors.surname}
                              isInvalid={touched.surname && !!errors.surname}
                              onChange={handleChange}
                            >
                              <option value="">Select Greeting</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Miss">Miss</option>
                              <option value="Mrs">Mrs</option>
                            </Form.Select>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <Form.Group>
                                <label
                                  htmlFor="first_name"
                                  className="form-label"
                                >
                                  Firstname
                                </label>
                                <Form.Control
                                  type="text"
                                  name="first_name"
                                  value={values.first_name}
                                  onChange={handleChange}
                                  isValid={
                                    touched.first_name && !errors.first_name
                                  }
                                  isInvalid={
                                    touched.first_name && !!errors.first_name
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {" "}
                                  {errors.first_name}{" "}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="last_name" className="form-label">
                                Lastname{" "}
                              </label>
                              <Form.Control
                                type="text"
                                name="last_name"
                                value={values.last_name}
                                onChange={handleChange}
                                isValid={touched.last_name && !errors.last_name}
                                isInvalid={
                                  touched.last_name && !!errors.last_name
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                {errors.last_name}{" "}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label
                                htmlFor="street_number"
                                className="form-label"
                              >
                                Street number
                              </label>
                              <Form.Control
                                type="text"
                                name="street_number"
                                value={values.street_number}
                                onChange={handleChange}
                                isValid={
                                  touched.street_number && !errors.street_number
                                }
                                isInvalid={
                                  touched.street_number &&
                                  !!errors.street_number
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                {errors.street_number}{" "}
                              </Form.Control.Feedback>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label
                                htmlFor="street_name"
                                className="form-label"
                              >
                                Street name
                              </label>
                              <Form.Control
                                type="text"
                                name="street_name"
                                value={values.street_name}
                                onChange={handleChange}
                                isValid={
                                  touched.street_name && !errors.street_name
                                }
                                isInvalid={
                                  touched.street_name && !!errors.street_name
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                {errors.street_name}{" "}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address2" className="form-label">
                              Address 2
                            </label>
                            <Form.Control
                              type="text"
                              name="address2"
                              value={values.address2}
                              onChange={handleChange}
                              isValid={touched.address2 && !errors.address2}
                              isInvalid={touched.address2 && !!errors.address2}
                            />
                            <Form.Control.Feedback type="invalid">
                              {" "}
                              {errors.address2}{" "}
                            </Form.Control.Feedback>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="city" className="form-label">
                                City
                              </label>
                              <Form.Control
                                type="text"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                isValid={touched.city && !errors.city}
                                isInvalid={touched.city && !!errors.city}
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                {errors.city}{" "}
                              </Form.Control.Feedback>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="zip" className="form-label">
                                ZIP
                              </label>
                              <Form.Control
                                type="text"
                                name="zip"
                                value={values.zip}
                                onChange={handleChange}
                                isValid={touched.zip && !errors.zip}
                                isInvalid={touched.zip && !!errors.zip}
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                {errors.zip}{" "}
                              </Form.Control.Feedback>
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="phone" className="form-label">
                                Phone
                              </label>
                              <PhoneInput
                                type="text"
                                name="phone"
                                country={"us"}
                                value={values.phone}
                                onChange={handlePhoneChange}
                                isValid={touched.phone && !errors.phone}
                                isInvalid={touched.phone && !!errors.phone}
                                inputStyle={{ width: "100%", fontSize: "1rem" }}
                              />
                              <Form.Control.Feedback
                                type="invalid"
                                style={{
                                  display: errors.phone ? "block" : "none",
                                }}
                              >
                                {" "}
                                {errors.phone}{" "}
                              </Form.Control.Feedback>
                            </div>
                            <div className="col-12 mb-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  style={{ transform: "scale(1.3)" }}
                                  name="is_primary"
                                  onChange={handleChange}
                                  type="checkbox"
                                  role="switch"
                                  value={values.is_primary}
                                />
                                <label className="form-label">
                                  &nbsp;&nbsp;Does make this address as primary?
                                </label>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </React.Fragment>
              </section>
              <hr />
              <section>
                <h6 className="mb-4">Payment Method</h6>
                <div className="mb-3">
                  <div className="form-check mt-2">
                    <input
                      type="radio"
                      name="payment_method"
                      onChange={() => setPaymentMethod("case")}
                      className="form-check-input"
                      id="case"
                    />
                    <label className="form-check-label" htmlFor="case">
                      Cash
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      type="radio"
                      name="payment_method"
                      onChange={() => setPaymentMethod("credit_card")}
                      className="form-check-input"
                      id="creditcard"
                    />
                    <label className="form-check-label" htmlFor="creditcard">
                      Credit card
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <ProductSummary cartItems={cartItems} data={data} />
            <div className="mt-3 text-end">
              <button
                className="btn btn-dark"
                onClick={handlePlaceOrder}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
