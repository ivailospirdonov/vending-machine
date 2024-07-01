import React from "react";
import { Product } from "../../types/product";

interface ProductsListTypes {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListTypes) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <p>{product.name}</p>
          <div>
            <p>{product.quantity}</p>
            <p>${product.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
