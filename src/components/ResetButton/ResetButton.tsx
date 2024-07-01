interface ResetButtonTypes {
  handlePurchaseOver: Function;
}

export default function ResetButton({ handlePurchaseOver }: ResetButtonTypes) {
  return <button onClick={() => handlePurchaseOver()}>Reset</button>;
}
