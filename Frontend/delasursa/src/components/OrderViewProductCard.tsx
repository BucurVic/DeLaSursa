import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography
} from "@mui/material";
import {LocationOnOutlined} from "@mui/icons-material";
import {colors, textResources} from "../theme";
import { useNavigate } from "react-router-dom";
import React from "react";

interface OrderViewClientProductCardProps {
    productId: string;
    image: string;
    title: string;
    category: string;
    quantity: number;
    unit: string;
    supplierRegion: string;
    supplierLogo?: string;
    supplier: string;
    price: number;
    currency?: string;
    onAddReview:()=>void;
}

const OrderViewProductCard: React.FC<OrderViewClientProductCardProps> = ({
                                                                             productId,
                                                                             image,
                                                                             title,
                                                                             category,
                                                                             quantity,
                                                                             unit,
                                                                             supplierRegion,
                                                                             supplierLogo,
                                                                             supplier,
                                                                             price,
                                                                             currency = "lei",
                                                                             onAddReview,
                                                                         }) => {
    const navigate = useNavigate();
    const tr=textResources.orders;

    return (
        <Card
            onClick={() => navigate(`/product/${productId}`)}
            sx={{
                width: "100%",
                height: { xs: "auto", sm: "13rem" },
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                borderRadius: "0.8rem",
                border: `0.5px solid ${colors.lightGreen1Transparent}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "1rem",
                cursor: "pointer",
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    width: { xs: "100%", sm: "13rem" },
                    height: { xs: "auto", sm: "13rem" },
                    backgroundColor: colors.white2,
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />

            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.13rem",
                    "&.MuiCardContent-root": {
                        padding: "0.85rem"
                    },
                }}
            >
                <Box
                    sx={{
                        height: { xs: "auto", sm: "1.95rem" },
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: colors.white1,
                            overflow: "hidden",
                            whiteSpace: { xs: "normal", sm: "nowrap" },
                            textOverflow: "ellipsis",
                            textAlign: "left"
                        }}
                    >
                        {title}
                    </Typography>
                </Box>


                <Box
                    sx={{
                        height: { xs: "auto", sm: "1.95rem" },
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.white2,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "left"
                        }}
                    >
                        {category} • {quantity} {unit} • <LocationOnOutlined sx={{ fontSize: "0.9rem" }} /> {supplierRegion}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: { xs: "auto", sm: "1.95rem" },
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {supplierLogo && (
                        <Box
                            component="img"
                            src={supplierLogo}
                            alt={supplier}
                            sx={{
                                height: "1.5rem",
                                width: "1.5rem",
                                borderRadius: "50%",
                                marginRight: "0.39rem"
                            }}
                        />
                    )}
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.white2,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign:"left"
                        }}
                    >
                        {supplier}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: { xs: "auto", sm: "1.95rem" },
                        display: "flex",
                        alignItems: "center"
                    }}
                />

                <Box
                    sx={{
                        marginTop: "auto",
                        borderTop: `0.5px solid ${colors.lightGreen1Transparent}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0.5rem",
                    }}
                >
                    <Typography variant="h6" sx={{ color: colors.white1 }}>
                        {price} {currency}
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Rating />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddReview();
                        }}
                        sx={{
                            backgroundColor: colors.lightGreen1,
                            color: colors.darkGreen1,
                            borderRadius: "0.6rem",
                            "&:hover": { backgroundColor: colors.lightGreen2 },
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                        }}
                    >
                        {tr.addReview}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OrderViewProductCard;