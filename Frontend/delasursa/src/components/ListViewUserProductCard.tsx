import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography
} from "@mui/material";
import { ShoppingCartOutlined, LocationOnOutlined } from "@mui/icons-material";
import { colors } from "../theme/colors";

interface ListViewUserProductCardProps {
    image: string;
    title: string;
    category: string;
    unit: string;
    supplierRegion: string;
    supplierLogo?: string;
    supplier: string;
    rating: number;
    reviewCount: number;
    price: number;
    currency?: string;
    onAddToCart: () => void;
}

const ListViewUserProductCard: React.FC<ListViewUserProductCardProps> = ({
    image,
    title,
    category,
    unit,
    supplierRegion,
    supplierLogo,
    supplier,
    rating,
    reviewCount,
    price,
    currency = "lei",
    onAddToCart
}) => {
    return (
        <Card
            sx={{
                height: "13rem",
                width: "100%",
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                borderRadius: "0.8rem",
                border: `0.5px solid ${colors.lightGreen1Transparent}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "row"
            }}
        >

            {/* image */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    width: "13rem",
                    backgroundColor: colors.white2,
                    objectFit: "cover"
                }}
            />

            {/* content */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.13rem", // 1% of content height
                    "&.MuiCardContent-root": {
                        padding: "0.85rem"
                    },
                    "&.MuiCardContent-root:last-child": {
                        paddingBottom: "0"
                    }
                }}
            >

                {/* title */}
                <Box
                    sx={{
                        height: "1.95rem", // 15% of content height
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: colors.white1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "left"
                        }}
                    >
                        {title}
                    </Typography>
                </Box>

                {/* category, unit and supplier region */}
                <Box
                    sx={{
                        height: "1.95rem", // 15% of content height
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
                        {category} • {unit} • <LocationOnOutlined sx={{ fontSize: "0.9rem" }} /> {supplierRegion}
                    </Typography>
                </Box>

                {/* supplier logo and supplier */}
                <Box
                    sx={{
                        height: "1.95rem", // 15% of content height
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
                            textAlign: "left"
                        }}
                    >
                        {supplier}
                    </Typography>
                </Box>

                {/* rating and review count */}
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

                {/* price and button */}
                <Box
                    sx={{
                        flex: 1,
                        borderTop: `0.5px solid ${colors.lightGreen1Transparent}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >

                    {/* price and currency */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: colors.white1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "left"
                        }}
                    >
                        {price} {currency}
                    </Typography>

                    {/* add to cart button */}
                    <Button
                        variant="contained"
                        startIcon={<ShoppingCartOutlined />}
                        onClick={onAddToCart}
                        sx={{
                            backgroundColor: colors.lightGreen1,
                            color: colors.darkGreen1,
                            borderRadius: "0.6rem",
                            "&:hover": {
                                backgroundColor: colors.lightGreen2
                            }
                        }}
                    >
                        ADAUGĂ ÎN COȘ
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListViewUserProductCard;