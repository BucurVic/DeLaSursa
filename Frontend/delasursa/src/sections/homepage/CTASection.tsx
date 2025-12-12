import React, { useContext, useState } from "react"; // 1. Importam hook-urile necesare
import { Box, Typography } from "@mui/material";
import { colors } from "../../theme";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

// 2. Importăm AuthContext și Modalul
import { AuthContext } from "../../context/AuthContext";
import { RoleWarningModal } from "../../components/RoleWarningModal";

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    // 3. Extragem datele utilizatorului
    const { isAuthenticated, user } = useContext(AuthContext);

    // 4. State pentru modal
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [detectedRole, setDetectedRole] = useState<string | null>(null);

    // 5. Handler-ul inteligent
    const handleBecomeProducerClick = () => {
        if (isAuthenticated && user) {
            // Normalizăm rolurile (poate fi string sau array, depinde de backend)
            const userRoles = Array.isArray(user.role) ? user.role : [user.role];

            if (userRoles.includes('ADMIN')) {
                setDetectedRole('Admin');
                setIsWarningOpen(true);
                return;
            }

            if (userRoles.includes('PRODUCATOR')) {
                setDetectedRole('Producător');
                setIsWarningOpen(true);
                return;
            }
        }

        // Dacă nu sunt restricții, navigăm la pagina de formular
        navigate("/become-producer");
    };

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
                    <PrimaryButton
                        text="DEVINO PRODUCĂTOR"
                        onClick={handleBecomeProducerClick}
                    />

                    <SecondaryButton
                        text="PRODUCĂTORII NOȘTRI"
                        onClick={() => { navigate("/producers"); }}
                    />
                </Box>
            </Box>

            <RoleWarningModal
                open={isWarningOpen}
                onClose={() => setIsWarningOpen(false)}
                roleName={detectedRole}
            />
        </Box>
    );
};

export default CTASection;