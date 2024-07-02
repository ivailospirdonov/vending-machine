import { Product } from "../../types/product";
import classes from "./ProductList.module.scss";

interface ProductsListTypes {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListTypes) {
  return (
    <ul className={classes["product-list"]}>
      {products.map((product) => (
        <li key={product.id} className={classes["product-list__item"]}>
          <p className={classes["product-list__item__name"]}>
            {product.quantity > 0 && product.name}
          </p>
          <div className={classes["product-list__item__info"]}>
            <p>{product.id}</p>
            <p>${product.quantity > 0 ? product.price : 0}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
