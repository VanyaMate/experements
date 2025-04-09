import { useRoute } from 'preact-iso';
import { useLayoutEffect } from 'preact/hooks';
import {
    getUrlInfoEffect,
    urlInfo,
    urlInfoPending,
} from '../../app/model/url/url.store.ts';
import {
    notifyErrorEffect,
} from '../../app/model/notification/notification.store.ts';
import { useStore } from '../../app/model/useStore.ts';


export const InfoPage = function () {
    const { params } = useRoute();
    const { id }     = params;
    const info       = useStore(urlInfo);
    const pending    = useStore(urlInfoPending);

    useLayoutEffect(() => {
        if (id) {
            getUrlInfoEffect(id).catch(notifyErrorEffect);
        }
    }, [ id ]);

    if (pending) {
        return 'Loading...';
    }

    if (!info) {
        return 'Not found';
    }

    return (
        <div>
            <ul>
                <li><span>Ссылка на:</span>{ info.originalUrl }</li>
                <li><span>Переходов:</span>{ info.redirectCount }</li>
                <li>
                    <span>Создано:</span>{ new Date(info.createdAt).toLocaleString() }
                </li>
                <li>
                    <span>Истекает:</span>{ new Date(info.expiresAt).toLocaleString() }
                </li>
            </ul>
        </div>
    );
};