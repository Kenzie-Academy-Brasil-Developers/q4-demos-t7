import * as yup from "yup";

// yup.lazy() -> chave dinâmicas

// const createProductShape = yup.object().shape({
//   products: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().min(3).max(50).lowercase().required(),
//         price: yup.number().positive().min(0.1).required(),
//       })
//     )
//     .required(),
// });

const mapRules = (receivedObject: object, shapeRules: yup.AnySchema) =>
  Object.keys(receivedObject).reduce((newObject, key) => {
    console.log("receivedObject -->>", receivedObject, "\n\n");
    console.log("shapeRules -->>", shapeRules, "\n\n");
    console.log("newObject -->>", newObject, "\n\n");
    console.log("key -->>", key, "\n\n");
    console.log(
      "returned object -->>",
      { ...newObject, [key]: shapeRules },
      "\n\n"
    );

    return { ...newObject, [key]: shapeRules };
  }, {});

const createProductShape = yup.lazy((receivedObject) =>
  yup
    .object(
      mapRules(
        receivedObject,
        yup.array().of(
          yup.object().shape({
            name: yup.string().min(3).max(50).lowercase().required(),
            price: yup.number().positive().min(0.1).required(),
          })
        )
      )
    )
    .required()
);

export default createProductShape;
