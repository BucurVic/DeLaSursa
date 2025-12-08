import React from "react";
import { Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReviewCard from "../../components/ReviewCard";
import { colors } from "../../theme/colors";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

const REVIEWS_DATA = [
    {
        id: "review-1",
        rating: 1,
        text:
            "Produsele sunt incredibil de prospete și de calitate! Am descoperit producători locali fantastici prin această platformă.",
        author: "Maria Popescu",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=80&h=80&fit=crop",
    },
    {
        id: "review-2",
        rating: 2,
        text: "Livrare rapidă și produse bio autentice. Recomand cu încredere DeLaSursă pentru cumpărături organice.",
        author: "Ion Georgescu",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop",
    },
    {
        id: "review-3",
        rating: 3,
        text:
            "Platformă excelentă pentru a găsi produse locale de calitate. Susțin producători locali și mânânc sănătos!",
        author: "Ana Dumitrescu",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1464674669159-0e2b5a93a270?w=80&h=80&fit=crop",
    },
    {
        id: "review-4",
        rating: 4,
        text: "Cea mai bună opțiune pentru cumpărături organice online. Produse proaspete și producători de încredere.",
        author: "Cristina Mihai",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1517746915202-e5b09eef6511?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=80&h=80&fit=crop",
    },
    {
        id: "review-5",
        rating: 2,
        text: "Serviciu excelent și produse de calitate premium. Sunt foarte mulțumit de experiența de cumpărare.",
        author: "David Ionescu",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop",
    },
    {
        id: "review-6",
        rating: 3,
        text: "Recomand fără rezerve! Produsele sunt proaspete și transportul este rapid și sigur.",
        author: "Elena Constantinescu",
        status: "Client verificat",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        productImage: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=80&h=80&fit=crop",
    },
];

const ReviewsSection: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const itemsPerView = isLgUp ? 3 : isMdUp ? 2 : 1;

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const maxIndex = Math.max(0, REVIEWS_DATA.length - itemsPerView);

    React.useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [itemsPerView, maxIndex]);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    const visibleReviews = REVIEWS_DATA.slice(currentIndex, currentIndex + itemsPerView);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
                backgroundColor: colors.darkGreen2,
                width: "100%",
                padding: "4rem 6rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: colors.white1,
                        textAlign: "center",
                    }}
                >
                    CE SPUN CLIENȚII NOȘTRI
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                        textAlign: "center",
                    }}
                >
                    Păreri reale de la cei care cumpără direct de la sursă.
                </Typography>
            </Box>

            <Box sx={{ width: "100%", maxWidth: "75rem" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                        },
                        gap: "1.5rem",
                        width: "100%",
                    }}
                >
                    {visibleReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            rating={review.rating}
                            text={review.text}
                            author={review.author}
                            status={review.status}
                            avatar={review.avatar}
                            productImage={review.productImage}
                        />
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        mt: "2rem",
                    }}
                >
                    <IconButton
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        sx={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            color: colors.lightGreen1,
                            transition: "all 0.2s ease",
                            "&:hover:not(:disabled)": {
                                borderColor: colors.lightGreen1,
                                backgroundColor: `${colors.lightGreen1}15`,
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        sx={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            color: colors.lightGreen1,
                            transition: "all 0.2s ease",
                            "&:hover:not(:disabled)": {
                                borderColor: colors.lightGreen1,
                                backgroundColor: `${colors.lightGreen1}15`,
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            </Box>
            <SecondaryButton
                text="LASĂ O RECENZIE"
                onClick={() => navigate("/leave-review")}
            />
        </Box>
    );
};

export default ReviewsSection;