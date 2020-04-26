export type TNotificationsType = 'error' | undefined;

export type TNotification = {
    id: number;
    message: string;
    type: TNotificationsType;
};

export interface INotifications {
    notifications: { [key in number]: TNotification };
    list: TNotification[];
    add(msg: string, type?: TNotificationsType, timeToAutoHide?: number | null | undefined): void;
    remove(id: number): void;
}
