import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        target: 'esnext',
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['fastify', 'node:fs'],
        },
    },
});
