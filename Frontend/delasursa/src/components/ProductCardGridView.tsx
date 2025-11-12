import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { colors } from "../theme/colors.ts";
import EditButton from "./buttonsProductView/EditButton";
import DeactivateButton from "./buttonsProductView/DeactivateButton";
import DeleteButton from "./buttonsProductView/DeleteButton";

interface ProductCardGridViewProps {
    image: string;
    title: string;
    category: string;
    price: number;
    unit: string;
    onEdit?: () => void;
    onDeactivate?: () => void;
    onDelete?: () => void;
}

const ProductCardGridView: React.FC<ProductCardGridViewProps> = ({
                                                                     image,
                                                                     title,
                                                                     category,
                                                                     price,
                                                                     unit,
                                                                     onEdit,
                                                                     onDeactivate,
                                                                     onDelete,
                                                                 }) => {
    return (
        <Card
            sx={{
                backgroundColor: colors.darkGreen2,
                borderRadius: "1rem",
                border: `1px solid ${colors.lightGreen1Transparent}`,
                color: colors.white1,
                width: 400,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 0 25px rgba(95, 238, 149, 0.15)",
                },
            }}
        >
            {/* Imagine produs */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    height: 190,
                    objectFit: "cover",
                }}
            />

            {/* Conținut */}
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.2, px: 2 }}>
                {/* Titlu și categorie */}
                <Box textAlign="left">
                    <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: colors.white1 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: colors.white2, fontSize: "0.9rem" }}>{category}</Typography>
                </Box>

                {/* Preț și unitate */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>{price} lei</Typography>
                    <Box
                        sx={{
                            backgroundColor: colors.lightGreen1Transparent,
                            borderRadius: "0.4rem",
                            px: 0.8,
                            py: 0.8,
                            color: colors.white1,
                            fontSize: "0.85rem",
                        }}
                    >
                        {unit}
                    </Box>
                </Box>

                {/* Linie separatoare */}
                <Box
                    sx={{
                        borderTop: `1px solid ${colors.lightGreen1Transparent}`,
                        my: 1,
                    }}
                />

                {/* Butoane */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {/* Editează */}
                    <EditButton onClick={onEdit} />
                    {/* Dezactivează + Șterge */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <DeactivateButton onClick={onDeactivate} fullWidth />
                        <DeleteButton onClick={onDelete} fullWidth />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardGridView;