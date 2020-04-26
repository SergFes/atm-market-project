import React, { ReactElement } from 'react';
import { Provider } from 'mobx-react';
import store from '../../store';
import styles from './App.module.css';
import UserDeposit from '../UserDeposit/UserDeposit';
import CashBox from '../CashBox/CashBox';
import UserStore from '../UserStore/UserStore';
import Products from '../Products/Products';
import Notifications from '../Notifications/Notifications';

export const App = (): ReactElement => (
    <Provider store={store}>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={`${styles.col} ${styles.col_4}`}>
                    <div className={styles.title}>Внесенная сумма</div>
                    <UserDeposit />
                </div>
                <div className={`${styles.col} ${styles.col_8}`}>
                    <div className={styles.title}>Cумма в кассе</div>
                    <CashBox />
                </div>
                <div className={`${styles.col} ${styles.col_4}`}>
                    <div className={styles.title}>Cумма покупателя</div>
                    <UserStore />
                </div>
                <div className={`${styles.col} ${styles.col_8}`}>
                    <div className={styles.title}>Витрина</div>
                    <Products />
                </div>
            </div>
            <Notifications />
        </div>
    </Provider>
);
