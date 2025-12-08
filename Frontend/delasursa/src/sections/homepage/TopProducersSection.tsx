import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import GridViewUserProducerCard from "../../components/GridViewUserProducerCard.tsx";
import { colors } from "../../theme/colors.ts";

interface Producer {
    producerId: string;
    coverImage: string;
    logo: string;
    name: string;
    location: string;
    category: string;
    rating: number;
    productCount: number;
    description: string;
}

interface TopProducersSectionProps {
    producers: Producer[];
}

const TopProducersSection: React.FC<TopProducersSectionProps> = ({
    producers
}) => {
    const navigate = useNavigate();

    // display only first 12 producers
    const displayProducers = producers.slice(0, 12);

    const handleViewAll = () => {
        navigate("/producers");
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
                width: "100%",
                padding: "4rem 8rem"
            }}
        >

            {/* title and subtitle */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: colors.white1,
                        textAlign: "center"
                    }}
                >
                    TOP PRODUCĂTORI
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                        textAlign: "center"
                    }}
                >
                    Oameni dedicați care aduc produse autentice, direct de la sursă.
                </Typography>
            </Box>

            {/* producers grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                        xl: "repeat(4, 1fr)"
                    },
                    gap: "1.5rem"
                }}
            >
                {displayProducers.map((producer) => (
                    <GridViewUserProducerCard
                        key={producer.producerId}
                        producerId={producer.producerId}
                        coverImage={producer.coverImage}
                        logo={producer.logo}
                        name={producer.name}
                        location={producer.location}
                        category={producer.category}
                        rating={producer.rating}
                        productCount={producer.productCount}
                        description={producer.description}
                    />
                ))}
            </Box>

            {/* view all button */}
            <Button
                variant="outlined"
                onClick={handleViewAll}
                sx={{
                    borderRadius: "0.6rem",
                    border: `1px solid ${colors.lightGreen1}`,
                    padding: "0.5rem 2rem",
                    color: colors.lightGreen1,
                    "&:hover": {
                        border: `1px solid ${colors.lightGreen1}`,
                        backgroundColor: `${colors.lightGreen1Transparent}`
                    }
                }}
            >
                VEZI TOȚI PRODUCĂTORII
            </Button>
        </Box>
    );
};

export default TopProducersSection;