import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProducts } from "../services/fetchProducts";
import { formatToFixed } from "../utils/formatToFixed";
import { isCoinValid } from "../utils/isCoinValid";
import { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalInserted, setTotalInserted] = useState<number>(0);
  const [notification, setNotification] = useState<string>(
    "Моля, сложете монети!"
  );
  const insertedProductIdRef = useRef<HTMLInputElement>(null);
  const insertedCoinRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setNotification("Грешка при зареждане на продуктите!");
      }
    };
    loadProducts();
  }, []);

  const handlePurchaseOver = useCallback(() => {
    if (totalInserted > 0) {
      setNotification(`Ресто: ${totalInserted}!`);
    }
    insertedProductIdRef.current && (insertedProductIdRef.current.value = "");
    insertedCoinRef.current && (insertedCoinRef.current.value = "");
    setTotalInserted(0);
  }, [totalInserted]);

  const handleBuyProduct = useCallback(() => {
    if (!insertedProductIdRef.current) {
      setNotification("Въведете номер на продукт!");
      return;
    }

    const productId = Number(insertedProductIdRef.current.value);
    const productToBuy = products.find((product) => product.id === productId);

    if (!productToBuy) {
      setNotification("Въведеният номер е грешен!");
      return;
    }

    if (productToBuy.quantity === 0) {
      setNotification("Продуктът е изчерпан, моля изберете друг!");
      return;
    }

    if (productToBuy.price > totalInserted) {
      setNotification("Сложете още монети!");
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
    handlePurchaseOver();
  }, [products, totalInserted, handlePurchaseOver]);

  const handleInsertCoin = useCallback(() => {
    if (!insertedCoinRef.current) {
      setNotification("Сложете монета!");
      return;
    }

    const coinValue = Number(insertedCoinRef.current.value);

    if (!isCoinValid(coinValue)) {
      setNotification("Сложете правилна монета!");
      return;
    }

    setTotalInserted((prevAmount) => formatToFixed(prevAmount + coinValue));
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
  };
};
