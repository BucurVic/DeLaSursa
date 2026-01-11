import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import GridViewUserProductCard from "../../components/GridViewUserProductCard.tsx";
import { colors } from "../../theme/colors.ts";

interface Product {
    id: string;
    image: string;
    title: string;
    category: string;
    unit: string;
    supplierLogo?: string;
    supplier: string;
    rating: number;
    reviewCount: number;
    price: number;
    currency?: string;
}

interface PopularProductsSectionProps {
    products: Product[];
    onAddToCart: (productId: string) => void;
}

const PopularProductsSection: React.FC<PopularProductsSectionProps> = ({
    products,
    onAddToCart
}) => {
    const navigate = useNavigate();

    // display only first 12 products
    const displayProducts = products.slice(0, 12);

    const handleViewAll = () => {
        navigate("/produse");
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
                backgroundColor: colors.darkGreen2,
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
                    PRODUSE POPULARE
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                        textAlign: "center"
                    }}
                >
                    Descoperă cele mai apreciate produse locale.
                </Typography>
            </Box>

            {/* products grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(6, 1fr)"
                    },
                    gap: "1.5rem"
                }}
            >
                {displayProducts.map((product) => (
                    <GridViewUserProductCard
                        key={product.id}
                        productId={product.id.toString()}
                        image={product.image}
                        title={product.title}
                        category={product.category}
                        unit={product.unit}
                        supplierLogo={product.supplierLogo}
                        supplier={product.supplier}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        price={product.price}
                        currency={"RON"}
                        onAddToCart={() => onAddToCart(product.id)}
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
                    "&:hover": {
                        border: `1px solid ${colors.lightGreen1}`,
                        backgroundColor: `${colors.lightGreen1Transparent}`
                    }
                }}
            >
                VEZI TOATE PRODUSELE
            </Button>
        </Box>
    );
};

export default PopularProductsSection;