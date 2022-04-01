import * as yup from "yup";

const createAddressShape = yup.object().shape({
  street: yup.string().required(),
  neighborHood: yup.string().required(),
  zipCode: yup
    .string()
    .matches(/\d{5}-\d{3}/g, "zipCode should follow this format: 12345-123")
    .required(),
});

export default createAddressShape;
