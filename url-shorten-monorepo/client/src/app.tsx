import { useState, useLayoutEffect, useRef, useCallback } from 'preact/hooks';
import { DomainUrl, DomainUrlCreateData } from 'shared';

export function App() {
    const [urlList, setUrlList] = useState<Array<DomainUrl>>([]);
    const inputAlias = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);

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

            fetch(`${__API__}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    inputAliasCurrent.value = '';
                    inputUrlCurrent.value = '';
                    return response.json();
                })
                .then((response: DomainUrl) => setUrlList((prev) => prev.concat(response)));
        }
    }, []);

    useLayoutEffect(() => {
        fetch(`${__API__}/all`)
            .then((response) => response.json())
            .then((list) => setUrlList(list));
    }, []);

    return (
        <main>
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
            {urlList.map((item) => (
                <div key={item.id}>{item.id} - {item.originalUrl}</div>
            ))}
        </main>
    );
}
