import * as yup from "yup";
import { hashSync } from "bcrypt";

const createUserShape = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  age: yup.number().required(),
  password: yup
    .string()
    .transform((pwd) => hashSync(pwd, 10))
    .required(),
});

export default createUserShape;
