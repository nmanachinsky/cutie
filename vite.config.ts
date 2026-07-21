import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import type { Plugin, ResolvedConfig } from 'vite'

function phoneFrame(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'phone-frame',
    configResolved(c) {
      config = c
    },
    transformIndexHtml(html) {
      if (config.command !== 'serve') return

      return html.replace(
        '<div id="root"></div>',
        `<div id="phone-frame">
           <div class="phone-notch"></div>
           <div id="root"></div>
         </div>
         <style>
           body {
             margin: 0;
             min-height: 100vh;
             display: flex;
             align-items: center;
             justify-content: center;
             background: #1a1a2e;
             font-family: -apple-system, BlinkMacSystemFont, sans-serif;
           }
           #phone-frame {
             width: 390px;
             height: 844px;
             max-height: 95vh;
             border-radius: 44px;
             border: 8px solid #2a2a3e;
             box-shadow:
               0 0 0 2px #3a3a4e,
               0 25px 80px rgba(0,0,0,0.5),
               inset 0 0 0 2px #1a1a2e;
             overflow: hidden;
             position: relative;
             background: #000;
           }
           .phone-notch {
             position: absolute;
             top: 0;
             left: 50%;
             transform: translateX(-50%);
             width: 126px;
             height: 34px;
             background: #2a2a3e;
             border-radius: 0 0 20px 20px;
             z-index: 1000;
           }
           #root {
             width: 100%;
             height: 100%;
             overflow: auto;
           }
           @media (max-height: 900px) {
             #phone-frame {
               height: 90vh;
               border-radius: 32px;
               border-width: 6px;
             }
             .phone-notch {
               width: 100px;
               height: 26px;
             }
           }
         </style>`,
      )
    },
  }
}

export default defineConfig({
  base: '/cutie/',
  plugins: [
    react(),
    phoneFrame(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Облачное утро',
        short_name: 'Облачное утро',
        description: 'Интерактивная новелла с ветвящимся сюжетом',
        theme_color: '#6a9bea',
        background_color: '#eaf3fc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icon.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
})
