import React, { FC } from 'react';
import withStore from '../../hocs/withStore';
import { IRootStore } from '../../store';
import { getCurrencyFormat } from '../../utils/format.utils';
import styles from './UserDeposit.module.css';

type TUserDepositProps = {
    children?: never;
    store: IRootStore;
};

const UserDeposit: FC<TUserDepositProps> = ({ store }: TUserDepositProps) => {
    const {
        depositStore: { totalAmount },
        appController: { returnDeposit },
    } = store;
    return (
        <div className={styles.container}>
            <div>
                Total:
                {getCurrencyFormat(totalAmount)}
            </div>
            <div className={`${styles.btn} ${styles[`btn_${totalAmount}`] || ''}`} onClick={returnDeposit}>
                Сдача
            </div>
        </div>
    );
};

export default withStore(UserDeposit);
