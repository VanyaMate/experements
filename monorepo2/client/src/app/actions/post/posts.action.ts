import type { DomainPost, DomainPostCreate, DomainPostUpdate } from 'shared';

export const getAllPostsAction = function (): Promise<Array<DomainPost>> {
    return fetch(`${__API__}/posts`).then((res) => res.json());
};

export const getPostAction = function (id: string): Promise<DomainPost> {
    return fetch(`${__API__}/post/${id}`)
        .then((res) => res.json())
        .catch(async (res) => {
            throw await res.json();
        });
};

export const createPostAction = function (data: DomainPostCreate): Promise<DomainPost> {
    return fetch(`${__API__}/post`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};

export const updatePostAction = function (id: string, data: DomainPostUpdate): Promise<DomainPost> {
    return fetch(`${__API__}/post/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};

export const removePostAction = function (id: string): Promise<boolean> {
    return fetch(`${__API__}/post/${id}`, {
        method: 'DELETE',
    }).then((res) => res.json());
};
