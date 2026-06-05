import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
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

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  
  // Build configuration for production
  build: {
    // Output directory
    outDir: 'dist',
    // Clear outDir before building
    emptyOutDir: true,
    // Source map for production (set to false to reduce bundle size)
    sourcemap: false,
    // Chunk size warning threshold (in kb)
    chunkSizeWarningLimit: 1000,
    // Minify with esbuild (default)
    minify: 'esbuild',
    // Rollup options for optimization
    rollupOptions: {
      output: {
        // Generate named chunks for better caching
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router',
          ],
          'ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-alert-dialog',
          ],
          'mui': [
            '@mui/material',
            '@mui/icons-material',
          ],
        },
      },
    },
  },
})

