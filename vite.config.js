import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

import { VitePWA } from 'vite-plugin-pwa'

import { bundle } from './scripts/bundleData.js'

// Run once on startup
bundle();

// https://vite.dev/config/
export default defineConfig({
  base: '/card-builder/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'shield.svg', 'icon-512.svg', 'db.json'],
      manifest: {
        name: 'Aspida: D&D Character Sheet Generator',
        short_name: 'Aspida',
        description: 'D&D 5e Character Sheet and RPG Card Builder',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'any',
        scope: '/card-builder/',
        start_url: '/card-builder/',
        icons: [
          {
            src: 'shield.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}']
      }
    }),
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
