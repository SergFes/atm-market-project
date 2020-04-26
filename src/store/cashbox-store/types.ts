export type TDenomination = '10' | '5' | '2' | '1';
export type TDenominationQuantityMap = Map<TDenomination, number>;

export interface ICashboxStore {
    totalAmount: number;
    denominationQuantityMap: TDenominationQuantityMap;
    getMoneyChange(amount: number, deposit: TDenominationQuantityMap): TDenominationQuantityMap | null;
    replenishDeposit(map: TDenominationQuantityMap): void;
}
