import { defineConfig } from 'vite'
import * as path from 'node:path';
import * as fs from 'node:fs';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ideas: path.resolve(__dirname, 'src/pages/ideas/index.html'),
      },
    },
  },
  plugins: [
    {
      name: 'rewrite-ideas',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/ideas')) {
            const filePath = path.resolve(__dirname, 'src/pages/ideas/index.html')
            const html = fs.readFileSync(filePath, 'utf-8')
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
            return
          }
          next()
        })
      },
    },
  ],
})
