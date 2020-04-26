import React, { FC, ReactElement } from 'react';
import withStore from '../../hocs/withStore';
import { IRootStore } from '../../store';
import styles from './Products.module.css';
import ProductCard from './ProductCard/ProductCard';

type TProductsProps = {
    children?: never;
    store: IRootStore;
};

const Products: FC<TProductsProps> = ({ store }: TProductsProps): ReactElement => {
    const {
        productStore: { products },
        appController: { buyProduct },
    } = store;

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {products.map(({ id, name, cost, quantity, img }) => (
                    <div key={id} className={`${styles.col} ${styles.col_6}`}>
                        <ProductCard img={img} name={name} cost={cost} quantity={quantity} onClick={buyProduct} id={id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withStore(Products);
