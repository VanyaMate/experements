import { DomainUrlInfo } from 'shared';


export const getUrlInfoAction = async function (id: string): Promise<DomainUrlInfo> {
    return fetch(`${ __API__ }/info/${ id }`)
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            }

            throw await response.json();
        });
};