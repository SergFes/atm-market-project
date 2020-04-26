import React, { FC } from 'react';
import withStore from '../../hocs/withStore';
import { IRootStore } from '../../store';
import { getCurrencyFormat } from '../../utils/format.utils';
import styles from './CashBox.module.css';

type TCashBoxProps = {
    children?: never;
    store: IRootStore;
};

const CashBox: FC<TCashBoxProps> = ({ store }: TCashBoxProps) => {
    const {
        сashboxStore: { totalAmount, denominationQuantityMap },
    } = store;

    return (
        <div className={styles.container}>
            <div>
                Total:
                {getCurrencyFormat(totalAmount)}
            </div>
            <div className={styles['currency-list']}>
                {Array.from(denominationQuantityMap).map(([key, quantity]) => (
                    <div key={key} className={styles.currency}>
                        <b>{getCurrencyFormat(+key)}</b>
                        <span>x{quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withStore(CashBox);
