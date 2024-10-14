import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tsConfigPaths(), svgr({ svgrOptions: { expandProps: 'end' } })],
  server: {
    host: '0.0.0.0', // Expose the server to external connections
    port: 5173, // Ensure the correct port is being used
  },
})
