export interface IDbService {
    initialize(): Promise<void>;

    sync(): Promise<void>;
}
