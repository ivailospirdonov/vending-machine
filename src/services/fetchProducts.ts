export const fetchProducts = async () => {
  return await fetch("/products.json").then((response) => response.json());
};
