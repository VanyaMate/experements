import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: './dist',
        lib: {
            fileName: 'index',
            entry: './src/index.ts',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['fastify', 'pg', 'dotenv'],
        },
    },
});
