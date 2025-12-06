import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography
} from "@mui/material";
import {colors, textResources} from "../theme";
import React from "react";

interface ProducerOrderViewProductCardProps {
    productId: number;
    image: string;
    title: string;
    quantity: number;
    unit: string;
    price: number;
    currency?: string;
    rating:number;
    reviewCount:number;
}

const ProducerOrderViewProductCard: React.FC<ProducerOrderViewProductCardProps> = ({
                                                                                   productId,
                                                                                   image,
                                                                                   title,
                                                                                   quantity,
                                                                                   unit,
                                                                                   price,
                                                                                   currency,
                                                                                   rating,
                                                                                   reviewCount,
                                                                               }) => {
    const tr=textResources.orders;

    return (
        <Card
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
                        {quantity} {unit}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "1.95rem", // 15% of content height
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Rating
                        value={rating}
                        readOnly
                        size="small"
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: colors.lightGreen1
                            },
                            "& .MuiRating-iconEmpty": {
                                color: colors.lightGreen1
                            },
                            "& .MuiRating-icon": {
                                fontSize: "0.9rem"
                            }
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.white2,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "0.39rem",
                            textAlign: "left"
                        }}
                    >
                        {rating.toFixed(1)} ({reviewCount})
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

                </Box>
            </CardContent>
        </Card>
    );
};

export default ProducerOrderViewProductCard;