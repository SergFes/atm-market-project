export type TDenomination = '10' | '5' | '2' | '1';

export interface IAppController {
    makeDeposit(key: TDenomination): void;
    buyProduct(id: number): void;
    returnDeposit(): void;
}
