import { DomainPost, validatePostTitle, DomainPostUpdate } from 'shared';
import { IPostService } from '../post-service.interface';
import { readFileSync, writeFileSync } from 'node:fs';

export class FsPostService implements IPostService {
    constructor(private readonly _fsPath: string) {}

    async create(title: string, body: string): Promise<DomainPost> {
        const error = validatePostTitle(title);

        if (error) {
            throw new Error(error);
        }

        const posts = this._getPosts();
        const post: DomainPost = {
            id: crypto.randomUUID(),
            title,
            body,
            createdAt: Date.now(),
        };
        posts.push(post);
        this._writePosts(posts);
        return post;
    }

    async update(id: string, data: DomainPostUpdate): Promise<DomainPost> {
        const posts = this._getPosts();
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                if (data.title) {
                    const error = validatePostTitle(data.title);
                    if (error) {
                        throw new Error(error);
                    } else {
                        posts[i].title = data.title;
                    }
                }
                if (data.body) {
                    posts[i].body = data.body;
                }
                this._writePosts(posts);
                return posts[i];
            }
        }
        throw new Error('Пост не найден');
    }

    async remove(id: string): Promise<boolean> {
        const posts = this._getPosts();
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                this._writePosts(posts);
                return true;
            }
        }

        return false;
    }

    async get(id: string): Promise<DomainPost> {
        const posts = this._getPosts();
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
        throw new Error('Пост не найден');
    }

    async getAll(): Promise<Array<DomainPost>> {
        return this._getPosts();
    }

    private _getPosts(): Array<DomainPost> {
        try {
            const file = readFileSync(this._fsPath, { encoding: 'utf8' });
            return JSON.parse(file);
        } catch (e) {
            if (e.code === 'ENOENT') {
                return [];
            }
            throw e;
        }
    }

    private _writePosts(posts: Array<DomainPost>) {
        writeFileSync(this._fsPath, JSON.stringify(posts), { encoding: 'utf8' });
    }
}
