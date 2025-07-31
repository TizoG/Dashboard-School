
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-nunito)'],
            },
        },
    },
    plugins: [],
};
