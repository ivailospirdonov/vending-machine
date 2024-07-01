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
    <>
      <input type="number" ref={insertedCoin} />
      <button onClick={() => handleInsertCoin()}>Insert Coin</button>
    </>
  );
}
