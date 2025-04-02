import { Validator } from '../validator';
import { isString } from '@vanyamate/types-kit';

export const validateUserLogin = function (login: unknown): Validator {
    if (isString(login)) {
        if (login.length > 20) {
            return 'Логин не должен превышать 20 символов';
        }

        if (login.length < 5) {
            return 'Логин должен быть не менее 5 символов';
        }

        return null;
    }

    return 'Логин должен быть строкой';
};
