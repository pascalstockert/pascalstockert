import { UserConfig } from 'vite';
import path from 'path';

export default {
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
} satisfies UserConfig;
