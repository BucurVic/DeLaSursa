import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import HeroSection from "../sections/homepage/HeroSection.tsx";
import PopularProductsSection from "../sections/homepage/PopularProductsSection.tsx";
import { colors } from "../theme/colors.ts";
import {produseApi} from "../api/produseApi.ts"
import type {Produs} from "../types/Produs.ts";

const HomePage: React.FC = () => {
    const [popularProducts, setPopularProducts] = useState<Produs[]>([]);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const res = await produseApi.getPopular(0, 6);
                const data = Array.isArray(res.data) ? res.data : res.data.content;
                setPopularProducts(data);
            } catch (err) {
                console.error("Eroare la încărcarea produselor populare:", err);
            }
        };

        fetchPopular();
    }, []);

    const handleAddToCart = (productId: string) => {
        console.log(`Adding product ${productId} to cart`);
    };

    return (
        <Box
            sx={{
                backgroundColor: colors.darkGreen1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            {/* hero section */}
            <HeroSection />

            {/* popular products section */}
            <PopularProductsSection
                products={popularProducts.map((p) => ({
                    id: p.id.toString(),
                    image: p.produsImagine
                        ? p.produsImagine
                        : "/images/default.jpg",
                    title: p.produsName,
                    category: p.categorie,
                    unit: p.unitate_masura ?? "",
                    supplierLogo: "",
                    supplier: p.producatorName,
                    rating: 5.0,
                    reviewCount: 0,
                    price: p.pret,
                    currency: "lei",
                }))}
                onAddToCart={handleAddToCart}
            />
        </Box>
    );
};

export default HomePage;