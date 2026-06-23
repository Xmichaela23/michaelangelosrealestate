// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://michaelangelos.realestate',
  redirects: {
    '/_internal': '/internal',
  },
});
