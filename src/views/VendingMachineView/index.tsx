import VendingMachine from "./VendingMachine";
import { useProducts } from "../../hooks/useProducts";

export default function VendingMachineView() {
  const {
    products,
    notification,
    totalInserted,
    insertedCoin,
    insertedProductId,
    handleBuyProduct,
    handleInsertCoin,
    handlePurchaseOver,
  } = useProducts();
  return (
    <VendingMachine
      products={products}
      notification={notification}
      totalInserted={totalInserted}
      insertedCoin={insertedCoin}
      insertedProductId={insertedProductId}
      handleBuyProduct={handleBuyProduct}
      handleInsertCoin={handleInsertCoin}
      handlePurchaseOver={handlePurchaseOver}
    />
  );
}
