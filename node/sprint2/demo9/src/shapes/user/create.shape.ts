import { hashSync } from "bcrypt";
import * as yup from "yup";

const createUserShape = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd) => hashSync(pwd, 10))
    .required(),
  isAdmin: yup
    .boolean()
    .default(() => false)
    .optional(),
});

export default createUserShape;
