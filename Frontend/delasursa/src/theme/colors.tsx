import type { PaletteOptions } from '@mui/material/styles';

export const colors = {
    darkGreen1: '#0C1A14',
    darkGreen2: '#13271E',
    lightGreen1: '#5FEE95',
    lightGreen2: '#4ADE80',
    lightGreen3: '#3BC76A',
    brown: '#5D4037',

    white1: '#F2F2F2',
    white2: '#BEBEBE',
} as const;

export const muiPalette: PaletteOptions = {
    primary: {
        main: colors.lightGreen2,
        light: colors.lightGreen1,
        dark: colors.lightGreen3,
        contrastText: colors.white1,
    },
    secondary: {
        main: colors.brown,
        contrastText: colors.white1,
    },
    background: {
        default: colors.darkGreen1,
        paper: colors.darkGreen2,
    },
    text: {
        primary: colors.white1,
        secondary: colors.white2,
    },
    divider: colors.white2,
};

