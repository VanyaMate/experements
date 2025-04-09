import { effect, store } from '@vanyamate/sec';
import { getAllUrlsAction } from '../../action/url/getAllUrls.action.ts';
import { createUrlAction } from '../../action/url/createUrl.action.ts';
import { DomainUrl, DomainUrlInfo } from 'shared';
import { getUrlInfoAction } from '../../action/url/getUrlInfo.action.ts';


export const getAllUrlEffect  = effect(getAllUrlsAction);
export const createUrlEffect  = effect(createUrlAction);
export const getUrlInfoEffect = effect(getUrlInfoAction);

export const urlsPending = store<boolean>(false)
    .on(getAllUrlEffect, 'onBefore', () => true)
    .on(getAllUrlEffect, 'onFinally', () => false);

export const urlInfoPending = store<boolean>(false)
    .on(getUrlInfoEffect, 'onBefore', () => true)
    .on(getUrlInfoEffect, 'onFinally', () => false);

export const urlInfo = store<DomainUrlInfo | null>(null)
    .on(getUrlInfoEffect, 'onSuccess', (_, { result }) => result!);

export const urlsList = store<Array<DomainUrl>>([])
    .on(getAllUrlEffect, 'onSuccess', (_, { result }) => result!)
    .on(createUrlEffect, 'onSuccess', (state, { result }) => state.concat(result!));
