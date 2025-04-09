import { useLayoutEffect } from 'preact/hooks';
import {
    getAllUrlEffect,
    urlsList,
    urlsPending,
} from '../../app/model/url/url.store.ts';
import {
    notifyErrorEffect, notifyInfoEffect, notifySuccessEffect,
} from '../../app/model/notification/notification.store.ts';
import { useStore } from '../../app/model/useStore.ts';
import { UrlList } from '../../shared/url/UrlList/UrlList.tsx';
import {
    CreateUrlForm,
} from '../../widget/url/CreateUrlForm/CreateUrlForm.tsx';


export const HomePage = function () {
    const pending = useStore(urlsPending);
    const list    = useStore(urlsList);

    useLayoutEffect(() => {
        getAllUrlEffect().then(() => notifySuccessEffect('Список загружен')).catch(notifyErrorEffect);
    }, []);

    useLayoutEffect(() => {
        if (pending) {
            notifyInfoEffect('Загрузка списка URL');
        }
    }, [ pending ]);

    return (
        <div>
            <CreateUrlForm/>
            <UrlList list={ list }/>
        </div>
    );
};