export interface IDbModelService {
    sync (): Promise<void>;

    initialize (): Promise<void>;
}
