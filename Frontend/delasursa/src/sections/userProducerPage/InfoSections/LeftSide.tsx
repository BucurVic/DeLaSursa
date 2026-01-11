import React, { useState, useEffect } from "react";
import {Box, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {colors} from "../../../theme";
import GridViewUserProductCard from "../../../components/GridViewUserProductCard";
import ReviewCard from "../../../components/ReviewCard";
import BundleCard from "../../../components/BundleCard.tsx";
import { useCart } from "../../../context/CartContext.tsx";

import { pacheteApi  } from "../../../api/pacheteApi";

interface Product {
    productId: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    unit: string;
    discount?: number;
    supplier: string;
}

interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
    avatar: string;
    productImage?: string;
}

interface GalleryImage {
    id: string;
    url: string;
    title?: string;
}

interface LeftSideProps {
    producerName: string; // Folosim acest nume pentru a filtra pachetele (daca nu avem ID)
    producerId?: number;  // Ideal ar fi să avem ID-ul
    description: string;
}

// --- Definim tipul intern pentru Bundle (similar cu SubscriptionPage) ---
interface BundleData {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    images?: string[];
    items: { name: string; quantity: string }[];
    producer: string;
}

// Mock data (produse)
const MOCK_PRODUCTS: Product[] = [
    {
        productId: "1",
        name: "Roșii Cherry Bio",
        category: "Legume",
        price: 22,
        rating: 5.0,
        reviewCount: 187,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        unit: "1kg",
        supplier: "Ferma Verde",
    },
    {
        productId: "2",
        name: "Mere Ionathan",
        category: "Fructe",
        price: 15,
        rating: 5.0,
        reviewCount: 234,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
        unit: "1kg",
        supplier: "Livada Naturală",
    },
    {
        productId: "3",
        name: "Iaurt Tradițional Natural",
        category: "Lactate & Ouă",
        price: 8,
        rating: 5.0,
        reviewCount: 312,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
        unit: "500g",
        supplier: "Lactate Tradiționale",
    },
    {
        productId: "4",
        name: "Cartofi Noi Bio",
        category: "Legume",
        price: 12,
        rating: 4.5,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
        unit: "1kg",
        supplier: "Ferma Verde",
    },
    {
        productId: "5",
        name: "Morcovi Bio Crocanti",
        category: "Legume",
        price: 10,
        rating: 5.0,
        reviewCount: 201,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
        unit: "1kg",
        supplier: "Gospodăria Organică",
    },
    {
        productId: "6",
        name: "Salată Verde Lollo Rossa",
        category: "Legume",
        price: 6,
        rating: 5.0,
        reviewCount: 143,
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
        unit: "1 buc",
        supplier: "Grădina Proaspătă",
    },
    {
        productId: "7",
        name: "Ardei Gras Colorat",
        category: "Legume",
        price: 18,
        rating: 4.5,
        reviewCount: 98,
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
        unit: "1kg",
        supplier: "Ferma Verde",
    },
    {
        productId: "8",
        name: "Pâine Integrală",
        category: "Panificație",
        price: 12,
        rating: 5.0,
        reviewCount: 223,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        unit: "600g",
        supplier: "Brutăria Tradițională",
    },
    {
        productId: "9",
        name: "Nuci Proaspete",
        category: "Fructe Uscate",
        price: 32,
        rating: 4.5,
        reviewCount: 178,
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400",
        unit: "500g",
        supplier: "Pădurile României",
    },
    {
        productId: "10",
        name: "Castraveți Murați",
        category: "Conserve",
        price: 14,
        rating: 5.0,
        reviewCount: 195,
        image: "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=400",
        unit: "500g",
        supplier: "Gospodăria Tradițională",
    },
    {
        productId: "11",
        name: "Ceapă Roșie Bio",
        category: "Legume",
        price: 7,
        rating: 4.5,
        reviewCount: 112,
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
        unit: "1kg",
        supplier: "Ferma Verde",
    },
    {
        productId: "12",
        name: "Lapte Proaspăt de Vacă",
        category: "Lactate & Ouă",
        price: 12,
        rating: 5.0,
        reviewCount: 289,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        unit: "1L",
        supplier: "Ferma de Munte",
    },
];


const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        author: "Maria Popescu",
        rating: 5,
        date: "15 Noiembrie 2024",
        text: "Produse extraordinare! Roșiile au gust ca să mâncuri. Se vede că sunt cultivate cu grijă și responsabilitate. Recomand cu căldură!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    },
    {
        id: "2",
        author: "Ion Marinescu",
        rating: 4,
        date: "10 Noiembrie 2024",
        text: "Comandat de mai multe ori, mereu mâncărurile sunt proaspete. Livrare rapidă, produse proaspete. Ferma Verde este top!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        productImage: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
    },
    {
        id: "3",
        author: "Elena Dobre",
        rating: 2,
        date: "5 Noiembrie 2024",
        text: "Calitate foarte bună, singura mențiune ar fi și diversificarea mai mult sortimentului de fructe.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        productImage: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
    },
    {
        id: "4",
        author: "Andrei Cristea",
        rating: 3,
        date: "1 Noiembrie 2024",
        text: "Foarte mulțumit de calitate și preț. Voi mai comanda cu siguranță!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        productImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
    },
];

const MOCK_GALLERY: GalleryImage[] = [
    {
        id: "1",
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        title: "Ferma în zori",
    },
    {
        id: "2",
        url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
        title: "Culturi organice",
    },
    {
        id: "3",
        url: "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=400",
        title: "Recoltare",
    },
    {
        id: "4",
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        title: "Ferma Verde",
    },
];

interface CarouselSectionProps {
    items: any[];
    renderItem: (item: any) => React.ReactNode;
    desktopVisibleItems: number;
    tabletVisibleItems: number;
    mobileVisibleItems: number;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
                                                             items,
                                                             renderItem,
                                                             desktopVisibleItems,
                                                             tabletVisibleItems,
                                                             mobileVisibleItems,
                                                         }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const getVisibleItems = () => {
        if (isDesktop) return desktopVisibleItems;
        if (isTablet) return tabletVisibleItems;
        if (isMobile) return mobileVisibleItems;
        return desktopVisibleItems;
    };

    const visibleItems = getVisibleItems();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const maxIndex = Math.max(0, items.length - visibleItems);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const visibleItemsList = items.slice(currentIndex, currentIndex + visibleItems);

    if (items.length === 0) {
        return <Typography sx={{color: colors.white2, fontStyle: 'italic'}}>Nu există elemente de afișat.</Typography>;
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
            <Box
                sx={{
                    display: "flex",
                    gap: "1.5rem",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    overflowX: "hidden",
                }}
            >
                {visibleItemsList.map((item, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            flex: `0 0 calc((100% - ${(visibleItems - 1) * 1.5}rem) / ${visibleItems})`,
                            maxWidth: `calc((100% - ${(visibleItems - 1) * 1.5}rem) / ${visibleItems})`,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {renderItem(item)}
                    </Box>
                ))}
            </Box>

            {items.length > visibleItems && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        mt: "2rem",
                    }}
                >
                    <IconButton onClick={handlePrev} disabled={currentIndex === 0} sx={{ /* ... stiluri butoane ... */ border: `1px solid ${colors.lightGreen1}`, color: colors.lightGreen1 }}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <IconButton onClick={handleNext} disabled={currentIndex === maxIndex} sx={{ /* ... stiluri butoane ... */ border: `1px solid ${colors.lightGreen1}`, color: colors.lightGreen1 }}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

const LeftSide: React.FC<LeftSideProps> = ({
                                               producerName,
                                               producerId, // Am adăugat opțional ID-ul dacă îl ai
                                               description,
                                           }) => {
    const { addItem } = useCart();
    const [tabValue, setTabValue] = React.useState(0);

    // State pentru Abonamente Reale
    const [bundles, setBundles] = useState<BundleData[]>([]);
    const [loadingBundles, setLoadingBundles] = useState(false);

    // FETCH PACHETE DE LA BACKEND
    useEffect(() => {
        const fetchBundles = async () => {
            try {
                setLoadingBundles(true);
                let response;

                if (producerId) {
                    // Dacă avem ID, folosim endpoint-ul dedicat
                    response = await pacheteApi.getByProducator(producerId);
                } else {
                    // Fallback: Luăm toate și filtrăm după nume (nu e ideal, dar merge temporar)
                    response = await pacheteApi.getAll();
                }

                const allBundles = response.data.content.map(mapBackendToFrontend);

                // Filtrare client-side suplimentară dacă nu am folosit endpoint-ul byProducator
                const producerBundles = producerId
                    ? allBundles
                    : allBundles.filter(b => b.producer.toLowerCase().includes(producerName.toLowerCase()));

                setBundles(producerBundles);
            } catch (error) {
                console.error("Eroare la încărcarea pachetelor producătorului:", error);
            } finally {
                setLoadingBundles(false);
            }
        };

        fetchBundles();
    }, [producerName, producerId]); // Se re-execută dacă se schimbă producătorul

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleAddToCard = (id: string) => {
        // Căutăm în lista reală 'bundles' nu în MOCK
        const bundle = bundles.find((b) => b.id === id);

        if (bundle) {
            addItem({
                id: Number(bundle.id) + 50000,
                title: bundle.title,
                price: bundle.price,
                image: bundle.image,
                quantity: 1,
            });
            console.log("Abonament adăugat în coș:", bundle.title);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Typography variant="h3" sx={{ color: colors.white1 }}>
                DESPRE {producerName.toUpperCase()}
            </Typography>

            <Box sx={{ backgroundColor: colors.darkGreen2, border: `1px solid ${colors.lightGreen1Transparent}`, borderRadius: "1rem", padding: "1.5rem" }}>
                <Typography variant="body1" sx={{ color: colors.white2 }}>
                    {description}
                </Typography>
            </Box>

            <Box sx={{ borderBottom: `1px solid ${colors.lightGreen1Transparent}` }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ "& .MuiTab-root": { color: colors.white2, "&.Mui-selected": { color: colors.lightGreen1 } } }}>
                    <Tab label={`Produse (${MOCK_PRODUCTS.length})`}/>
                    <Tab label={`Pachete (${bundles.length})`}/> {/* Contor real */}
                    <Tab label={`Recenzii (${MOCK_REVIEWS.length})`}/>
                    <Tab label={`Galerie (${MOCK_GALLERY.length})`}/>
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <CarouselSection
                    items={MOCK_PRODUCTS}
                    desktopVisibleItems={3}
                    tabletVisibleItems={2}
                    mobileVisibleItems={1}
                    renderItem={(product: Product) => (
                        <GridViewUserProductCard
                            productId={product.productId}
                            image={product.image}
                            title={product.name}
                            category={product.category}
                            unit={product.unit}
                            supplier={product.supplier}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            price={product.price}
                            currency="lei"
                            onAddToCart={() => addItem({
                                id: String(product.productId),
                                title: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            })}
                        />
                    )}
                />
            )}

            {/* Tab 2: Pachete  */}
            {tabValue === 1 && (
                loadingBundles ? (
                    <Typography sx={{ color: colors.white2 }}>Se încarcă pachetele...</Typography>
                ) : (
                    <CarouselSection
                        items={bundles} // Folosim state-ul 'bundles' populat din API
                        desktopVisibleItems={3}
                        tabletVisibleItems={2}
                        mobileVisibleItems={1}
                        renderItem={(bundle: BundleData) => (
                            <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', p: 1 }}>
                                <BundleCard
                                    id={bundle.id}
                                    title={bundle.title}
                                    price={bundle.price}
                                    currency={bundle.currency}
                                    image={bundle.image}
                                    items={bundle.items}
                                    onAddToCart={handleAddToCard}
                                />
                            </Box>
                        )}
                    />
                )
            )}

            {tabValue === 2 && (
                <CarouselSection
                    items={MOCK_REVIEWS}
                    desktopVisibleItems={2}
                    tabletVisibleItems={1}
                    mobileVisibleItems={1}
                    renderItem={(review: Review) => (
                        <ReviewCard {...review} />
                    )}
                />
            )}

            {tabValue === 3 && (
                <CarouselSection
                    items={MOCK_GALLERY}
                    desktopVisibleItems={3}
                    tabletVisibleItems={2}
                    mobileVisibleItems={1}
                    renderItem={(image: GalleryImage) => (
                        <Box sx={{ width: "100%", height: "220px", borderRadius: "1rem", overflow: "hidden" }}>
                            <Box component="img" src={image.url} alt={image.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                    )}
                />
            )}


        </Box>
    );
};

export default LeftSide;