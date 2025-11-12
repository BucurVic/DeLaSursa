import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Link,
    TextField,
    Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../theme/colors.ts";
import { textResources } from "../theme/textResources.ts";

// --- 1. Importăm noul logo ---
import logoSrc from '../assets/logo.png'; 

interface ForgotPasswordPageProps {
    onBack?: () => void;
    onSubmit?: (email: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
                                                                   onBack,
                                                                   onSubmit,
                                                               }) => {
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) onSubmit(email);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                fontFamily: '"Manrope", sans-serif',
            }}
        >
            <Card
                sx={{
                    position: "relative",
                    backgroundColor: colors.darkGreen2,
                    borderRadius: "1.25rem",
                    boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                    width: "100%",
                    maxWidth: 420,
                    p: 3,
                    textAlign: "center",
                }}
            >
                {/* ... (Butonul Back rămâne la fel) ... */}

                {/* --- 2. Logo Actualizat --- */}
                <Box sx={{ mt: 4, mb: 3 }}>
                    <img
                        src={logoSrc} // Am înlocuit calea
                        alt={textResources.forgotPasswordPage.logoAlt}
                        style={{ width: "72px", height: "72px" }}
                    />
                </Box>

                {/* ... (Restul formularului rămâne la fel) ... */}
                <Typography
                    sx={{
                        color: colors.white1,
                        fontWeight: 800,
                        fontSize: "2.25rem",
                        lineHeight: 1.15,
                        mb: 1.5,
                    }}
                >
                    {textResources.forgotPasswordPage.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 4, color: colors.white2 }}>
                    {textResources.forgotPasswordPage.rememberPassword}{" "}
                    <Link
                        href="/login"
                        underline="always"
                        sx={{
                            color: colors.lightGreen2,
                            fontWeight: 600,
                            textDecorationColor: colors.lightGreen2,
                            textUnderlineOffset: "2px",
                            transition: "color 0.2s ease",
                            "&:hover": {
                                color: "#42a5f5",
                                textDecorationColor: "#42a5f5",
                            },
                        }}
                    >
                        {textResources.forgotPasswordPage.loginLink}
                    </Link>
                </Typography>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                        px: 2,
                        pt: 0,
                        textAlign: "left",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {/* ... (Email și Butonul rămân la fel) ... */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: colors.white1,
                                    fontWeight: 600,
                                    mb: 0.8,
                                    fontSize: "0.9rem",
                                }}
                            >
                                {textResources.forgotPasswordPage.emailLabel}
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder={textResources.forgotPasswordPage.emailPlaceholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                InputProps={{
                                    sx: {
                                        color: colors.white1,
                                        backgroundColor: "transparent",
                                        borderRadius: "1rem",
                                        "& .MuiOutlinedInput-input": {
                                            py: 1.5,
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colors.lightGreen1Transparent,
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colors.lightGreen1,
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colors.lightGreen1,
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            color: colors.white2,
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: colors.lightGreen1,
                                color: colors.darkGreen2,
                                fontWeight: 800,
                                letterSpacing: "0.02em",
                                borderRadius: "1rem",
                                py: 1.6,
                                boxShadow: "0 6px 0 rgba(0,0,0,0.25)",
                                "&:hover": { backgroundColor: colors.lightGreen2 },
                            }}
                        >
                            {textResources.forgotPasswordPage.submitButton.toUpperCase()}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ForgotPasswordPage;