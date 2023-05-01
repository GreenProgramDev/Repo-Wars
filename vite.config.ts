import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Repo-Wars',
  plugins: [ react() ],
  resolve: { alias: { 'node-fetch' : 'axios' } },
    /*define: {
global: {}, 
},*/
})
