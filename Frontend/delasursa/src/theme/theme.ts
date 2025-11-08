import { createTheme } from '@mui/material/styles';
import { muiPalette } from './colors.ts';
import typography from './typography.ts';

const theme = createTheme({
    palette: muiPalette,
    typography,
});

export default theme;