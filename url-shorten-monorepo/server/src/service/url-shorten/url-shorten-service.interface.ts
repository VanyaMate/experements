import { DomainUrl, DomainUrlCreateData } from 'shared';
import { DomainUrlInfo } from 'shared/src';


export interface IUrlShortenService {
    create (data: DomainUrlCreateData): Promise<DomainUrl>;

    remove (id: string): Promise<boolean>;

    getAll (): Promise<Array<DomainUrl>>;

    getInfoById (id: string): Promise<DomainUrlInfo>;

    increment (id: string): Promise<void>;
}
