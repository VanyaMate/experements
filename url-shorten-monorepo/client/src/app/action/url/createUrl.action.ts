import { DomainUrl, DomainUrlCreateData } from 'shared';

export const createUrlAction = async function (
    createData: DomainUrlCreateData,
): Promise<DomainUrl> {
    return fetch(`${__API__}`, {
        method: 'POST',
        body: JSON.stringify(createData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        throw await response.json();
    });
};
