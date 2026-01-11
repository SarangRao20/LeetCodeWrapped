/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                'text-primary': "var(--color-text-primary)",
                'text-secondary': "var(--color-text-secondary)",
                'text-muted': "var(--color-text-muted)",
                accent: {
                    cyan: "var(--accent-cyan)",
                    purple: "var(--accent-purple)",
                    pink: "var(--accent-pink)",
                    blue: "#0047ff"
                },
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 247, 255, 0.2), 0 0 10px rgba(0, 247, 255, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 247, 255, 0.6), 0 0 40px rgba(188, 19, 254, 0.4)' },
                }
            }
        },
    },
    plugins: [],
}
