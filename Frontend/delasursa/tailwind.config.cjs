module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                darkGreen1: 'var(--color-darkGreen1)',
                darkGreen2: 'var(--color-darkGreen2)',
                lightGreen1: 'var(--color-lightGreen1)',
                lightGreen2: 'var(--color-lightGreen2)',
                lightGreen3: 'var(--color-lightGreen3)',
                brown: 'var(--color-brown)',
                white1: 'var(--color-white1)',
                white2: 'var(--color-white2)',
            },
            fontFamily: {
                sans: ['Manrope'],
            },
        },
    },
    plugins: [],
};