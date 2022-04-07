import * as yup from "yup";

// yup.lazy() -> chave dinâmicas

const createProductShape = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().min(3).max(50).lowercase().required(),
        price: yup.number().positive().min(0.1).required(),
      })
    )
    .required(),
});

export default createProductShape;
