import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        target: 'modules',
        lib: {
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['fastify'],
        },
    },
});
