import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { colors } from "../theme";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";

export interface BundleItem {
    name: string;
    quantity: string;
}

export interface BundleProps {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    items: BundleItem[];
    onAddToCart: (id: string) => void;
    viewMode?: "grid" | "list";
}

const BundleCard: React.FC<BundleProps> = ({
                                               id,
                                               title,
                                               price,
                                               currency,
                                               image,
                                               items,
                                               onAddToCart,
                                               viewMode = "grid"
                                           }) => {
    const isList = viewMode === "list";
    const ITEMS_TO_SHOW = 4;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/pachete/${id}`);
    };

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: isList ? "100%" : { xs: "20rem", md: "100%" },
                display: "flex",
                flexDirection: { xs: "column", md: isList ? "row" : "column" },
                bgcolor: colors.darkGreen1,
                color: colors.white1,
                borderRadius: "1rem",
                border: `1px solid ${colors.lightGreen1Transparent}`,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 10px 20px -5px rgba(0,0,0,0.3)`,
                    border: `1px solid ${colors.lightGreen1}`,
                },
                height: "100%"
            }}
            onClick={handleNavigate}
        >
            {/* --- ZONA IMAGINE --- */}
            <Box sx={{
                position: "relative",
                width: { xs: "100%", md: isList ? "300px" : "100%" },
                minWidth: { md: isList ? "300px" : "auto" },
                flexShrink: 0
            }}>
                <CardMedia
                    component="img"
                    height={isList ? "100%" : "140"}
                    image={image}
                    alt={title}
                    sx={{
                        objectFit: "cover",
                        height: { xs: "140px", md: isList ? "100%" : "140px" },
                    }}
                />
            </Box>

            {/* --- ZONA CONTINUT --- */}
            <CardContent sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                p: 3,
                width: "100%",
                justifyContent: "space-between"
            }}>
                {/* HEADER (Titlu & Preț) */}
                <Box sx={{
                    display: isList ? "flex" : "block",
                    justifyContent: "space-between",
                    gap: 2
                }}>
                    <Box sx={{ flex: isList ? 1 : "auto" }}>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: isList ? undefined : 2,
                                minHeight: isList ? 'auto' : '3.2rem',
                                lineHeight: 1.2
                            }}
                        >
                            {title}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                            <Typography variant="h5" fontWeight="bold" color={colors.lightGreen1}>
                                {price} {currency}
                            </Typography>
                            <Typography variant="body2" color={colors.white2}>
                                / livrare
                            </Typography>
                        </Box>

                        {isList && (
                            <Typography variant="body2" color={colors.white2} sx={{ mt: 1, opacity: 0.8 }}>
                                Pachet ideal pentru consum regulat. Livrare gratuită inclusă.
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* LISTA DE PRODUSE */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="subtitle2"
                        color={colors.lightGreen3}
                        sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}
                    >
                        CE CONȚINE COȘUL:
                    </Typography>

                    <Stack
                        direction={isList ? { xs: "column", md: "row" } : "column"}
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ gap: isList ? 3 : 1 }}
                    >
                        {items.slice(0, ITEMS_TO_SHOW).map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1,
                                    width: isList ? 'auto' : '100%'
                                }}
                            >
                                <CheckCircleOutlineIcon
                                    sx={{
                                        color: colors.lightGreen1,
                                        fontSize: "1.1rem",
                                        mt: 0.3
                                    }}
                                />
                                <Typography variant="body2" color={colors.white1} sx={{ lineHeight: 1.4 }}>
                                    <span style={{ fontWeight: "bold", color: colors.white2 }}>{item.quantity}</span> {item.name}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    {/* Items rămași */}
                    {items.length > ITEMS_TO_SHOW && (
                        <Typography variant="caption" sx={{ color: colors.white2, ml: 3, mt: 0.5, display: 'block' }}>
                            ...și încă {items.length - ITEMS_TO_SHOW} produse
                        </Typography>
                    )}

                    {!isList && (
                        <Divider
                            sx={{ borderColor: colors.lightGreen1Transparent, my: 1.5 }}
                        />
                    )}
                </Box>

                {/* BUTON ACTIUNE - ADAUGĂ ÎN COȘ */}
                <Box sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: isList ? "flex-end" : "stretch"
                }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCartOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(id);
                        }}
                        sx={{
                            height: "1.872rem",
                            backgroundColor: colors.lightGreen1,
                            color: colors.darkGreen1,
                            borderRadius: "0.6rem",
                            "&:hover": {
                                backgroundColor: colors.lightGreen2
                            }
                        }}
                    >
                        Adaugă în coș
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BundleCard;