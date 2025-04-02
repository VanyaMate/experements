import { JSX } from 'solid-js';
import css from './Button.module.css';
import classNames from 'classnames';

export type ButtonProps = {} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = function (props: ButtonProps) {
    const { class: className, ...other } = props;
    return (
        <button
            class={classNames(css.container, {}, [className])}
            {...other}
        />
    );
};
