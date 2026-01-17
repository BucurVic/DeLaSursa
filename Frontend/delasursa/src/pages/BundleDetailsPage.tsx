import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    Alert,
    Snackbar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import { ShoppingCartOutlined, EventRepeat } from "@mui/icons-material";

import { colors } from "../theme";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { pacheteApi } from "../api/pacheteApi";
// Importăm API-ul completat
import { subscriptiiApi } from "../api/subscriptiiApi";
import type { PachetDTO } from "../common/types";

const textResources = {
    addToCartButton: "Adaugă în coș",
    subscribeButton: "Abonează-te",
    loadingText: "Se încarcă...",
    reviewsTitle: "Recenzii Clienți",
};

// --- INTERFEȚE ---
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
    isSubscription: boolean;
    frequency?: number;
}

// --- MAPPER ---
const mapBackendToFrontend = (pachet: PachetDTO): BundleDetailData => {
    return {
        id: pachet.id ? pachet.id.toString() : "0",
        title: pachet.nume,
        price: pachet.pretTotal,
        currency: "RON",
        producer: pachet.producatorNume || "Producător Local",
        images: pachet.imagine
            ? [pachet.imagine]
            : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"],
        items: pachet.produse
            ? pachet.produse.map((item) => ({
                name: item.numeProdus || "",
                quantity: `${item.cantitate} ${item.unitateMasura || ""}`,
            }))
            : [],
        rating: 5.0,
        isSubscription: Boolean(pachet.eAbonament),
        frequency: pachet.frecventaLivrare
    };
};

// Reviews (Date statice, design original)
const reviews = [
    {
        id: 1,
        user: "Elena M.",
        rating: 5,
        date: "2024-12-10",
        comment:
            "Legumele sunt incredibile, mult mai gustoase decât la supermarket!",
    },
    {
        id: 2,
        user: "Radu I.",
        rating: 5,
        date: "2024-11-28",
        comment: "Livrarea a fost punctuala și produsele foarte bine ambalate.",
    },
    {
        id: 3,
        user: "Ana S.",
        rating: 4,
        date: "2024-11-15",
        comment: "Foarte bune, aș fi vrut mai mulți morcovi data trecută.",
    },
];

const BundleDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { user } = useContext(AuthContext);

    const [bundle, setBundle] = useState<BundleDetailData | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // State Abonament
    const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    useEffect(() => {
        const fetchBundleDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await pacheteApi.getAll(0, 100);
                const foundPachet = response.data.content.find(
                    (p: PachetDTO) => p.id && p.id.toString() === id
                );

                if (foundPachet) {
                    const mappedBundle = mapBackendToFrontend(foundPachet);
                    setBundle(mappedBundle);
                    setSelectedImageIndex(0);

                    // --- LOGICĂ VERIFICARE ABONAMENT ---
                    if (user && mappedBundle.isSubscription) {
                        const subscribed = await subscriptiiApi.checkIfSubscribed(Number(user.id), Number(foundPachet.id));
                        setIsAlreadySubscribed(subscribed);
                    }
                }
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBundleDetails();
    }, [id, user]);

    // --- HANDLER ABONARE ---
    const handleSubscribe = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (!bundle) return;

        try {
            setIsSubscribing(true);

            await subscriptiiApi.create({
                idClient: Number(user.id),
                idPachet: Number(bundle.id),
                frecventaLivrare: bundle.frequency
            });

            setIsAlreadySubscribed(true);
            setSnackbar({ open: true, message: "Abonament creat cu succes!", severity: "success" });

        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: "Eroare la creare abonament.", severity: "error" });
        } finally {
            setIsSubscribing(false);
        }
    };

    // --- HANDLER COȘ (CU FIX-UL "bundle") ---
    const handleAddToCart = () => {
        if (!bundle) return;
        addItem({
            // IMPORTANT: Prefixul "bundle" pentru ca CheckoutPage să știe că e pachet
            id: `bundle${bundle.id}`,
            title: bundle.title,
            price: bundle.price,
            image: bundle.images[0],
            quantity: 1
        });
        setSnackbar({ open: true, message: "Pachet adăugat în coș!", severity: "success" });
    };

    if (loading) return <Typography sx={{ p: 4 }}>{textResources.loadingText}</Typography>;
    if (!bundle) return <Box sx={{ p: 4 }}>Pachetul nu a fost găsit.</Box>;

    // Afișăm butonul doar dacă e pachet recurent și clientul NU e încă abonat
    const showSubscribeButton = bundle.isSubscription && !isAlreadySubscribed;

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
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3, color: colors.lightGreen1, textTransform: "none" }}
            >
                Înapoi
            </Button>

            {/* --- CONTENT PRINCIPAL --- */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "2rem", md: "3rem" },
                    alignItems: { xs: "center", md: "flex-start" },
                }}
            >
                {/* IMAGINI */}
                <Box sx={{ width: { xs: "100%", sm: "80%", md: "350px" }, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                        component="img"
                        src={bundle.images[selectedImageIndex]}
                        alt={bundle.title}
                        sx={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "1rem", boxShadow: "0 0 18px rgba(0,0,0,0.25)", border: `1px solid ${colors.lightGreen1Transparent}` }}
                    />
                    {bundle.images.length > 1 && (
                        <Stack direction="row" spacing={1.5} justifyContent="center">
                            {bundle.images.map((img, idx) => (
                                <Box key={idx} component="img" src={img} onClick={() => setSelectedImageIndex(idx)} sx={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "0.5rem", cursor: "pointer", border: selectedImageIndex === idx ? `2px solid ${colors.lightGreen1}` : `2px solid transparent`, opacity: selectedImageIndex === idx ? 1 : 0.6 }} />
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* DETALII */}
                <Box sx={{ flex: 1, width: "100%" }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", sm: "2rem" } }}>
                            {bundle.title}
                        </Typography>

                        {/* Tag Abonament */}
                        {bundle.isSubscription && (
                            <Stack direction="row" spacing={1} sx={{mb: 1}}>
                                <Box sx={{bgcolor: colors.lightGreen1, color: colors.darkGreen2, px: 1, py: 0.5, borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 0.5}}>
                                    <EventRepeat fontSize="small"/>
                                    Abonament Recurent ({bundle.frequency} zile)
                                </Box>
                                {isAlreadySubscribed && (
                                    <Box sx={{bgcolor: 'rgba(76, 175, 80, 0.2)', color: '#66bb6a', border: '1px solid #66bb6a', px: 1, py: 0.5, borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                                        Ești deja abonat
                                    </Box>
                                )}
                            </Stack>
                        )}

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                            <Typography sx={{ opacity: 0.8 }}>• De la: <b>{bundle.producer}</b></Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
                                <StarIcon sx={{ fontSize: "1rem", color: "#FFD700" }} />
                                <Typography variant="body2">{bundle.rating}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="h4" sx={{ color: colors.lightGreen2, fontWeight: 600, mb: 2 }}>
                        {bundle.price} {bundle.currency}
                        <Typography component="span" sx={{ fontSize: "1rem", color: colors.white2, ml: 1 }}>/ livrare</Typography>
                    </Typography>

                    {/* LISTA PRODUSE */}
                    <Box sx={{ mb: 4, p: 2, bgcolor: colors.darkGreen2, borderRadius: "1rem", border: `1px solid ${colors.lightGreen1Transparent}` }}>
                        <Typography variant="h6" sx={{ mb: 1, fontSize: "1rem", fontWeight: "bold", color: colors.lightGreen1 }}>
                            Ce conține pachetul:
                        </Typography>
                        <List dense disablePadding>
                            {bundle.items.map((item, idx) => (
                                <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon sx={{ color: colors.lightGreen1, fontSize: "1.2rem" }} /></ListItemIcon>
                                    <ListItemText primary={<Typography variant="body2"><b>{item.quantity}</b> {item.name}</Typography>} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* BUTOANE CTA */}
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        {/* 1. Adaugă în coș */}
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCartOutlined />}
                            onClick={handleAddToCart}
                            sx={{ height: "3rem", backgroundColor: colors.lightGreen1, color: colors.darkGreen1, borderRadius: "0.6rem", "&:hover": { backgroundColor: colors.lightGreen2 } }}
                        >
                            {textResources.addToCartButton}
                        </Button>

                        {/* 2. Abonează-te (Condiționat) */}
                        {showSubscribeButton && (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="success"
                                onClick={handleSubscribe}
                                disabled={isSubscribing}
                                startIcon={<EventRepeat />}
                                sx={{
                                    height: "3rem",
                                    borderRadius: "0.6rem",
                                    borderColor: colors.lightGreen1,
                                    color: colors.lightGreen1,
                                    "&:hover": {
                                        backgroundColor: colors.lightGreen1Transparent,
                                        borderColor: colors.lightGreen1,
                                    },
                                }}
                            >
                                {isSubscribing ? "Se procesează..." : textResources.subscribeButton}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* --- SECȚIUNEA: REVIEWS (RESTAURATĂ LA ORIGINAL) --- */}
            <Box sx={{ mt: "4rem" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: "1.5rem",
                        textAlign: { xs: "center", md: "left" },
                    }}
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

                            <Box sx={{ mb: "0.8rem", color: "#FFD700" }}>
                                {"★".repeat(r.rating)}
                                <span style={{ color: "#555" }}>
                  {"★".repeat(5 - r.rating)}
                </span>
                            </Box>

                            <Typography sx={{ lineHeight: 1.6 }}>{r.comment}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({...snackbar, open: false})}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BundleDetailsPage;