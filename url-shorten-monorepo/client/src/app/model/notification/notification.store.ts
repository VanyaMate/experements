import { effect, store } from '@vanyamate/sec';


export type Notification = {
    id: string;
    header: string;
    message: string;
    type: 'error' | 'success' | 'info' | 'warning';
};

export const notifyErrorEffect   = effect(
    async (error: { error: string }): Promise<Notification> => ({
        id     : crypto.randomUUID(),
        header : 'Ошибка',
        message: error.error,
        type   : 'error',
    }),
);
export const notifySuccessEffect = effect(
    async (info: string): Promise<Notification> => ({
        id     : crypto.randomUUID(),
        header : 'Успешно',
        message: info,
        type   : 'success',
    }),
);
export const notifyInfoEffect    = effect(
    async (info: string): Promise<Notification> => ({
        id     : crypto.randomUUID(),
        header : 'Информация',
        message: info,
        type   : 'info',
    }),
);
export const notifyRemoveEffect  = effect(async (n: Notification) => n);

export const notifications = store<Array<Notification>>([])
    .on(notifyErrorEffect, 'onSuccess', (state, { result }) => state.concat(result!))
    .on(notifySuccessEffect, 'onSuccess', (state, { result }) => state.concat(result!))
    .on(notifyInfoEffect, 'onSuccess', (state, { result }) => state.concat(result!))
    .on(notifyRemoveEffect, 'onSuccess', (state, { result }) =>
        state.filter((item) => item !== result!),
    );
