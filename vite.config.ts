// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/science.challenge/',  // ← リポ名そのまま（末尾 / 必須）
})
