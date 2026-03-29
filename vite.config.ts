import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))

let apiChild: ChildProcess | null = null

function killContactApi() {
  if (apiChild && !apiChild.killed) {
    apiChild.kill('SIGTERM')
    apiChild = null
  }
}

/** Starts contact API on :8787 so /api/contact works when you run only `vite` (no second terminal). */
function contactApiDevPlugin(): import('vite').Plugin {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      killContactApi()
      const script = path.join(root, 'server', 'contact-api.mjs')
      apiChild = spawn(process.execPath, [script], {
        cwd: root,
        stdio: 'inherit',
        env: { ...process.env },
      })
      apiChild.on('exit', (code, signal) => {
        if (code && code !== 0 && signal !== 'SIGTERM') {
          console.warn(`[contact-api] exited with code ${code} signal ${signal ?? ''}`)
        }
      })

      const shutdown = () => {
        killContactApi()
      }
      server.httpServer?.once('close', shutdown)
      process.once('SIGINT', shutdown)
      process.once('SIGTERM', shutdown)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiDevPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
