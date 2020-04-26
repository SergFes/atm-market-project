import { observable, action } from 'mobx';
import { IProductsStore, TProduct } from './types';

const defaultState: TProduct[] = [
    { id: 1, name: 'Чай', cost: 13, quantity: 10, img: 'tea' },
    { id: 2, name: 'Кофе', cost: 18, quantity: 20, img: 'coffe' },
    { id: 3, name: 'Кофе с молоком', cost: 21, quantity: 20, img: 'coffeMilk' },
    { id: 4, name: 'Сок', cost: 35, quantity: 15, img: 'juice' },
];

export class ProductsStore implements IProductsStore {
    @observable products = defaultState;

    @action getProductById = (id: number) => {
        const candidate = this.products.find(item => item.id === id);
        if (!candidate) return null;
        candidate.quantity -= 1;
        return candidate;
    };

    @action getProductInfoById = (id: number) => {
        const candidate = this.products.find(item => item.id === id);
        if (!candidate) return null;
        const { cost, quantity, name } = candidate;
        return { cost, quantity, name };
    };
}

export * from './types';
