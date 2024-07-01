interface SelectProductTypes {
  insertedProductId: React.RefObject<HTMLInputElement>;
  handleBuyProduct: Function;
}

export default function SelectProduct({
  insertedProductId,
  handleBuyProduct,
}: SelectProductTypes) {
  return (
    <>
      <input type="number" ref={insertedProductId} />
      <button onClick={() => handleBuyProduct()}>Buy</button>
    </>
  );
}
