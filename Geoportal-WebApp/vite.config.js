import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, './app')

export default defineConfig( {
   appType: 'mpa',

   resolve: {
      alias: {
         '@': resolve(__dirname, 'app'),
      },
   },

   root,

   build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
         input: {
            main: resolve(root, 'index.html'),
            teplosnabzhenie: resolve(root, 'teplosnabzhenie/index.html'), // Add your additional pages here
            vodosnabzhenie: resolve(root, 'vodosnabzhenie/index.html'), // Add your additional pages here
            electrosnabzhenie: resolve(root, 'electrosnabzhenie/index.html'), // Add your additional pages here
         },
      },
   },
})
