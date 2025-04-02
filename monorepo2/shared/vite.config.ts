import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dtsPlugin({
            outDir: 'dist',
            entryRoot: 'src',
            rollupTypes: true,
        }),
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'esnext',
        lib: {
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
            fileName: 'index',
        },
    },
});
