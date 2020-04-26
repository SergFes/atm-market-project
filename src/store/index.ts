import { IUserStore, UserStore } from './user-store';
import { IDepositStore, DepositStore } from './deposit-store';
import { IProductsStore, ProductsStore } from './products-store';
import { CashboxStore, ICashboxStore } from './cashbox-store';
import { INotifications, Notifications } from './notifications';
// eslint-disable-next-line import/no-cycle
import { IAppController, AppController } from './app-controller';

export interface IRootStore {
    userStore: IUserStore;
    depositStore: IDepositStore;
    productStore: IProductsStore;
    сashboxStore: ICashboxStore;
    appController: IAppController;
    notifications: INotifications;
}
class RootStore implements IRootStore {
    userStore = new UserStore();
    depositStore = new DepositStore();
    productStore = new ProductsStore();
    сashboxStore = new CashboxStore();
    notifications = new Notifications();

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    appController = new AppController(this);
}

export default new RootStore();
