import { observable, computed, action } from 'mobx';
import { ICashboxStore, TDenominationQuantityMap } from './types';
import { getListDenominationService, getMoneyChangeService, mergeDepositService, subtractAmountService } from './cashbox.service';

const defaultState: TDenominationQuantityMap = new Map([
    ['1', 100],
    ['2', 100],
    ['5', 100],
    ['10', 100],
]);

export class CashboxStore implements ICashboxStore {
    @observable denominationQuantityMap = defaultState;

    @computed get totalAmount() {
        let total = 0;
        for (const [key, value] of this.denominationQuantityMap) {
            total += value * +key;
        }
        return total;
    }

    @action replenishDeposit = (map: TDenominationQuantityMap) => {
        this.denominationQuantityMap = mergeDepositService(this.denominationQuantityMap, map);
    };

    // Получение сдачи
    @action getMoneyChange = (amount: number, deposit: TDenominationQuantityMap) => {
        // Мерж депозита пользователя с депозитом в кассе
        const generalBalanceMap = mergeDepositService(this.denominationQuantityMap, deposit);
        // Определение доступных номиналов
        const generalListDenomination = getListDenominationService(generalBalanceMap);
        // Вычисление сдачи (наименьшего кол-ва монет), если невозможно выдать сдачу вернет null
        const money = getMoneyChangeService(amount, generalListDenomination);
        if (money !== null) {
            // Разница между общей суммой (депозит пользователя + касса) и сдачей
            const diff = subtractAmountService(generalBalanceMap, money);
            // Установка нового заначения депозита кассы
            this.denominationQuantityMap = diff;
        }

        return money;
    };
}

export * from './types';
