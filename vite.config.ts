import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/Repo-Wars',
  plugins: [ react() ],
  resolve: { alias: { 'node-fetch' : 'axios' } },
    /*define: {
global: {}, 
},*/
})
