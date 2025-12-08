import React from "react";
import {
    Box,
    Typography,
    Button,
    Chip,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { colors } from "../../theme/colors";

interface ProducerHeroSectionProps {
    producerName: string;
    location: string;
    coverImage: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    productCount: number;
    memberSince: string;
    categories: string[];
}

const HeroSection: React.FC<ProducerHeroSectionProps> = ({
    producerName,
    location,
    coverImage,
    avatar,
    rating,
    reviewCount,
    productCount,
    memberSince,
    categories,
}) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: colors.darkGreen1,
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "1400px",
                    height: "32rem",
                    borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
                    overflow: "hidden",
                }}
            >
                {/* Back button */}
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        zIndex: 3,
                        backgroundColor: `${colors.darkGreen2}cc`,
                        color: colors.white1,
                        "&:hover": { backgroundColor: colors.darkGreen2 },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                {/* Image */}
                <Box
                    component="img"
                    src={coverImage}
                    alt="Cover"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                {/* Strong gradient */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(12,24,16,0.6) 25%, rgba(12,24,16,0.9) 55%, rgba(12,24,16,0.98) 80%, rgba(12,24,16,1) 100%)",
                    }}
                />

                {/* Content overlay */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        gap: "1.5rem",
                        px: { xs: "1.5rem", md: "3rem" },
                        pb: { xs: "2.5rem", md: "3rem" },
                    }}
                >
                    {/* Top row: avatar + info + actions */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: { xs: "flex-start", md: "flex-end" },
                            gap: "1.5rem",
                        }}
                    >
                        {/* Avatar */}
                        <Box
                            component="img"
                            src={avatar}
                            alt={producerName}
                            sx={{
                                width: "10rem",
                                height: "10rem",
                                borderRadius: "1rem",
                                border: `2px solid ${colors.lightGreen1Transparent}`,
                                objectFit: "cover",
                            }}
                        />

                        {/* Info */}
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <Typography
                                variant="h2"
                            >
                                {producerName}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <LocationOnIcon sx={{ color: colors.white2, fontSize: "1.2rem" }} />
                                <Typography variant="body1" sx={{ color: colors.white2 }}>
                                    {location}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1.25rem",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <StarIcon sx={{ color: colors.lightGreen1, fontSize: "1.25rem" }} />
                                    <Typography variant="body1" sx={{ color: colors.white1 }}>
                                        {rating.toFixed(1)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: colors.white2 }}>
                                        ({reviewCount} recenzii)
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Inventory2OutlinedIcon sx={{ color: colors.lightGreen1, fontSize: "1.25rem" }} />
                                    <Typography variant="body1" sx={{ color: colors.white1 }}>
                                        {productCount} produse
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <CalendarTodayIcon sx={{ color: colors.lightGreen1, fontSize: "1.25rem" }} />
                                    <Typography variant="body1" sx={{ color: colors.white1 }}>
                                        Membru din {memberSince}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {categories.map((category, idx) => (
                                    <Chip
                                        key={idx}
                                        label={category}
                                        sx={{
                                            backgroundColor: `${colors.darkGreen1}aa`,
                                            color: colors.white2,
                                            border: `1px solid ${colors.lightGreen1Transparent}`,
                                            fontSize: "0.75rem",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Actions */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "row", md: "column" },
                                gap: "0.75rem",
                                alignItems: { xs: "stretch", md: "flex-end" },
                                width: { xs: "100%", md: "auto" },
                            }}
                        >

                            <Button
                                variant="outlined"
                                startIcon={<FavoriteBorderIcon />}
                                sx={{
                                    borderColor: colors.lightGreen1,
                                    color: colors.lightGreen1,
                                    px: "1rem",
                                    py: "0.5rem",
                                    borderRadius: "0.5rem",
                                    textTransform: "none",
                                    "&:hover": {
                                        borderColor: colors.lightGreen1,
                                        backgroundColor: `${colors.lightGreen1}15`,
                                    },
                                }}
                            >
                                ADAUGĂ LA FAVORITE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;