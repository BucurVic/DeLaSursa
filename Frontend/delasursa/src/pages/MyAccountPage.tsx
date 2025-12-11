import React, { useContext, useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent, Button, Avatar, Chip, Stack, CircularProgress
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from '@mui/icons-material/Storefront';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { colors } from "../theme/colors";

// --- 1. DEFINIRE TIPURI ---

type ClientProfile = {
    nume: string;
    prenume: string;
    email: string;
    telefon: string;
    adresaLivrare: string;
};

type ComandaProdus = {
    id: number;
    cantitate: number;
    pretUnitar: number;
    produs: {
        numeProdus: string;
        categorie: string;
    }
};

type Order = {
    id: number;
    dataEfectuarii: string;
    comandaProduse: ComandaProdus[];
    status?: string;
};

// --- MOCK DATA ---
const mockProducerDetails = {
    businessName: "Ferma Vedeta (Demo)",
    cui: "RO123456",
    activeProducts: 12,
    rating: 4.8
};

const MyAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { role, token } = useContext(AuthContext); 
    const isProducer = role === "PRODUCATOR";

    const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // Calcul Total Comandă
    const calculateTotal = (order: Order) => {
        if (!order.comandaProduse || order.comandaProduse.length === 0) return 0;
        return order.comandaProduse.reduce((acc, item) => {
            return acc + (item.cantitate * item.pretUnitar);
        }, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) return; 
                setLoading(true);

                // A. FETCH PROFIL
                const resProfile = await fetch("http://localhost:8080/api/account/client", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (resProfile.ok) {
                    const dataProfile = await resProfile.json();
                    setClientProfile(dataProfile);
                }

                // B. FETCH COMENZI
                const resOrders = await fetch("http://localhost:8080/api/account/client/comenzi", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (resOrders.ok) {
                    const dataOrders = await resOrders.json();
                    setOrders(dataOrders);
                }

            } catch (err: any) {
                console.error("Eroare fetch:", err);
                setError("Nu am putut încărca datele.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]); 

    const cardStyle = {
        bgcolor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "16px",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        height: '100%' // Face cardurile să aibă aceeași înălțime dacă sunt pe același rând
    };

    if (loading) return <Box sx={{ p: 5, textAlign: "center" }}><CircularProgress sx={{ color: colors.lightGreen1 }} /></Box>;

    return (
        <Box sx={{ mt: 4, px: 2, maxWidth: "1200px", mx: "auto", pb: 8 }}>
            
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: colors.white1, mb: 1 }}>
                Contul Meu
            </Typography>
            <Typography variant="body1" sx={{ color: colors.white2, mb: 4 }}>
                Bine ai venit, {clientProfile?.prenume || "utilizatorule"}!
            </Typography>

            {/* LAYOUT FLEXBOX (Înlocuiește Grid-ul care dădea erori)
               - Pe mobil (xs): column (unul sub altul)
               - Pe desktop (md): row (unul lângă altul)
               - gap: 3 (spațiu între ele)
            */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                
                {/* === COLOANA STÂNGA: Profil (flex: 1 => ocupă aprox 33%) === */}
                <Box sx={{ flex: 1, minWidth: 0 }}> 
                    <Stack spacing={3}>
                        
                        <Card sx={cardStyle}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Avatar sx={{ width: 100, height: 100, bgcolor: colors.lightGreen1Transparent, color: colors.lightGreen1, mb: 2 }}>
                                    <PersonIcon fontSize="large" />
                                </Avatar>
                                
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    {clientProfile?.nume ? `${clientProfile.nume} ${clientProfile.prenume}` : "Utilizator"}
                                </Typography>
                                
                                <Chip 
                                    label={isProducer ? "Producător & Cumpărător" : "Cumpărător"} 
                                    size="small" 
                                    sx={{ mt: 1, bgcolor: colors.lightGreen1, color: colors.darkGreen1, fontWeight: 'bold' }} 
                                />

                                <Box sx={{ width: '100%', mt: 3, textAlign: 'left' }}>
                                    <Typography variant="caption" sx={{ color: colors.white2 }}>Email</Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>{clientProfile?.email || "-"}</Typography>
                                    
                                    <Typography variant="caption" sx={{ color: colors.white2 }}>Telefon</Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>{clientProfile?.telefon || "-"}</Typography>

                                    {/* --- ADRESA DE LIVRARE ESTE COMENTATĂ (ASCUNSĂ) --- */}
                                    {/* <Typography variant="caption" sx={{ color: colors.white2 }}>Adresă Livrare</Typography>
                                    <Typography variant="body1">{clientProfile?.adresaLivrare || "-"}</Typography> 
                                    */}
                                </Box>

                                <Button 
                                    variant="outlined" 
                                    startIcon={<EditIcon />}
                                    fullWidth
                                    sx={{ mt: 3, borderColor: colors.lightGreen1, color: colors.lightGreen1 }}
                                    onClick={() => navigate("/edit-account")}
                                >
                                    Editează Datele
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Profil Business (Dacă e producător) */}
                        {isProducer && (
                             <Card sx={{ ...cardStyle, border: `1px solid ${colors.lightGreen1}` }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <StorefrontIcon sx={{ color: colors.lightGreen1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profil Business</Typography>
                                    </Box>
                                    
                                    <Typography variant="caption" sx={{ color: colors.white2 }}>Nume Fermă</Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>{mockProducerDetails.businessName}</Typography>

                                    <Typography variant="caption" sx={{ color: colors.white2 }}>Produse Active</Typography>
                                    <Typography variant="h4" sx={{ color: colors.lightGreen1 }}>{mockProducerDetails.activeProducts}</Typography>

                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        sx={{ mt: 2, bgcolor: colors.lightGreen1, color: colors.darkGreen1, fontWeight: 'bold', '&:hover': { bgcolor: colors.lightGreen2 } }}
                                        onClick={() => navigate("/dashboard-producator")}
                                    >
                                        Mergi la Panou Producător
                                    </Button>
                                </CardContent>
                             </Card>
                        )}
                    </Stack>
                </Box>

                {/* === COLOANA DREAPTA: Istoric Comenzi (flex: 2 => ocupă aprox 66%) === */}
                <Box sx={{ flex: 2, minWidth: 0 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <ReceiptLongIcon sx={{ color: colors.lightGreen1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Istoricul Comenzilor Mele</Typography>
                            </Box>
                            
                            {orders.length === 0 ? (
                                <Typography sx={{ color: colors.white2 }}>Nu ai plasat nicio comandă încă.</Typography>
                            ) : (
                                <Stack spacing={2}>
                                    {orders.map(order => (
                                        <Box 
                                            key={order.id}
                                            sx={{ 
                                                p: 2, 
                                                bgcolor: 'rgba(255,255,255,0.03)', 
                                                borderRadius: '12px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: 2
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
                                                    Comanda #{order.id}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: colors.white2 }}>
                                                    Data: {order.dataEfectuarii} 
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant="body2" sx={{ color: colors.white2 }}>Total</Typography>
                                                <Typography variant="h6">{calculateTotal(order)} RON</Typography>
                                            </Box>

                                            <Chip 
                                                label="Finalizat" 
                                                size="small"
                                                sx={{ 
                                                    bgcolor: 'rgba(74, 222, 128, 0.2)', 
                                                    color: colors.lightGreen1
                                                }} 
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Box>

            </Box>
        </Box>
    );
};

export default MyAccountPage;