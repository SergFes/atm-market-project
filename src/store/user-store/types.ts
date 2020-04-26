export type TDenomination = '10' | '5' | '2' | '1';
export type TDenominationQuantityMap = Map<TDenomination, number>;

export interface IUserStore {
    totalAmount: number;
    denominationQuantityMap: TDenominationQuantityMap;
    getMoneyByKey(id: TDenomination): Map<TDenomination, number>;
    replenishDeposit(map: TDenominationQuantityMap): void;
}
