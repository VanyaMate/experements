import { Validator, ValidatorResponse } from '../validator';

export const aliasValidator: Validator = function (alias: string): ValidatorResponse {
    if (alias.length < 5) {
        return 'Название должно быть длиннее 5 символов';
    }

    if (alias.length > 20) {
        return 'Название должно быть короче 20 символов';
    }

    if (/^[a-zA-Z0-9]+$/.test(alias)) {
        return false;
    }

    return 'Название содержит недопустимые символы';
};
