import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
                roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
