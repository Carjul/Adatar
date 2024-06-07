// vite.config.js
import { defineConfig } from "file:///C:/Users/Carlos/Desktop/Adatar/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Carlos/Desktop/Adatar/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 3001,
    cors: true
  }
});
export {
  vite_config_default as default
};
