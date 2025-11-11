import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../sections/homepage/HeroSection.tsx";
import PopularProductsSection from "../sections/homepage/PopularProductsSection.tsx";
import { colors } from "../theme/colors.ts";

const HomePage: React.FC = () => {
    // mock data - replace with actual API call
    const mockProducts = [
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
            title: "Roșii Cherry Bio",
            category: "Legume",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=150",
            supplier: "Ferma Verde",
            rating: 5.0,
            reviewCount: 187,
            price: 22,
            currency: "lei"
        },
        {
            id: "2",
            image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
            title: "Mere Ionathan",
            category: "Fructe",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=150",
            supplier: "Livada Naturală",
            rating: 5.0,
            reviewCount: 234,
            price: 15,
            currency: "lei"
        },
        {
            id: "3",
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
            title: "Iaurt Tradițional Natural",
            category: "Lactate & Ouă",
            unit: "500g",
            supplierLogo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150",
            supplier: "Lactate Tradiționale",
            rating: 5.0,
            reviewCount: 312,
            price: 8,
            currency: "lei"
        },
        {
            id: "4",
            image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
            title: "Cartofi Noi Bio",
            category: "Legume",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=150",
            supplier: "Ferma Verde",
            rating: 4.5,
            reviewCount: 156,
            price: 12,
            currency: "lei"
        },
        {
            id: "5",
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
            title: "Morcovi Bio Crocanti",
            category: "Legume",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150",
            supplier: "Gospodăria Organică",
            rating: 5.0,
            reviewCount: 201,
            price: 10,
            currency: "lei"
        },
        {
            id: "6",
            image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
            title: "Salată Verde Lollo Rossa",
            category: "Legume",
            unit: "1 buc",
            supplierLogo: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=150",
            supplier: "Grădina Proaspătă",
            rating: 5.0,
            reviewCount: 143,
            price: 6,
            currency: "lei"
        },
        {
            id: "7",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
            title: "Ardei Gras Colorat",
            category: "Legume",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=150",
            supplier: "Ferma Verde",
            rating: 4.5,
            reviewCount: 98,
            price: 18,
            currency: "lei"
        },
        {
            id: "8",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
            title: "Pâine Integrală",
            category: "Panificație",
            unit: "600g",
            supplierLogo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150",
            supplier: "Brutăria Tradițională",
            rating: 5.0,
            reviewCount: 223,
            price: 12,
            currency: "lei"
        },
        {
            id: "9",
            image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400",
            title: "Nuci Proaspete",
            category: "Fructe Uscate",
            unit: "500g",
            supplierLogo: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=150",
            supplier: "Pădurile României",
            rating: 4.5,
            reviewCount: 178,
            price: 32,
            currency: "lei"
        },
        {
            id: "10",
            image: "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=400",
            title: "Castraveți Murați",
            category: "Conserve",
            unit: "500g",
            supplierLogo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150",
            supplier: "Gospodăria Tradițională",
            rating: 5.0,
            reviewCount: 195,
            price: 14,
            currency: "lei"
        },
        {
            id: "11",
            image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
            title: "Ceapă Roșie Bio",
            category: "Legume",
            unit: "1kg",
            supplierLogo: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=150",
            supplier: "Ferma Verde",
            rating: 4.5,
            reviewCount: 112,
            price: 7,
            currency: "lei"
        },
        {
            id: "12",
            image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
            title: "Lapte Proaspăt de Vacă",
            category: "Lactate & Ouă",
            unit: "1L",
            supplierLogo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150",
            supplier: "Ferma de Munte",
            rating: 5.0,
            reviewCount: 289,
            price: 12,
            currency: "lei"
        }
    ];

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
                products={mockProducts}
                onAddToCart={handleAddToCart}
            />
        </Box>
    );
};

export default HomePage;