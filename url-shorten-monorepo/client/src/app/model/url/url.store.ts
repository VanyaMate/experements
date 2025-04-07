import { effect, store } from '@vanyamate/sec';
import { getAllUrlsAction } from '../../action/url/getAllUrls.action.ts';
import { createUrlAction } from '../../action/url/createUrl.action.ts';
import { DomainUrl } from 'shared';

export const getAllUrlEffect = effect(getAllUrlsAction);
export const createUrlEffect = effect(createUrlAction);

export const urlsPending = store<boolean>(false)
    .on(getAllUrlEffect, 'onBefore', () => true)
    .on(getAllUrlEffect, 'onFinally', () => false);

export const urlsList = store<Array<DomainUrl>>([])
    .on(getAllUrlEffect, 'onSuccess', (_, { result }) => result!)
    .on(createUrlEffect, 'onSuccess', (state, { result }) => state.concat(result!));
