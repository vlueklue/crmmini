/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7c3aed',
                    dark: '#6d28d9',
                    light: '#a78bfa',
                },
                accent: '#f59e0b',
                secondary: '#f8fafc',
            }
        },
    },
    plugins: [],
}
