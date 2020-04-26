import React, { FC, ReactElement } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import withStore from '../../hocs/withStore';
import { IRootStore } from '../../store';
import styles from './Notifications.module.css';

type TNotificationsProps = {
    children?: never;
    store: IRootStore;
};

const Notifications: FC<TNotificationsProps> = ({ store }: TNotificationsProps): ReactElement => {
    const {
        notifications: { list, remove },
    } = store;

    const messages = list.map(note => {
        return (
            <CSSTransition
                key={note.id}
                classNames={{
                    enter: styles.itemEnter,
                    enterActive: styles.itemEnterActive,
                    exitActive: styles.itemLeaveActive,
                }}
                timeout={500}
            >
                <div
                    className={styles.toast}
                    onDoubleClick={() => {
                        remove(note.id);
                    }}
                >
                    {note.message}
                </div>
            </CSSTransition>
        );
    });

    return <TransitionGroup className={styles.box}>{messages}</TransitionGroup>;
};

export default withStore(Notifications);
