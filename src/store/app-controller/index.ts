import { IAppController } from './types';
import { IUserStore, TDenomination } from '../user-store';
// eslint-disable-next-line import/no-cycle
import { IRootStore } from '../index';
import { IDepositStore } from '../deposit-store';
import { IProductsStore } from '../products-store';
import { ICashboxStore, TDenominationQuantityMap } from '../cashbox-store';
import { INotifications } from '../notifications';
import { getCurrencyFormat } from '../../utils/format.utils';

export class AppController implements IAppController {
    userStore: IUserStore;
    depositStore: IDepositStore;
    productStore: IProductsStore;
    сashboxStore: ICashboxStore;
    notifications: INotifications;

    constructor(rootStore: IRootStore) {
        this.userStore = rootStore.userStore;
        this.depositStore = rootStore.depositStore;
        this.productStore = rootStore.productStore;
        this.сashboxStore = rootStore.сashboxStore;
        this.notifications = rootStore.notifications;
    }

    makeDeposit = (key: TDenomination): void => {
        const money = this.userStore.getMoneyByKey(key);
        this.depositStore.replenishDeposit(money);
    };

    returnDeposit = () => {
        const { totalAmount: amountDeposit, denominationQuantityMap } = this.depositStore;
        if (!amountDeposit) return;

        const restBalance = this.сashboxStore.getMoneyChange(amountDeposit, denominationQuantityMap);

        this.userStore.replenishDeposit(restBalance as TDenominationQuantityMap);
        this.depositStore.replaceDeposit(new Map());
    };

    buyProduct = (id: number): void => {
        const productInfo = this.productStore.getProductInfoById(id);
        if (!productInfo) return this.notifications.add('Нет такого продукта');

        const { cost: costProduct, quantity, name } = productInfo;
        if (!quantity) return this.notifications.add('Продукт закончился');

        const amountDeposit = this.depositStore.totalAmount;
        const amountDiff = amountDeposit - costProduct;
        if (amountDiff < 0)
            return this.notifications.add(`Недостаточно средств. Необходимо еще ${getCurrencyFormat(Math.abs(amountDiff))}`);

        const restBalance = this.сashboxStore.getMoneyChange(amountDiff, this.depositStore.denominationQuantityMap);

        if (restBalance === null) return this.notifications.add('Недостаточно средст для сдачи');

        this.depositStore.replaceDeposit(restBalance);
        this.productStore.getProductById(id);
        this.notifications.add(`Спасибо! Вами приобретён ${name}`);
    };
}

export * from './types';
