import { DomainPost, DomainPostUpdate } from 'shared';

export interface IPostService {
    create(title: string, body: string): Promise<DomainPost>;

    update(id: string, data: DomainPostUpdate): Promise<DomainPost>;

    remove(id: string): Promise<boolean>;

    get(id: string): Promise<DomainPost>;

    getAll(): Promise<Array<DomainPost>>;
}
