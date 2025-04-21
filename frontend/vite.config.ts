import { UserConfig } from 'vite';
import path from 'path';

export default {
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        scribble: path.resolve('src/scribble/scribble.html'),
      },
      external: [
        'index.html',
        'src/scribble/scribble.html'
      ]
    },
  },
} satisfies UserConfig;
