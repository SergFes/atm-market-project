import { action, computed, observable } from 'mobx';
import { INotifications, TNotification, TNotificationsType } from './types';

export class Notifications implements INotifications {
    notifyId = 0;
    @observable notifications: { [key in number]: TNotification } = {};

    @computed get list() {
        return Object.values(this.notifications);
    }

    @action add = (message: string, type: TNotificationsType = 'error', timeToAutoHide = 3000) => {
        this.notifications[++this.notifyId] = {
            id: this.notifyId,
            message,
            type,
        };

        if (timeToAutoHide !== null) {
            const carringId = this.notifyId;

            setTimeout(() => {
                this.remove(carringId);
            }, timeToAutoHide);
        }
    };

    @action remove = (id: number) => {
        if (id in this.notifications) {
            delete this.notifications[id];
        }
    };
}

export * from './types';
