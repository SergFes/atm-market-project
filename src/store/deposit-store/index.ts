import { observable, computed, action } from 'mobx';
import { IDepositStore, TDenominationQuantityMap } from './types';

const defaultState: TDenominationQuantityMap = new Map();

export class DepositStore implements IDepositStore {
    @observable denominationQuantityMap = defaultState;

    @computed get totalAmount() {
        let total = 0;
        for (const [key, value] of this.denominationQuantityMap) {
            total += value * +key;
        }
        return total;
    }

    @action replenishDeposit = (map: TDenominationQuantityMap) => {
        const mapState = this.denominationQuantityMap;
        map.forEach((value, key) => {
            let newValue = value;
            if (mapState.has(key)) {
                newValue += mapState.get(key) as number;
            }

            mapState.set(key, newValue);
        });
    };

    @action replaceDeposit = (newMap: TDenominationQuantityMap) => {
        this.denominationQuantityMap = newMap;
    };
}

export * from './types';
