import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dtsPlugin({ rollupTypes: true })],
    build: {
        target: 'esnext',
        lib: {
            entry: './src/index.ts',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
    },
});
