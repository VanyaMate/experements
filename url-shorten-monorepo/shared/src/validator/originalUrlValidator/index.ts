import { Validator, ValidatorResponse } from '../validator';

export const originalUrlValidator: Validator = function (originalUrl: string): ValidatorResponse {
    if (
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            originalUrl,
        )
    ) {
        return false;
    } else {
        return 'Неверный формат URL';
    }
};
