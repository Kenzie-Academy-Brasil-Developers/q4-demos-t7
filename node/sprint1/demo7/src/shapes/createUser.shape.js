import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

const createUserShape = yup.object().shape({
  uuid: yup
    .string()
    .default(() => v4())
    .transform(() => v4()),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(4)
    .required()
    .transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default createUserShape;
