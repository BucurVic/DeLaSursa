import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';

import { createRoot } from 'react-dom/client'

import App from './App'
import {StyledEngineProvider, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/theme.ts";
import  {StrictMode} from "react";
import {NotifyProvider} from "./components/NotifyProvider.tsx";


document.fonts.load('1rem "Manrope"').then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <NotifyProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </StyledEngineProvider>
            </NotifyProvider>
        </StrictMode>
    );
});