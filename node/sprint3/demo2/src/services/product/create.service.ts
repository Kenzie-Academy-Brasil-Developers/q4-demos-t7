import { ProductRepository } from "../../repositories";
import { IProduct } from "../../types";

const createProductService = async (productsObject: IProduct) => {
  const listOfProducts = Object.values(productsObject); // em python -> dict().values()
  const returnProductsList = [];

  for (const products of listOfProducts){
    const newProducts = new ProductRepository().saveMultiple(products);
    returnProductsList.push(await newProducts)
  }

  return returnProductsList;
};

export default createProductService;
