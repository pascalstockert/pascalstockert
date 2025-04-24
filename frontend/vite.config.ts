import { UserConfig } from 'vite';
import path from 'path';
import fs from 'fs';

function findHtmlEntries(dir: string, base = ''): Record<string, string> {
  const entries: Record<string, string> = {};

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);

    if (fs.statSync(fullPath).isDirectory()) {
      Object.assign(entries, findHtmlEntries(fullPath, relPath));
    } else if (file.endsWith('.html')) {
      const entryName = relPath.replace(/\.html$/, '');
      entries[entryName] = fullPath;
    }
  });

  return entries;
}

export default {
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...findHtmlEntries(path.resolve(__dirname, 'content')),
      },
    },
  },
} satisfies UserConfig;
