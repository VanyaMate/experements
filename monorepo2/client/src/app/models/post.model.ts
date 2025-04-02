import { effect, store } from '@vanyamate/sec';
import { DomainPost } from 'shared';
import {
    createPostAction,
    getAllPostsAction,
    getPostAction,
    removePostAction,
    updatePostAction,
} from '../actions/post/posts.action.ts';

export const getAllPostsForPageEffect = effect(getAllPostsAction);
export const getPostByIdForPageEffect = effect(getPostAction);
export const createPostEffect = effect(createPostAction);
export const updatePostEffect = effect(updatePostAction);
export const removePostEffect = effect(removePostAction);

export const post = store<DomainPost | null>(null).on(
    getPostByIdForPageEffect,
    'onSuccess',
    (_, { result }) => result!,
);
export const postPending = store<boolean>(false)
    .on(getPostByIdForPageEffect, 'onBefore', () => true)
    .on(getPostByIdForPageEffect, 'onFinally', () => false);

export const posts = store<Array<DomainPost>>([])
    .on(getAllPostsForPageEffect, 'onSuccess', (_, { result }) => result!)
    .on(createPostEffect, 'onSuccess', (state, { result }) => state.concat(result!))
    .on(updatePostEffect, 'onSuccess', (state, { result }) =>
        state.map((post) => (post.id === result!.id ? result! : post)),
    )
    .on(removePostEffect, 'onSuccess', (state, { args }) =>
        state.filter((post) => post.id !== args[0]),
    );
export const postsPending = store<boolean>(false)
    .on(getAllPostsForPageEffect, 'onBefore', () => true)
    .on(getAllPostsForPageEffect, 'onFinally', () => false);
