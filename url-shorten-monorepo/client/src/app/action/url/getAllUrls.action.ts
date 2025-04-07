import { DomainUrl } from 'shared';

export const getAllUrlsAction = async function (): Promise<Array<DomainUrl>> {
    return fetch(`${__API__}/all`).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        throw await response.json();
    });
};
