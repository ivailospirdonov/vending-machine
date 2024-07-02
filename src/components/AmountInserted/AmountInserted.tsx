import classes from "./AmountInserted.module.scss";

interface AmountInsertedTypes {
  totalInserted: number;
}

export default function AmountInserted({ totalInserted }: AmountInsertedTypes) {
  return (
    <div className={classes["amount-inserted-wrapper"]}>
      <p>Balance: ${totalInserted}</p>
    </div>
  );
}
