import { getRepository, InsertResult, Repository } from "typeorm";
import { Product } from "../../entities/Product";

interface ProductRepo {
  save: (product: Product) => Promise<Product>;
  getAll: () => Promise<Product[]>;
}

class ProductRepository implements ProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = getRepository(Product);
  }

  save = async (product: Product) => await this.ormRepo.save(product);
  getAll = async () => await this.ormRepo.find();
}

export default ProductRepository;
