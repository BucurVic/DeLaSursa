import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import HeroSection from "../sections/homepage/HeroSection.tsx";
import { colors } from "../theme/colors.ts";

const HomePage: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: colors.darkGreen1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem"
            }}
        >

            {/* hero section */}
            <HeroSection />
        </Box>
    );
};

export default HomePage;