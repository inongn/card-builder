import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

import { bundle } from './scripts/bundleData.js'

// Run once on startup
bundle();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'yaml-manager',
      handleHotUpdate({ file, server }) {
        if (file.includes('/data/') && (file.endsWith('.yml') || file.endsWith('.yaml'))) {
          // Rebundle on any yaml change
          bundle();

          const content = fs.readFileSync(file, 'utf8');
          server.ws.send({
            type: 'custom',
            event: 'yaml-update',
            data: {
              path: file,
              content: content
            }
          });
          return [];
        }
      }
    }
  ],
  server: {
    watch: {
      ignored: ['!**/data/**']
    }
  }
})
