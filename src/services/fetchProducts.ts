export const fetchProducts = async () => {
  const response = await fetch("/products.json");
  return await response.json();
};
