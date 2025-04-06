import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validationSchema = yup.object().shape({
	surname: yup.string().required("Greeting is required!"),
	first_name: yup
		.string()
		.min(2, "First Name must be at least 2 characters!")
		.max(30, "First Name cannot exceed 30 characters!")
		.required("First Name is required!"),
	last_name: yup
		.string()
		.min(2, "Last Name must be at least 2 characters!")
		.max(30, "Last Name cannot exceed 30 characters!")
		.required("Last Name is required!"),
	street_number: yup.string().required("Street Number is required!"),
	street_name: yup .string() .max(100, "Street Name cannot exceed 100 characters!") .required("Street Name is required!"),
	address2: yup.string().max(100, "Address 2 cannot exceed 100 characters!").required("Address2 is required"),
	city: yup.string().max(50, "City cannot exceed 50 characters!").required("City is required!"),
	zip: yup
		.string()
		.matches(/^\d{5,6}$/, "PIN must be 5-6 digits!")
		.required("Zip code is required!"),
	phone: yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(`+${value}`);
		return phoneNumber ? phoneNumber.isValid() : false;
      }),
})
