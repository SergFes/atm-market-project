import { observable, computed, action } from 'mobx';
import { IUserStore, TDenomination, TDenominationQuantityMap } from './types';

const defaultState: TDenominationQuantityMap = new Map([
    ['1', 10],
    ['2', 30],
    ['5', 20],
    ['10', 15],
]);

export class UserStore implements IUserStore {
    @observable denominationQuantityMap = defaultState;

    @computed get totalAmount() {
        let total = 0;
        for (const [key, value] of this.denominationQuantityMap) {
            total += value * +key;
        }
        return total;
    }

    @action getMoneyByKey = (key: TDenomination) => {
        const mapState = this.denominationQuantityMap;
        if (!mapState.has(key) || mapState.get(key) === 0) return new Map([[key, 0]]);

        const newValue = (mapState.get(key) as number) - 1;
        mapState.set(key, newValue);
        return new Map([[key, 1]]);
    };

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
}

export * from './types';
