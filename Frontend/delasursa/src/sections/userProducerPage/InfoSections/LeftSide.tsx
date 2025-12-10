import React from "react";
import { Box, Typography, Tabs, Tab, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "../../../theme/colors";
import GridViewUserProductCard from "../../../components/GridViewUserProductCard";
import ReviewCard from "../../../components/ReviewCard";

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
}

interface GalleryImage {
    id: string;
    url: string;
    title?: string;
}

interface LeftSideProps {
    producerName: string;
    description: string;
}


// Mock data
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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Carousel Grid */}
            <Box
                sx={{
                    display: "flex",
                    gap: "1.5rem",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "start",
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

            {/* Navigation buttons - under carousel */}
            {items.length > visibleItems && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        mt: "2rem",
                    }}
                >
                    <IconButton
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        sx={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            color: colors.lightGreen1,
                            transition: "all 0.2s ease",
                            "&:hover:not(:disabled)": {
                                borderColor: colors.lightGreen1,
                                backgroundColor: `${colors.lightGreen1}15`,
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        sx={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            color: colors.lightGreen1,
                            transition: "all 0.2s ease",
                            "&:hover:not(:disabled)": {
                                borderColor: colors.lightGreen1,
                                backgroundColor: `${colors.lightGreen1}15`,
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

const LeftSide: React.FC<LeftSideProps> = ({
    producerName,
    description,
}) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            {/* Title */}
            <Typography
                variant="h3"
                sx={{
                    color: colors.white1,
                }}
            >
                DESPRE {producerName.toUpperCase()}
            </Typography>

            {/* Description box */}
            <Box
                sx={{
                    backgroundColor: colors.darkGreen2,
                    border: `1px solid ${colors.lightGreen1Transparent}`,
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                    }}
                >
                    {description}
                </Typography>
            </Box>

            {/* Tabs */}
            <Box
                sx={{
                    borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        "& .MuiTab-root": {
                            color: colors.white2,
                            textTransform: "none",
                            borderBottom: `1px solid transparent`,
                            "&.Mui-selected": {
                                color: colors.lightGreen1,
                                borderBottomColor: colors.lightGreen1,
                            },
                        },
                    }}
                >
                    <Tab label={`Produse (${MOCK_PRODUCTS.length})`} />
                    <Tab label={`Recenzii (${MOCK_REVIEWS.length})`} />
                    <Tab label={`Galerie (${MOCK_GALLERY.length})`} />
                </Tabs>
            </Box>

            {/* Tab 0: Produse */}
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
                            onAddToCart={() => console.log("Added to cart:", product.name)}
                        />
                    )}
                />
            )}

            {/* Tab 1: Recenzii */}
            {tabValue === 1 && (
                <CarouselSection
                    items={MOCK_REVIEWS}
                    desktopVisibleItems={2}
                    tabletVisibleItems={1}
                    mobileVisibleItems={1}
                    renderItem={(review: Review) => (
                        <ReviewCard
                            author={review.author}
                            rating={review.rating}
                            date={review.date}
                            text={review.text}
                            avatar={review.avatar}
                            productImage={review.productImage}
                        />
                    )}
                />
            )}

            {/* Tab 2: Galerie */}
            {tabValue === 2 && (
                <CarouselSection
                    items={MOCK_GALLERY}
                    desktopVisibleItems={3}
                    tabletVisibleItems={2}
                    mobileVisibleItems={1}
                    renderItem={(image: GalleryImage) => (
                        <Box
                            sx={{
                                width: "100%",
                                height: "220px",
                                borderRadius: "1rem",
                                overflow: "hidden",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                                cursor: "pointer",
                            }}
                        >
                            <Box
                                component="img"
                                src={image.url}
                                alt={image.title}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    )}
                />
            )}
        </Box>
    );
};

export default LeftSide;