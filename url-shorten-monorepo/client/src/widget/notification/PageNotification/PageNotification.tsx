import css from './PageNotification.module.css';
import { NotificationItem } from '../Notification/NotificationItem.tsx';
import { useStore } from '../../../app/model/useStore.ts';
import {
    Notification,
    notifications,
    notifyRemoveEffect,
} from '../../../app/model/notification/notification.store.ts';
import { useCallback } from 'preact/hooks';

export const PageNotification = function () {
    const list = useStore(notifications);

    const hide = useCallback((item: Notification) => {
        notifyRemoveEffect(item);
    }, []);

    return (
        <div
            className={css.container}
        >
            {list.map((item) => (
                <NotificationItem
                    className={css.item}
                    notification={item}
                    key={item.id}
                    onAnimationEnd={hide}
                />
            ))}
        </div>
    );
};
