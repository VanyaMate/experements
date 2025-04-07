import { useLayoutEffect, useRef, useCallback } from 'preact/hooks';
import { DomainUrlCreateData } from 'shared';
import {
    createUrlEffect,
    getAllUrlEffect,
    urlsList,
    urlsPending,
} from './app/model/url/url.store.ts';
import { useStore } from './app/model/useStore.ts';
import { PageNotification } from './widget/notification/PageNotification/PageNotification.tsx';
import {
    notifyErrorEffect,
    notifySuccessEffect,
} from './app/model/notification/notification.store.ts';

export function App() {
    const inputAlias = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);
    const pending = useStore(urlsPending);
    const list = useStore(urlsList);

    const createUrl = useCallback(() => {
        if (inputAlias.current && inputUrl.current) {
            const inputAliasCurrent = inputAlias.current;
            const inputUrlCurrent = inputUrl.current;
            const alias = inputAliasCurrent.value;
            const url = inputUrlCurrent.value;

            const data: DomainUrlCreateData = {
                originalUrl: url,
            };

            if (alias) {
                data.alias = alias;
            }

            createUrlEffect(data)
                .then(() => {
                    inputAliasCurrent.value = '';
                    inputUrlCurrent.value = '';
                })
                .then(() => notifySuccessEffect('URL создан'))
                .catch(notifyErrorEffect)
                .catch(() => {
                    console.log('err');
                });
        }
    }, []);

    useLayoutEffect(() => {
        getAllUrlEffect().catch(notifyErrorEffect);
    }, []);

    return (
        <main>
            <PageNotification />
            <h1>Hello world</h1>
            <input
                placeholder="Alias"
                ref={inputAlias}
            />
            <input
                placeholder="Url"
                ref={inputUrl}
            />
            <button onClick={createUrl}>Создать</button>
            {pending ? (
                <p>Loading..</p>
            ) : (
                list.map((item) => (
                    <div key={item.id}>
                        {item.id} - {item.originalUrl}
                    </div>
                ))
            )}
        </main>
    );
}
