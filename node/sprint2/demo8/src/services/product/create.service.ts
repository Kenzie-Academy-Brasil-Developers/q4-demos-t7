import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories";

const createProductService = async (products: Product[]) => {
  const newProducts = new ProductRepository().saveMultiple(products);

  return await newProducts;
};

export default createProductService;
