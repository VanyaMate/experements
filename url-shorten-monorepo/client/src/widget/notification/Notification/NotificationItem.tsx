import { Notification } from '../../../app/model/notification/notification.store.ts';
import css from './NotificationItem.module.css';
import { useEffect, useRef } from 'preact/hooks';

export type NotificationItemProps = {
    notification: Notification;
    className?: string;
    onAnimationEnd: (item: Notification) => void;
};

export const NotificationItem = function (props: NotificationItemProps) {
    const item = useRef<HTMLDivElement>(null);
    useEffect(() => {
        requestAnimationFrame(() => {
            const current = item.current;
            if (current) {
                current.classList.add(css.visible);
                current.style.height = current.scrollHeight + 'px';
            }
        });
    }, []);

    return (
        <article
            ref={item}
            className={[css.container, css[props.notification.type], props.className]
                .filter(Boolean)
                .join(' ')}
            onAnimationEnd={() => {
                props.onAnimationEnd(props.notification);
            }}
        >
            <div className={css.content}>
                <header>{props.notification.header}</header>
                <p>{props.notification.message}</p>
            </div>
        </article>
    );
};
