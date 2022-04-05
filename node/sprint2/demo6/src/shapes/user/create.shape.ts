import * as yup from "yup";

const createUserShape = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
  isAdmin: yup
    .boolean()
    .default(() => false)
    .optional(),
});

export default createUserShape;
