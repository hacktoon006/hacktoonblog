import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    port: 3000, // ✅ Just this — not nested
  },
  plugins: [react()],
});
