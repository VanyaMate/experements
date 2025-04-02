import { JSX } from 'solid-js';
import css from './Input.module.css';
import classNames from 'classnames';

export type InputProps = {} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input = function (props: InputProps) {
    const { class: className, ...other } = props;
    return (
        <input
            class={classNames(css.container, {}, [className])}
            {...other}
        />
    );
};
