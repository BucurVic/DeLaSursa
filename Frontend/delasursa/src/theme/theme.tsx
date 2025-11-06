import { createTheme } from '@mui/material/styles';
import { muiPalette } from './colors';
import typography from './typography';

const theme = createTheme({
    palette: muiPalette,
    typography,
});

export default theme;