import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"

const fullReloadAlways = {
  handleHotUpdate({ server }) {
    // server.ws.send({ type: "full-reload" })
    // return []
  },
}

export default defineConfig({
  // server: {
  //   hmr: false,
  // },
  plugins: [
    fullReloadAlways,
    react(),
    svgr({
      exportAsDefault: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
