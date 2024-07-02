import classes from "./ResetButton.module.scss";

interface ResetButtonTypes {
  handlePurchaseOver: Function;
}

export default function ResetButton({ handlePurchaseOver }: ResetButtonTypes) {
  return (
    <div className={classes["reset-button-wrapper"]}>
      <button onClick={() => handlePurchaseOver()}>Reset</button>
    </div>
  );
}
