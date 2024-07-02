import { validateInputLength } from "../../utils/validateInputLength";
import classes from "./SelectProduct.module.scss";

interface SelectProductTypes {
  insertedProductId: React.RefObject<HTMLInputElement>;
  handleBuyProduct: Function;
}

export default function SelectProduct({
  insertedProductId,
  handleBuyProduct,
}: SelectProductTypes) {
  return (
    <div className={classes["select-product-wrapper"]}>
      <input
        type="number"
        ref={insertedProductId}
        onChange={() => validateInputLength(insertedProductId, 2)}
        min="0"
        step="1"
        pattern="\d*"
        inputMode="numeric"
        placeholder="Number"
      />
      <button
        className={classes["select-product-wrapper__btn"]}
        onClick={() => handleBuyProduct()}
      >
        Buy
      </button>
    </div>
  );
}
