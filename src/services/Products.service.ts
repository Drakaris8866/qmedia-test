import { IProduct } from "../types/products.types";


class ProductsService {
  url = "products.json";
  getProducts() {
    return fetch(this.url)
      .then((response) => response.json())
      .then((data) => data as IProduct[]);
  }
}

export default new ProductsService();
