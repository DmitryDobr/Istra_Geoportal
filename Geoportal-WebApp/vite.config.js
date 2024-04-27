import {
  defineConfig
} from 'vite';

export default {
  build: {
    rollupOptions: {
       input: {
          main: 'index.html',
          'about': 'about.html', // Add your additional pages here
       },
    },
 },
}
