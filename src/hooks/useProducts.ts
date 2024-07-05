import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProducts } from "../services/fetchProducts";
import { formatToFixed } from "../utils/formatToFixed";
import { isCoinValid } from "../utils/isCoinValid";
import { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalInserted, setTotalInserted] = useState<number>(0);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [notification, setNotification] = useState<string>(
    "Please, insert coins!"
  );
  const insertedProductIdRef = useRef<HTMLInputElement>(null);
  const insertedCoinRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setNotification("Something went wrong!");
      }
    };
    loadProducts();
  }, []);

  const handlePurchaseOver = useCallback(() => {
    if (totalInserted >= 0) {
      setNotification(`Change: ${totalInserted}!`);
    }
    insertedProductIdRef.current && (insertedProductIdRef.current.value = "");
    insertedCoinRef.current && (insertedCoinRef.current.value = "");
    setTotalInserted(0);
  }, [totalInserted]);

  useEffect(() => {
    if (hasPurchased) {
      handlePurchaseOver();
      setHasPurchased(false);
    }
  }, [handlePurchaseOver, hasPurchased]);

  const handleBuyProduct = useCallback(() => {
    if (!insertedProductIdRef.current) {
      setNotification("Insert product number!");
      return;
    }

    const productId = Number(insertedProductIdRef.current.value);
    const productToBuy = products.find((product) => product.id === productId);

    if (!productToBuy) {
      setNotification("Wrong product number!");
      return;
    }

    if (productToBuy.quantity === 0) {
      setNotification("Product is out of stock!");
      return;
    }

    if (productToBuy.price > totalInserted) {
      setNotification("Insert more coins!");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
    setTotalInserted((prevAmount) =>
      formatToFixed(prevAmount - productToBuy.price)
    );
    setHasPurchased(true);
  }, [products, totalInserted]);

  const handleInsertCoin = useCallback(() => {
    if (!insertedCoinRef.current?.value) {
      setNotification("Insert a coin!");
      return;
    }

    const coinValue = Number(insertedCoinRef.current.value);

    if (!isCoinValid(coinValue)) {
      setNotification("Insert a correct coin!");
      insertedCoinRef.current.value = "";
      return;
    }

    setTotalInserted((prevAmount) => formatToFixed(prevAmount + coinValue));
    setNotification("Select a product!");
    insertedCoinRef.current.value = "";
  }, []);

  return {
    products,
    notification,
    totalInserted,
    insertedCoin: insertedCoinRef,
    insertedProductId: insertedProductIdRef,
    handleBuyProduct,
    handleInsertCoin,
    handlePurchaseOver,
    setHasPurchased,
  };
};
