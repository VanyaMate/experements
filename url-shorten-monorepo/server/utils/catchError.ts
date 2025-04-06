export const catchError = function (error: unknown, message: string) {
    if (typeof error === 'string') {
        throw new Error(`${message}. ${error}`);
    }

    if (error instanceof Error) {
        throw new Error(`${message}. ${error.message}`);
    }

    throw new Error(message);
};
