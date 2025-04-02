import { memo } from 'react';

export type ButtonProps = {
    onClick: () => void;
    text: string;
};

export const Button = memo(function Button(props: ButtonProps) {
    return <button onClick={props.onClick}>{props.text}</button>;
});
