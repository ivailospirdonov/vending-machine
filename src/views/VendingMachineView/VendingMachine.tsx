import AmountInserted from "../../components/AmountInserted/AmountInserted";
import InsertCoin from "../../components/InsertCoin/InsertCoin";
import ProductsList from "../../components/ProductsList/ProductsList";
import ResetButton from "../../components/ResetButton/ResetButton";
import SelectProduct from "../../components/SelectProduct/SelectProduct";
import UserNotification from "../../components/UserNotification/UserNotification";
import { Product } from "../../types/product";
import classes from "./VendingMachine.module.scss";

interface VendingMachineProps {
  products: Product[];
  notification: string;
  totalInserted: number;
  insertedCoin: React.RefObject<HTMLInputElement>;
  insertedProductId: React.RefObject<HTMLInputElement>;
  handleBuyProduct: Function;
  handleInsertCoin: Function;
  handlePurchaseOver: Function;
}

export default function VendingMachine({
  products,
  notification,
  totalInserted,
  insertedCoin,
  insertedProductId,
  handleBuyProduct,
  handleInsertCoin,
  handlePurchaseOver,
}: VendingMachineProps) {
  return (
    <div className={classes["vending-machine-wrapper"]}>
      <div className={classes["product-list-wrapper"]}>
        <ProductsList products={products} />
      </div>
      <div className={classes["vending-machine-inputs-wrapper"]}>
        <UserNotification notification={notification} />
        <InsertCoin
          insertedCoin={insertedCoin}
          handleInsertCoin={handleInsertCoin}
        />
        <SelectProduct
          insertedProductId={insertedProductId}
          handleBuyProduct={handleBuyProduct}
        />
        <AmountInserted totalInserted={totalInserted} />
        <ResetButton handlePurchaseOver={handlePurchaseOver} />
      </div>
    </div>
  );
}
