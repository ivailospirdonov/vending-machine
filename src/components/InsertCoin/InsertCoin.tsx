import { validateInputLength } from "../../utils/validateInputLength";
import classes from "./InsertCoin.module.scss";

interface CoinInsertTypes {
  insertedCoin: React.RefObject<HTMLInputElement>;
  handleInsertCoinInput?: Function;
  handleInsertCoin: Function;
}

export default function InsertCoin({
  insertedCoin,
  handleInsertCoin,
}: CoinInsertTypes) {
  return (
    <div className={classes["inset-coin-wrapper"]}>
      <input
        type="number"
        ref={insertedCoin}
        onChange={() => validateInputLength(insertedCoin, 3)}
        min="0"
        step="1"
        pattern="\d*"
        inputMode="numeric"
        placeholder="Coin"
      />
      <button
        className={classes["inset-coin-wrapper__btn"]}
        onClick={() => handleInsertCoin()}
      >
        Insert
      </button>
    </div>
  );
}
