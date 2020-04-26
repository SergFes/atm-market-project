export type TDenomination = '10' | '5' | '2' | '1';
export type TDenominationQuantityMap = Map<TDenomination, number>;

export interface IDepositStore {
    totalAmount: number;
    denominationQuantityMap: TDenominationQuantityMap;
    replenishDeposit(map: TDenominationQuantityMap): void;
    replaceDeposit(map: TDenominationQuantityMap): void;
}
