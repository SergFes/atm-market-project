export type TProduct = {
    id: number;
    name: string;
    cost: number;
    quantity: number;
    img: 'coffe' | 'tea' | 'coffeMilk' | 'juice';
};

export interface IProductsStore {
    products: TProduct[];
    getProductById(id: number): TProduct | null;
    getProductInfoById(id: number): Pick<TProduct, 'cost' | 'quantity' | 'name'> | null;
}
