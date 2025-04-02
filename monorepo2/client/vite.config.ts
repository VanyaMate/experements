import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solid()],
    define: {
        __API__: JSON.stringify('http://localhost:3000'),
    },
});
