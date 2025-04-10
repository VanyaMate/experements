export const catchError = function (error: unknown) {
    if (typeof error === 'string') {
        throw new Error(error);
    }

    throw error;
};
