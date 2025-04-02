import { DomainPost } from 'shared';
import { JSX } from 'solid-js';
import classNames from 'classnames';
import css from './PostPreview.module.css';

export type PostPreviewProps = {
    post: DomainPost;
} & JSX.HTMLAttributes<HTMLElement>;

export const PostPreview = function (props: PostPreviewProps) {
    const { class: className, post, ...other } = props;
    return (
        <article
            {...other}
            class={classNames(css.container, {}, [className])}
        >
            <header>
                <span>{post.id}</span>
                <h3>{post.title}</h3>
            </header>
            <p>{post.body}</p>
            <footer>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
            </footer>
        </article>
    );
};
