import { CoinDenomination } from "../types/coin";

export const isCoinValid = (insertedCoin: number): boolean => {
  return Object.values(CoinDenomination).includes(Number(insertedCoin));
};
