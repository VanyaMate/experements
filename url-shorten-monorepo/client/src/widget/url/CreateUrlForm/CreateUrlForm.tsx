import { useCallback, useRef } from 'preact/hooks';
import { DomainUrlCreateData } from 'shared';
import { createUrlEffect } from '../../../app/model/url/url.store.ts';
import {
    notifyErrorEffect,
    notifySuccessEffect,
} from '../../../app/model/notification/notification.store.ts';
import css from './CreateUrlForm.module.css';


export const CreateUrlForm = function () {
    const inputAlias = useRef<HTMLInputElement>(null);
    const inputUrl   = useRef<HTMLInputElement>(null);
    const inputDate  = useRef<HTMLInputElement>(null);

    const createUrl = useCallback(() => {
        if (inputAlias.current && inputUrl.current && inputDate.current) {
            const inputAliasCurrent = inputAlias.current;
            const inputUrlCurrent   = inputUrl.current;
            const inputDateCurrent  = inputDate.current;
            const alias             = inputAliasCurrent.value;
            const url               = inputUrlCurrent.value;
            const date              = inputDateCurrent.value;

            const data: DomainUrlCreateData = {
                originalUrl: url,
            };

            if (alias) {
                data.alias = alias;
            }

            if (date) {
                data.expiresAt = +new Date(date);
            }

            createUrlEffect(data)
                .then(() => {
                    inputAliasCurrent.value = '';
                    inputUrlCurrent.value   = '';
                })
                .then(() => notifySuccessEffect('URL создан'))
                .catch(notifyErrorEffect);
        }
    }, []);

    return (
        <div className={ css.container }>
            <h2>Создать URL</h2>
            <input
                placeholder="Alias"
                ref={ inputAlias }
            />
            <input
                placeholder="Url"
                ref={ inputUrl }
            />
            <input
                placeholder="Url"
                ref={ inputDate }
                type={ 'date' }
            />
            <button onClick={ createUrl }>Создать</button>
        </div>
    );
};