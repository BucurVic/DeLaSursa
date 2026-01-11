import React, { useContext, useState } from "react"; // 1. Adaugat useContext, useState
import { Box, Container, Grid, Paper, Typography, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../../components/SearchBar";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { colors } from "../../theme/colors";
import { textResources } from "../../theme/textResources";
import { useNavigate } from "react-router-dom";

// 2. Importăm Contextul și Modalul (Asigură-te că calea către RoleWarningModal e corectă)
import { AuthContext } from "../../context/AuthContext";
import { RoleWarningModal } from "../../components/RoleWarningModal";

const IMAGES = [
    "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGZyZXNoJTIwcHJvZHVjZXxlbnwxfHx8fDE3NjE3MTk2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080'",
    "https://images.unsplash.com/photo-1757564622489-2ba8185a0ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwbWFya2V0JTIwZnJ1aXRzJTIwYmFza2V0fGVufDF8fHx8MTc2MTc0MDUxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1744659747310-39564f92c25b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwZ2FyZGVuJTIwb3JnYW5pY3xlbnwxfHx8fDE3NjE3NDA1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1756361946794-d7976ff5f765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjBlZ2dzJTIwZGFpcnl8ZW58MXx8fHwxNzYxNzQwNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
];

export default function HeroSection() {
    const theme = useTheme();
    const navigate = useNavigate();
    const hero = textResources.hero;
    const [query, setQuery] = React.useState<string>("");

    // 3. EXTRAGEM CONTEXTUL DE AUTH
    const { isAuthenticated, user } = useContext(AuthContext);

    // 4. STATE PENTRU MODAL
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [detectedRole, setDetectedRole] = useState<string | null>(null);

    // 5. FUNCȚIA DE VERIFICARE (Handler Click)
    const handleBecomeProducerClick = () => {
        if (isAuthenticated && user) {
            // Verificăm dacă rolurile vin ca array sau string și le normalizăm
            const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];

            if (userRoles.includes('ADMIN')) {
                setDetectedRole('Admin');
                setIsWarningOpen(true); // Deschidem modalul PESTE HeroSection
                return; // Oprim navigarea
            }

            if (userRoles.includes('PRODUCATOR')) {
                setDetectedRole('Producător');
                setIsWarningOpen(true); // Deschidem modalul PESTE HeroSection
                return; // Oprim navigarea
            }
        }

        // Dacă nu are restricții (e Client sau Nelogat), navigăm normal
        navigate("/become-producer");
    };

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                width: "100%",
                padding: "4rem 8rem"
            }}
        >
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center" justifyContent="center">
                    <Grid item component="div" xs={12} sm={9} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 2, sm: 3, md: 3 },
                                alignItems: { xs: "center", sm: "center", md: "flex-start" },
                                justifyContent: { xs: "center", sm: "center", md: "flex-start" },
                                textAlign: { xs: "center", sm: "center", md: "left" },
                                px: { xs: "1rem", sm: "2rem", md: "0rem" },
                                mx: { xs: "auto", md: 0 },
                                maxWidth: { xs: "100%", sm: "720px", md: "none" },
                            }}
                        ><Fade in>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    fontSize: { xs: "1.75rem", md: "3rem" },
                                    maxWidth: { xs: "100%", md: "36rem" },
                                }}
                            >
                                {hero.title}
                            </Typography>
                        </Fade>

                            <Fade in>
                                <Typography variant="body1" >
                                    {textResources.hero.title}
                                </Typography>
                            </Fade>

                            <Fade in>
                                <Box sx={{ mt: { xs: 1, md: 2 }, width: "100%", maxWidth: { xs: "100%", md: "56ch" } }}>
                                    <SearchBar placeholder={hero.searchPlaceholder} value={query} onChange={setQuery} backgroundColor={colors.darkGreen2} />
                                </Box>
                            </Fade>

                            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, mt: { xs: 1.5, md: 2 } }}>
                                <PrimaryButton
                                    text={hero.ctaPrimary}
                                    onClick={() => navigate("/produse")}
                                />

                                {/* 6. MODIFICAT: Folosim handler-ul nostru în loc de navigate direct */}
                                <SecondaryButton
                                    text={hero.ctaSecondary}
                                    onClick={handleBecomeProducerClick}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "center", md: "flex-end" },
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: 300,
                                        sm: 340,
                                        md: 360,
                                        lg: 440,
                                    },
                                    maxWidth: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: { xs: 1.25, sm: 1.75, md: 2.25 },
                                        alignItems: "start",
                                    }}
                                >
                                    {IMAGES.map((src, i) => (
                                        <Fade in key={src} style={{ transitionDelay: `${120 + i * 60}ms` }}>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    borderRadius: { xs: "0.6rem", sm: "0.75rem", md: "1rem" },
                                                    width: "100%",
                                                    aspectRatio: "1 / 1",
                                                    transition: "transform .24s ease, box-shadow .24s ease",

                                                    mt: {
                                                        xs: 0,
                                                        sm: 0,
                                                        md: i % 2 === 0 ? "-6%" : "6%",
                                                    },

                                                    "&:hover": {
                                                        transform: "translateY(-4px) scale(1.03)",
                                                        boxShadow: theme.shadows[8],
                                                    },
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={src}
                                                    alt={`product-${i}`}
                                                    loading="lazy"
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Paper>
                                        </Fade>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <RoleWarningModal
                    open={isWarningOpen}
                    onClose={() => setIsWarningOpen(false)}
                    roleName={detectedRole}
                />
            </Container>
        </Box>
    );
}