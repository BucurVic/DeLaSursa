import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../theme/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: colors.darkGreen2,
                display: "flex",
                justifyContent: "center",
                px: { xs: "1.5rem", md: "4rem", lg: "6rem" },
                padding: "4rem 8rem"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "80rem",
                    backgroundColor: colors.darkGreen1,
                    border: `1px solid ${colors.lightGreen1Transparent}`,
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                    px: { xs: "1rem", md: "2rem" },
                    py: { xs: "1.5rem", md: "2rem" },
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: colors.white1
                    }}
                >
                    ALĂTURĂ-TE COMUNITĂȚII DE LA SURSĂ
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                    }}
                >
                    Devino parte din rețeaua noastră de producători locali și ajută-ne să aducem produse autentice direct de la sursă, către oamenii care apreciază calitatea.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <PrimaryButton text="DEVINO PRODUCĂTOR" onClick={() => { navigate("/become-producer"); }} />
                    <SecondaryButton text="PRODUCĂTORII NOȘTRI" onClick={() => { navigate("/producers"); }} />
                </Box>
            </Box>
        </Box>
    );
};

export default CTASection;