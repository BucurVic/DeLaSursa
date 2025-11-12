import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { colors } from "../theme/colors.ts";
import EditButton from "./buttonsProductView/EditButton";
import DeactivateButton from "./buttonsProductView/DeactivateButton";
import DeleteButton from "./buttonsProductView/DeleteButton";
import { typography } from "../theme/typography.ts";
import { textResources as tr } from "../theme/textResources.ts";

interface ProductCardGridViewProps {
    image: string;
    title: string;
    category: string;
    price: number;
    unit: string;
    active?: boolean;
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
                                                                     active = true,
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                height: "100%",
                minHeight: "34rem",
                width: "100%",
                boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-0.2rem)",
                    boxShadow: "0 0 25px rgba(95, 238, 149, 0.15)",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            {/* 🖼️ Imagine produs */}
            <Box sx={{ position: "relative", flexShrink: 0 }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                        height: "12rem",
                        width: "100%",
                        objectFit: "cover",
                        filter: active ? "none" : "grayscale(0.4) brightness(0.4)",
                        transition: "filter 0.3s ease",
                    }}
                />
                {!active && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography sx={{ ...typography.h5, color: colors.white1 }}>
                            {tr.productCard.inactiveLabel}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* 📦 Conținut card */}
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1.2rem",
                    px: "1.5rem",
                    py: "1.25rem",
                }}
            >
                {/* Titlu și categorie */}
                <Box
                    sx={{
                        minHeight: "3.6rem",
                        maxHeight: "3.6rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                    }}
                >
                    <Typography
                        sx={{
                            ...typography.h5,
                            color: colors.white1,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            ...typography.body2,
                            color: colors.white2,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {category}
                    </Typography>
                </Box>

                {/* Preț și unitate */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ ...typography.h5, fontWeight: 700 }}>
                        {price} {tr.productCard.priceSuffix}
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: colors.lightGreen1Transparent,
                            borderRadius: "0.4rem",
                            px: "0.6rem",
                            py: "0.4rem",
                            color: colors.white1,
                            ...typography.caption,
                        }}
                    >
                        {unit}
                    </Box>
                </Box>

                {/* Linie separatoare */}
                <Box
                    sx={{
                        borderTop: `1px solid ${colors.lightGreen1Transparent}`,
                        my: "0.5rem",
                    }}
                />

                {/* Butoane */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <EditButton onClick={onEdit}/>
                    <Box sx={{ display: "flex", gap: "0.8rem" }}>
                        <DeactivateButton onClick={onDeactivate} fullWidth>
                            {active
                                ? tr.productCard.buttons.deactivate
                                : tr.productCard.buttons.activate}
                        </DeactivateButton>
                        <DeleteButton onClick={onDelete}/>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardGridView;