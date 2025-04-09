import { DomainUrl } from 'shared';
import css from './UrlPreview.module.css';
import {} from 'preact-iso';


export type UrlPreviewProps = {
    url: DomainUrl;
}

export const UrlPreview = function (props: UrlPreviewProps) {
    return (
        <article className={ css.container }>
            <header>
                <span>{ props.url.id }</span>
                <div>
                    <a
                        href={ `${ __API__ }/${ props.url.id }` }
                        target={ '_blank' }
                        rel={ 'noreferrer' }>Перейти</a>
                    <a
                        href={ `/info/${ props.url.id }` }>Информация</a>
                </div>
            </header>
            <p>{ props.url.originalUrl }</p>
            <footer>{ new Date(props.url.createdAt).toLocaleString() }</footer>
        </article>
    );
};