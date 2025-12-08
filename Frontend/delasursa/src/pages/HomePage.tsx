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
import TopProducersSection from "../sections/homepage/TopProducersSection.tsx";

const HomePage: React.FC = () => {

    const [popularProducts, setPopularProducts] = useState<Produs[]>([]);
    const { addItem } = useCart();

    // mock data - replace with actual API call
    const mockProducers = [
        {
            producerId: '1',
            coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            logo: 'https://farmland.org/images/2023_collins_farm_0006.jpg',
            name: 'Ferma Verde',
            location: 'Brașov, România',
            category: 'Legume & Fructe',
            rating: 4.9,
            productCount: 24,
            description: 'Fermă organică de familie cu tradiție de peste 30 de ani în cultivarea legumelor și fructelor.'
        },
        {
            producerId: '2',
            coverImage: 'https://hillfarmrealfood.co.uk/cdn/shop/files/30_eggs_1.jpg?v=1749138750&width=1445',
            logo: 'https://media.istockphoto.com/id/1325263673/photo/worker-with-eggs-in-poultry-farm.jpg?s=612x612&w=0&k=20&c=Qssh5kVe4A7G5MgB-cu1H6H5bDc-45DZElwdALe2jvU=',
            name: 'Gospodăria Avicola',
            location: 'Cluj-Napoca, România',
            category: 'Lactate & Ouă',
            rating: 5.0,
            productCount: 15,
            description: 'Ouă proaspete de la găini crescute liber în curte. Grijă și atenție pentru fiecare pasăre.'
        },
        {
            producerId: '3',
            coverImage: 'https://t4.ftcdn.net/jpg/02/21/34/43/360_F_221344370_divU4PPEj49VhfthdlnAxA3rD3TAzuZT.jpg',
            logo: 'https://media.istockphoto.com/id/1297005860/photo/raw-milk-being-poured-into-container.jpg?s=612x612&w=0&k=20&c=5Xumh49_zYs9GjLkGpZXM41tS17K8M-svN9jLMv0JpE=',
            name: 'Lactate Tradiționale',
            location: 'Sibiu, România',
            category: 'Lactate & Ouă',
            rating: 4.8,
            productCount: 32,
            description: 'Iaurt, brânză și lapte de la vaci crescute natural în zona Sibiului.'
        },
        {
            producerId: '4',
            coverImage: 'https://media.istockphoto.com/id/178850019/photo/beekeeper-lifting-a-tray-out-of-a-beehive.jpg?s=612x612&w=0&k=20&c=Zjv053d2Iec5KxpOpITUBCAqvNcapvOYu13tykkcJ58=',
            logo: 'https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg?cs=srgb&dl=pexels-pixabay-33260.jpg&fm=jpg',
            name: 'Apicultura Montana',
            location: 'Bucegi, România',
            category: 'Miere',
            rating: 5.0,
            productCount: 12,
            description: 'Miere pură de munte din Bucegi. Stupine plasate pentru cea mai bună calitate.'
        },
        {
            producerId: '5',
            coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
            logo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
            name: 'Brutăria Artizanală',
            location: 'București, România',
            category: 'Panificație',
            rating: 4.7,
            productCount: 28,
            description: 'Pâine artizanală făcută manual. Copt proaspăt în fiecare zi.'
        },
        {
            producerId: '6',
            coverImage: 'https://www.camelactive.com/media/f5/a0/ce/1682402635/camel-active_blog-foodforest_09.jpg',
            logo: 'https://cdn.mos.cms.futurecdn.net/v2/t:150,l:0,cw:1600,ch:900,q:80,w:1600/tKQfMYzzgTpJHD2oQY8M9H.jpg',
            name: 'Cules de Munte',
            location: 'Maramureș, România',
            category: 'Fructe & Conserve',
            rating: 4.5,
            productCount: 18,
            description: 'Fructe de pădure și conserve artizanale din Maramureș. Produse naturale 100%.'
        }
    ];

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

            {/* top producers section */}
            <TopProducersSection
                producers={mockProducers}
            />

            <CTASection />
            <StatsSection />
            <ReviewsSection />
            <FaqSection />

        </Box>
    );
};

export default HomePage;