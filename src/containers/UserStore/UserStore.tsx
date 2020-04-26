import React, { FC, ReactElement } from 'react';
import withStore from '../../hocs/withStore';
import { IRootStore } from '../../store';
import styles from './UserStore.module.css';
import { getCurrencyFormat } from '../../utils/format.utils';

type TUserStoreProps = {
    children?: never;
    store: IRootStore;
};

const UserStore: FC<TUserStoreProps> = ({ store }: TUserStoreProps): ReactElement => {
    const {
        userStore: { denominationQuantityMap, totalAmount },
        appController: { makeDeposit },
    } = store;
    return (
        <div>
            <div className={styles.container}>
                <div>
                    Total:
                    {getCurrencyFormat(totalAmount)}
                </div>
                <div className={styles['currency-btn-list']}>
                    {Array.from(denominationQuantityMap).map(([key, quantity]) => (
                        <div key={key} className={styles['currency-btn']}>
                            <div className={styles.currency}>
                                <b>{getCurrencyFormat(+key)}</b>
                                <span>x{quantity}</span>
                            </div>
                            <div className={styles.btn} onClick={() => makeDeposit(key)}>
                                Внести
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withStore(UserStore);
