import * as yup from 'yup';

const updateUserEmailShape = yup.object().shape({
  email: yup.string().email().required(),
});

export default updateUserEmailShape;
