import React, { useEffect, useState } from "react";

import { produseApi } from "../api/produseApi.ts"
import type { Produs } from "../types/Produs.ts";
import { useCart } from "../context/CartContext.tsx";
import { colors } from "../theme";
import Box from "@mui/material/Box";
import HeroSection from "../sections/homepage/HeroSection.tsx";
import PopularProductsSection from "../sections/homepage/PopularProductsSection.tsx";
import FaqSection from "../sections/homepage/FaqSection";
import StatsSection from "../sections/homepage/StatsSection.tsx";
import ReviewsSection from "../sections/homepage/ReviewsSection.tsx";
import CTASection from "../sections/homepage/CTASection.tsx";

const HomePage: React.FC = () => {

    const [popularProducts, setPopularProducts] = useState<Produs[]>([]);
    const { addItem } = useCart();

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

    const handleAddToCart = (product: Produs) => {
        addItem({
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        })
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
                    image: p.produsImagine ?? "/images/default.jpg",
                    title: p.produsName,
                    category: p.categorie,
                    unit: p.unitate_masura ?? "",
                    supplierLogo: "",
                    supplier: p.producatorName,
                    rating: 5,
                    reviewCount: 0,
                    price: p.pret,
                    currency: "lei"
                }))}
                onAddToCart={(productId: string) => {
                    const p = popularProducts.find(x => x.id.toString() === productId);
                    if (!p) return;
                    addItem({
                        id: p.id.toString(),
                        title: p.produsName,
                        price: p.pret,
                        image: p.produsImagine ?? "/images/default.jpg",
                        quantity: 1
                    });
                }}
            />
            <CTASection />
            <StatsSection />
            <ReviewsSection />
            <FaqSection />

        </Box>
    );
};

export default HomePage;