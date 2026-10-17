import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// URL pública do site, usada nas tags Open Graph (precisam de endereço absoluto).
// Ordem: VITE_SITE_URL (.env ou painel da Vercel) > domínio de produção da Vercel > localhost
function siteUrl(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  const url =
    env.VITE_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:5173'
  return url.replace(/\/+$/, '')
}

function siteUrlPlugin(url: string): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrlPlugin(siteUrl(mode))],
}))
