import { DomainUrl } from 'shared';
import { UrlPreview } from '../UrlPreview/UrlPreview.tsx';
import css from './UrlList.module.css';


export type UrlListProps = {
    list: Array<DomainUrl>;
}

export const UrlList = function (props: UrlListProps) {
    return (
        <section className={ css.container }>
            { props.list.map((item) => <UrlPreview url={ item }
                                                   key={ item.id }/>) }
        </section>
    );
};