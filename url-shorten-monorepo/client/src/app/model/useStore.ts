import { Store } from '@vanyamate/sec';
import { useLayoutEffect, useState } from 'preact/hooks';

export const useStore = function <Data>(store: Store<Data>) {
    const [state, setState] = useState<Data>(store.get());
    useLayoutEffect(() => store.subscribe(() => setState(store.get())), []);
    return state;
};
