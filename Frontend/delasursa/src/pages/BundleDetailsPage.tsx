import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from '@mui/icons-material/Star';

import { colors } from "../theme";
import { useCart } from "../context/CartContext";
import { pacheteApi, type PachetDTO } from "../api/pacheteApi";
import {ShoppingCartOutlined} from "@mui/icons-material"; //

const textResources = {
    addToCartButton: "Adaugă în coș",
    loadingText: "Se încarcă...",
    reviewsTitle: "Recenzii Clienți"
};

// --- FRONTEND DATA STRUCTURE ---
interface BundleItem {
    name: string;
    quantity: string;
}

interface BundleDetailData {
    id: string;
    title: string;
    price: number;
    currency: string;
    producer: string;
    images: string[];
    items: BundleItem[];
    rating: number;
}

// --- MAPPER FUNCTION ---
const mapBackendToFrontend = (pachet: PachetDTO): BundleDetailData => { //
    return {
        id: pachet.id.toString(),
        title: pachet.nume,
        price: pachet.pretTotal,
        currency: "RON",
        producer: pachet.producatorNume || "Producător Local",
        images: pachet.imagine ? [pachet.imagine] : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"], // Use fetched image or default
        items: pachet.produse ? pachet.produse.map(item => ({
            name: item.numeProdus,
            quantity: `${item.cantitate} ${item.unitateMasura}`
        })) : [],
        rating: 5.0 // Default rating
    };
};

const reviews = [
    { id: 1, user: "Elena M.", rating: 5, date: "2024-12-10", comment: "Legumele sunt incredibile, mult mai gustoase decât la supermarket!" },
    { id: 2, user: "Radu I.", rating: 5, date: "2024-11-28", comment: "Livrarea a fost punctuala și produsele foarte bine ambalate." },
    { id: 3, user: "Ana S.", rating: 4, date: "2024-11-15", comment: "Foarte bune, aș fi vrut mai mulți morcovi data trecută." },
];

const BundleDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();

    const [bundle, setBundle] = useState<BundleDetailData | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBundleDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                // Currently fetching all packages and filtering. Ideally, implement getById in API
                const response = await pacheteApi.getAll(0, 100);
                const foundPachet = response.data.content.find((p: PachetDTO) => p.id.toString() === id); //

                if (foundPachet) {
                    setBundle(mapBackendToFrontend(foundPachet));
                    setSelectedImageIndex(0);
                }
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor pachetului:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBundleDetails();
    }, [id]);

    if (loading) return <Typography sx={{ p: 4 }}>{textResources.loadingText}</Typography>;
    if (!bundle) return (
        <Box sx={{ minHeight: "100vh", bgcolor: colors.darkGreen2, color: colors.white1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5">Pachetul nu a fost găsit.</Typography>
            <Button onClick={() => navigate(-1)} sx={{ ml: 2, color: colors.lightGreen1 }}>Înapoi</Button>
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                py: { xs: "1.5rem", md: "3rem" },
            }}
        >
            {/* Buton Înapoi */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3, color: colors.lightGreen1, textTransform: "none" }}
            >
                Înapoi
            </Button>

            {/* --- SECȚIUNEA PRINCIPALĂ (Flex Row) --- */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "2rem", md: "3rem" },
                    alignItems: { xs: "center", md: "flex-start" },
                }}
            >
                {/* --- STÂNGA: GALERIE IMAGINI --- */}
                <Box
                    sx={{
                        width: { xs: "100%", sm: "80%", md: "350px" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {/* Imagine Principală */}
                    <Box
                        component="img"
                        src={bundle.images[selectedImageIndex]}
                        alt={bundle.title}
                        sx={{
                            width: "100%",
                            height: "350px", // Pătrat sau ușor portret pentru pachete
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "1rem",
                            boxShadow: "0 0 18px rgba(0,0,0,0.25)",
                            border: `1px solid ${colors.lightGreen1Transparent}`
                        }}
                    />

                    {/* Miniaturi (Thumbnails) */}
                    {bundle.images.length > 1 && (
                        <Stack direction="row" spacing={1.5} justifyContent="center">
                            {bundle.images.map((img, idx) => (
                                <Box
                                    key={idx}
                                    component="img"
                                    src={img}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    sx={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "cover",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        border: selectedImageIndex === idx
                                            ? `2px solid ${colors.lightGreen1}`
                                            : `2px solid transparent`,
                                        opacity: selectedImageIndex === idx ? 1 : 0.6,
                                        transition: "all 0.2s",
                                        "&:hover": { opacity: 1 }
                                    }}
                                />
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* --- DREAPTA: DETALII ABONAMENT --- */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: { xs: "center", md: "left" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        width: "100%"
                    }}
                >
                    {/* Header Info */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                fontSize: { xs: "1.8rem", sm: "2rem" },
                                lineHeight: 1.2
                            }}
                        >
                            {bundle.title}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Typography sx={{ opacity: 0.8 }}>
                                • De la: <b>{bundle.producer}</b>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                                <StarIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
                                <Typography variant="body2">{bundle.rating}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Preț */}
                    <Typography
                        variant="h4"
                        sx={{
                            color: colors.lightGreen2,
                            fontWeight: 600,
                            mb: 2,
                            fontSize: { xs: "1.8rem", sm: "2rem" },
                        }}
                    >
                        {bundle.price} {bundle.currency}
                        <Typography component="span" sx={{ fontSize: '1rem', color: colors.white2, ml: 1 }}>/ livrare</Typography>
                    </Typography>


                    {/* LISTA DE PRODUSE (CONȚINUT) - AICI E POZIȚIONATĂ */}
                    <Box
                        sx={{
                            mb: 4,
                            p: 2,
                            bgcolor: colors.darkGreen2,
                            borderRadius: "1rem",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            textAlign: 'left'
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem', fontWeight: 'bold', color: colors.lightGreen1 }}>
                            Ce conține pachetul:
                        </Typography>
                        <List dense disablePadding>
                            {bundle.items.map((item, idx) => (
                                <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckCircleOutlineIcon sx={{ color: colors.lightGreen1, fontSize: '1.2rem' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2">
                                                <b>{item.quantity}</b> {item.name}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Buton CTA */}
                    <Box>

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCartOutlined />}
                            onClick={() =>
                                addItem({
                                    id: String(bundle.id),
                                    title: bundle.title,
                                    price: bundle.price,
                                    image: bundle.images[0], // Prima imagine
                                    quantity: 1,
                                })
                            }
                            sx={{
                                height: "3rem", // 13% of content height
                                backgroundColor: colors.lightGreen1,
                                color: colors.darkGreen1,
                                borderRadius: "0.6rem",
                                "&:hover": {
                                    backgroundColor: colors.lightGreen2
                                }
                            }}
                        >
                            {textResources.addToCartButton}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* --- SECȚIUNEA: REVIEWS (Jos) --- */}
            <Box sx={{ mt: "4rem" }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: "1.5rem", textAlign: { xs: "center", md: "left" } }}
                >
                    {textResources.reviewsTitle}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {reviews.map((r) => (
                        <Box
                            key={r.id}
                            sx={{
                                backgroundColor: colors.darkGreen2,
                                padding: "1.5rem",
                                borderRadius: "0.8rem",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    mb: "0.8rem",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {r.user}
                                </Typography>

                                <Typography sx={{ opacity: 0.7, fontSize: "0.9rem" }}>
                                    {new Date(r.date).toLocaleDateString("ro-RO")}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: "0.8rem", color: '#FFD700' }}>
                                {"★".repeat(r.rating)}
                                <span style={{ color: '#555' }}>{"★".repeat(5 - r.rating)}</span>
                            </Box>

                            <Typography sx={{ lineHeight: 1.6 }}>{r.comment}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BundleDetailsPage;