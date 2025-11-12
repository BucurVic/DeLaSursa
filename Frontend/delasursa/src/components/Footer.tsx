import { Box, Typography, Link, IconButton, Stack, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";

import { colors } from "../theme/colors.ts";
import { textResources } from "../theme/textResources.ts";
import logoSrc from '../assets/logo.png'; // Asigură-te că ai salvat logo.png în src/assets/

export default function Footer() {
    const { footer } = textResources;

    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                backgroundColor: colors.darkGreen1,
                color: colors.white2,
                pt: "4rem",
                pb: "2rem",
                borderTop: `1px solid ${colors.lightGreen1Transparent}`,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: "1rem", sm: "1rem", md: "2rem" },
                }}
            >
                <Grid
                    container
                    // Am eliminat 'spacing' și 'gap' pentru a folosi 'justifyContent'
                    sx={{
                        alignItems: "flex-start",
                        // --- MODIFICAREA CHEIE ---
                        // Distribuie coloanele pe toată lățimea
                        justifyContent: "space-between" 
                    }}
                >

                    {/* === COLOANA 1: Categorii === */}
                    {/* Am scos 'sm' și 'md' pentru a lăsa 'justifyContent' să decidă spațierea */}
                    <Grid > 
                        <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: colors.lightGreen1, mb: "1.25rem" }}>
                            {footer.columns.categoriesTitle}
                        </Typography>
                        <Stack sx={{ gap: "0.75rem" }}>
                            {footer.columns.categories.map((item) => (
                                <Link
                                    key={item}
                                    underline="none"
                                    href="#"
                                    sx={{ fontSize: "0.9rem", fontWeight: 400, color: colors.white2, "&:hover": { color: colors.lightGreen2 } }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* === COLOANA 2: DeLaSursă === */}
                    <Grid > 
                        <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: colors.lightGreen1, mb: "1.25rem" }}>
                            {footer.columns.companyTitle}
                        </Typography>
                        <Stack sx={{ gap: "0.75rem" }}>
                            {footer.columns.company.map((item) => (
                                <Link
                                    key={item}
                                    underline="none"
                                    href="#"
                                    sx={{ fontSize: "0.9rem", fontWeight: 400, color: colors.white2, "&:hover": { color: colors.lightGreen2 } }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* === COLOANA 3: Suport === */}
                    <Grid > 
                        <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: colors.lightGreen1, mb: "1.25rem" }}>
                            {footer.columns.supportTitle}
                        </Typography>
                        <Stack sx={{ gap: "0.75rem" }}>
                            {footer.columns.support.map((item) => (
                                <Link
                                    key={item}
                                    underline="none"
                                    href="#"
                                    sx={{ fontSize: "0.9rem", fontWeight: 400, color: colors.white2, "&:hover": { color: colors.lightGreen2 } }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* === COLOANA 4: Urmărește-ne! === */}
                    <Grid > 
                        {/* Cutie Flex pentru a alinia logo-ul și titlul */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: "1.25rem" }}>
                            <Box
                              component="img"
                              src={logoSrc}
                              alt="DeLaSursa Logo"
                              sx={{ 
                                width: 32, 
                                height: 32, 
                              }}
                            />
                            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: colors.lightGreen1 }}>
                                {footer.columns.followTitle}
                            </Typography>
                        </Box>

                        {/* Iconițele Social Media */}
                        <Stack direction="row" sx={{ gap: "0.75rem", mb: "1.25rem", flexWrap: "wrap" }}>
                            {[FacebookOutlined, Instagram, LinkedIn].map((Icon, i) => (
                                <IconButton
                                    key={i}
                                    sx={{
                                        color: colors.lightGreen3,
                                        border: `1px solid ${colors.darkGreen2}`,
                                        width: "2rem",
                                        height: "2rem",
                                        "&:hover": { 
                                            boxShadow: `0 10px 30px rgba(16,185,129,0.12), inset 0 1px 0 ${colors.lightGreen1Transparent}`,
                                            backgroundColor: "rgba(74,222,128,0.06)" },
                                    }}
                                >
                                    <Icon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            ))}
                        </Stack>

                        {/* Textul slogan */}
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 400, color: colors.white2, mb: "1rem" }}>
                            {footer.columns.followShort} 
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: `${colors.lightGreen1Transparent}`, my: "2rem" }} />
                <Typography sx={{ textAlign: "center", fontSize: "0.8rem", color: colors.white2 }}>
                    {footer.copyright}
                </Typography>
            </Container>
        </Box>
    );
}