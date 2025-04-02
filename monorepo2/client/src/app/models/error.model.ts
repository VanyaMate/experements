import { effect, store } from '@vanyamate/sec';
import { showError } from '../actions/error/error.action.ts';

export const showErrorEffect = effect(showError);

export const error = store<Array<Error>>([]).on(showErrorEffect, 'onSuccess', (state, { result }) =>
    state.concat(result!),
);
