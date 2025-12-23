/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},  // Pakai 'tailwindcss', BUKAN '@tailwindcss/postcss'
    autoprefixer: {}, // WAJIB ADA
  },
};

export default config;