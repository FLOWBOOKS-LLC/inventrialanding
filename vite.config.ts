import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_CMS_PROXY_TARGET || 'http://localhost:42845'
  const basePath = (env.VITE_CMS_API_BASE_PATH || '/inventria_new').replace(/\/$/, '')

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5178,
      proxy: {
        // Site CMS + Remita payments → flowbooks_api (single backend)
        '/api/site': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => `${basePath}${p}`,
          configure: (proxyServer) => {
            proxyServer.on('proxyReq', (proxyReq) => {
              proxyReq.removeHeader('origin')
              proxyReq.removeHeader('referer')
            })
          },
        },
        '/api/payments': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => `${basePath}${p}`,
          configure: (proxyServer) => {
            proxyServer.on('proxyReq', (proxyReq) => {
              proxyReq.removeHeader('origin')
              proxyReq.removeHeader('referer')
            })
          },
        },
      },
    },
  }
})
