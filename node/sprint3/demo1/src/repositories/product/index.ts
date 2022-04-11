import {
  createQueryBuilder,
  getRepository,
  InsertResult,
  Repository,
} from "typeorm";
import { Product } from "../../entities/Product";

interface ProductRepo {
  save: (product: Product) => Promise<Product>;
  getAll: () => Promise<Product[]>;
  saveMultiple: (products: Product[]) => Promise<any>;
}

class ProductRepository implements ProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = getRepository(Product);
  }

  save = async (product: Product) => await this.ormRepo.save(product);
  getAll = async () => await this.ormRepo.find();
  saveMultiple = async (products: Product[]) => {
    return await this.ormRepo
      .createQueryBuilder() // criar uma query no banco
      .insert() // INSER INTO nomeDaTabela (...)
      .values(products) // VALUES (...)
      .returning(["name", "price"]) // RETURNING ...
      .execute() // para executar a query
      .then((products) => products.generatedMaps);
  };

  // bulk insert | bulk create
  // bulk update
}

export default ProductRepository;
