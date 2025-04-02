import { validatePostTitle } from 'shared';
import { Button } from './shared/button/Button/Button.tsx';
import { Input } from './shared/input/Input/Input.tsx';
import { createSignal, For, JSX, onMount, Show } from 'solid-js';
import { useStore } from '@vanyamate/sec-solidjs';
import { createPostEffect, getAllPostsForPageEffect, posts } from './app/models/post.model.ts';
import { showErrorEffect } from './app/models/error.model.ts';
import { PostPreview } from './entity/post/PostPreview/PostPreview.tsx';

function App() {
    const [title, setTitle] = createSignal('');
    const [body, setBody] = createSignal('');
    const [error, setError] = createSignal('');
    const postList = useStore(posts);

    const submit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = function (event) {
        event.preventDefault();
        const titleError = validatePostTitle(title());

        if (titleError) {
            setError(titleError);
            return;
        }

        createPostEffect({
            title: title(),
            body: body(),
        })
            .then(() => setTitle(""))
            .then(() => setBody(""))
            .catch(showErrorEffect);
    };

    onMount(() => getAllPostsForPageEffect().catch(showErrorEffect));

    return (
        <main>
            <h1>Post-will</h1>
            <p>Page with many posts</p>
            <hr />
            <br />
            <br />
            <h2>Create post</h2>
            <form onSubmit={submit}>
                <Show when={error()}>
                    <div class={'error'}>{error()}</div>
                </Show>
                <Input
                    placeholder={'Title'}
                    name={'title'}
                    required
                    onInput={(event) => setTitle(event.target.value)}
                />
                <Input
                    placeholder={'Body'}
                    name={'body'}
                    required
                    onInput={(event) => setBody(event.target.value)}
                />
                <Button>Создать</Button>
            </form>
            <br />
            <br />
            <section>
                <h2>Posts</h2>
                <For each={postList()}>{(item) => <PostPreview post={item}/>}</For>
            </section>
        </main>
    );
}

export default App;
