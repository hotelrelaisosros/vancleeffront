import { Formik } from "formik";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    surname: Yup.string().required("Surname is required"),
    street_number: Yup.string().max(10, "Street number must not be greater than 10 characters.").required("Street Number is required"),
    street_name: Yup.string().required("Street Name is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip code is required"),
    phone: Yup.string().required("Phone number is required"),
});

const UpdateAddress = ({ address, onUpdate, onCancel }) => {

    
    return (
        <Card className="address-card">
            <Formik
                initialValues={{
                    first_name: address.first_name,
                    last_name: address.last_name,
                    surname: address.surname,
                    street_number: address.street_number,
                    street_name: address.street_name,
                    address2: address.address2,
                    city: address.city,
                    country: address.country,
                    zip: address.zip,
                    phone: address.phone,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => onUpdate(address.id, values)}
            >
                {({ isSubmitting, values, handleSubmit, handleChange, setFieldValue, touched, errors }) => {
                
                const handlePhoneChange = (value, data) => {
                    setFieldValue("phone", value);
                    setFieldValue("country", "+"+data.dialCode);
                };
                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Control type="hidden" name="country" value={values.country} />
                        <div className="row mb-4">
                            <div className="col-4">
                                <label htmlFor="city" className="form-label">Firstname</label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    isValid={touched.first_name && !errors.first_name}
                                    isInvalid={touched.first_name && !!errors.first_name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.first_name}{' '}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-4">
                                <label htmlFor="city" className="form-label">Lastname</label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    isValid={touched.last_name && !errors.last_name}
                                    isInvalid={touched.last_name && !!errors.last_name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.last_name}{' '}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-4">
                                <label htmlFor="city" className="form-label">Surname</label>
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                    isValid={touched.surname && !errors.surname}
                                    isInvalid={touched.surname && !!errors.surname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.surname}{' '}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="street_number" className="form-label">Street number</label>
                                <Form.Control
                                    type="text"
                                    name="street_number"
                                    value={values.street_number}
                                    onChange={handleChange}
                                    isValid={touched.street_number && !errors.street_number}
                                    isInvalid={touched.street_number && !!errors.street_number}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.street_number}{' '}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="street_name" className="form-label">Street name</label>
                                <Form.Control
                                    type="text"
                                    name="street_name"
                                    value={values.street_name}
                                    onChange={handleChange}
                                    isValid={touched.street_name && !errors.street_name}
                                    isInvalid={touched.street_name && !!errors.street_name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.street_name}{' '}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        
                        <div className="row mb-4">
                            <div className="col-12">
                                <label htmlFor="city" className="form-label">Address Line 2</label>
                                <Form.Control
                                    type="text"
                                    name="address2"
                                    value={values.address2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <label htmlFor="city" className="form-label">City</label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    isValid={touched.city && !errors.city}
                                    isInvalid={touched.city && !!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.city}{' '}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-6">
                                <label htmlFor="city" className="form-label">Zip</label>
                                <Form.Control
                                    type="text"
                                    name="zip"
                                    value={values.zip}
                                    onChange={handleChange}
                                    isValid={touched.zip && !errors.zip}
                                    isInvalid={touched.zip && !!errors.zip}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {' '}{errors.zip}{' '}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        
                        <div className="row mb-4">
                            <div className="col-4">
                            <label htmlFor="city" className="form-label">Phone</label>
                                <PhoneInput
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    country={"us"}
                                    onChange={handlePhoneChange}
                                    isValid={touched.phone && !errors.phone}
                                    isInvalid={touched.phone && !!errors.phone}
                                    inputStyle={{ width: "100%", fontSize: "1rem"}}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: (errors.phone) ? 'block' : 'none' }}>
                                    {' '}{errors.phone}{' '}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                        <Button variant="secondary" className="ms-2" onClick={onCancel}>Cancel</Button>
                    </Form>
                )}}
            </Formik>
        </Card>
    );
};

export default UpdateAddress;
