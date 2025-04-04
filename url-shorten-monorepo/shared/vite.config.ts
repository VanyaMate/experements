import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: './dist',
        lib: {
            fileName: 'index',
            formats: ['es', 'cjs'],
            entry: './src/index.ts',
        },
    },
    plugins: [dtsPlugin({ rollupTypes: true })],
});
