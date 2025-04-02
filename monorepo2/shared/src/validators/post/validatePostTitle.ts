import { Validator } from '../validator';
import { isString } from '@vanyamate/types-kit';

export const validatePostTitle = function (title: unknown): Validator {
    if (isString(title)) {
        if (title.length > 40) {
            return 'Заголовок не должен превышать 40 символов';
        }

        if (title.length < 5) {
            return 'Заголовок должен быть не менее 5 символов';
        }

        return null;
    }

    return 'Заголовок должен быть строкой';
};
