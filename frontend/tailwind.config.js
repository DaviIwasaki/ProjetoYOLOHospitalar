/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-500': '#007BFF',
        'gray-50': '#F8F9FA',
        'gray-600': '#A6A6A6',
        'gray-800': '#333333',
        'red-500': '#E63946',
      },
    },
  },
  plugins: [],
}

