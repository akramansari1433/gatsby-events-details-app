/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                "main-text": "var(--text-main)",
                "secondary-text": "var(--text-secondary)",
                accent: "var(--accent)",
                "accent-secondary": "var(--accent-secondary)",
            },
        },
    },
    plugins: [],
};
