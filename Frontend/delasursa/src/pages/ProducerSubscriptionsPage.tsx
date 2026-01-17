import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Container, Box, Typography, Button, Grid, Card, CardMedia, CardContent, Chip, CircularProgress, Alert, IconButton, MenuItem, Select, type SelectChangeEvent
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";

import { colors } from '../theme';
import CreateSubscriptionModal from '../components/CreateSubscriptionModal';
import EditSubscriptionModal from "../components/EditSubscriptionModal";
import ViewSubscribersModal from '../components/ViewSubscribersModal';
import SearchBar from "../components/SearchBar";
import { pacheteApi } from '../api/pacheteApi';
import type { PachetDTO, Pachet, SubscriptionOfferDTO } from '../common/types';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

// --- STYLES & COMPONENTS ---
const filterInputStyles = {
    backgroundColor: colors.darkGreen1,
    color: colors.white1,
    borderRadius: "1rem",
    border: `1px solid ${colors.lightGreen1Transparent}`,
    fontSize: "1rem",
    "& .MuiSelect-select": { padding: "0.75rem 1rem", minHeight: "1.5rem" },
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&:hover": { border: `1px solid ${colors.lightGreen1}` },
    "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
    "& .MuiSvgIcon-root": { color: colors.lightGreen1, right: "0.5rem" },
};
const labelStyles = { color: colors.white2, mb: "0.5rem", fontSize: "1rem", ml: 1 };
const sortOptions = [
    { value: "", label: "-" },
    { value: "price-asc", label: "Preț Crescător" },
    { value: "price-desc", label: "Preț Descrescător" },
    { value: "name-asc", label: "Nume A→Z" },
    { value: "name-desc", label: "Nume Z→A" },
];
const FilterSelect: React.FC<any> = ({ label, value, options, onChange }) => (
    <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" }, minWidth: 150 }}>
        <Typography sx={labelStyles}>{label}</Typography>
        <Select fullWidth value={value} onChange={onChange} displayEmpty sx={filterInputStyles} MenuProps={{ PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1 } } }}>
            {options.map((opt: any) => <MenuItem key={opt.value} value={opt.value}>{opt.label === "-" ? <span style={{ opacity: 0.5 }}>-</span> : opt.label}</MenuItem>)}
        </Select>
    </Box>
);

const ProducerSubscriptionsPage: React.FC = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    let producerId = 0;
    if (token) { try { const decoded: any = jwtDecode(token); producerId = Number(decoded.id); } catch (e) { } }

    const [offers, setOffers] = useState<PachetDTO[]>([]);
    const [allPackages, setAllPackages] = useState<Pachet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    // Default Grid
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [targetPackage, setTargetPackage] = useState<PachetDTO | null>(null);
    const [viewSubscribersId, setViewSubscribersId] = useState<number | null>(null);
    const [viewSubscribersName, setViewSubscribersName] = useState<string>("");

    const fetchData = async () => {
        if (!producerId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await pacheteApi.getByProducator(producerId, 0, 100);
            const toatePachetele = response.data.content;
            setOffers(toatePachetele.filter(p => Boolean(p.eAbonament)));
            setAllPackages(toatePachetele.map(p => ({ id: p.id || 0, nume: p.nume, imagine: p.imagine, pretTotal: p.pretTotal, eAbonament: p.eAbonament, frecventaLivrare: p.frecventaLivrare, descriere: p.descriere, pretAbonament: p.pretAbonament, produse: p.produse || [] })));
        } catch (err) { console.error(err); setError("Nu am putut încărca ofertele."); } finally { setLoading(false); }
    };
    useEffect(() => { fetchData(); }, [producerId]);

    const filteredOffers = useMemo(() => {
        let result = [...offers];
        if (search.trim()) result = result.filter((o) => o.nume.toLowerCase().includes(search.toLowerCase()));
        const getPrice = (o: PachetDTO) => (o.pretAbonament && o.pretAbonament > 0) ? o.pretAbonament : o.pretTotal;
        if (selectedMinPrice) result = result.filter((o) => getPrice(o) >= Number(selectedMinPrice));
        if (selectedMaxPrice) result = result.filter((o) => getPrice(o) <= Number(selectedMaxPrice));
        switch (selectedSort) {
            case "price-asc": result.sort((a, b) => getPrice(a) - getPrice(b)); break;
            case "price-desc": result.sort((a, b) => getPrice(b) - getPrice(a)); break;
            case "name-asc": result.sort((a, b) => a.nume.localeCompare(b.nume)); break;
            case "name-desc": result.sort((a, b) => b.nume.localeCompare(a.nume)); break;
        }
        return result;
    }, [offers, search, selectedMinPrice, selectedMaxPrice, selectedSort]);

    const handleSaveSubscription = async (data: SubscriptionOfferDTO | any) => {
        try {
            const pachetPayload: PachetDTO = {
                id: data.isNewPachet ? undefined : (data.pachetId || data.id), // Fallback la data.id
                producatorId: producerId,

                // Mapare câmpuri (verificăm ambele variante de nume pentru siguranță)
                nume: data.numePachetNou || data.nume || "Pachet Fără Nume",
                imagine: data.imaginePachetNou || data.imagine || "",
                descriere: data.descriere,

                // Prețuri
                pretTotal: data.pret || data.pretTotal, // Modalul poate trimite 'pretTotal', DTO are 'pret'
                pretAbonament: data.pretAbonament,

                // Setări Abonament
                eAbonament: true,
                frecventaLivrare: data.frecventa || data.frecventaLivrare,

                // --- FIX CRITIC AICI ---
                // Nu mai punem [], ci luăm produsele care vin din data (din Modal)
                produse: data.produse || []
            };

            console.log("Payload trimis la server:", pachetPayload); // DEBUG

            if (data.isNewPachet) {
                await pacheteApi.create(pachetPayload);
            } else if (pachetPayload.id) {
                await pacheteApi.update(pachetPayload.id, pachetPayload);
            }

            // Închidem modalele și reîncărcăm datele
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);

            // Asigură-te că funcția asta chiar face request la backend!
            fetchData();

        } catch (err) {
            console.error(err);
            alert("Eroare la salvare.");
        }
    };
    const handleEditClick = (offer: PachetDTO) => { setTargetPackage(offer); setIsEditModalOpen(true); };
    const handleDeleteOffer = async (id: number) => { if (!window.confirm("Sigur ștergi?")) return; try { await pacheteApi.delete(id); fetchData(); } catch (err) { alert("Eroare."); } };
    const handleViewSubscribers = (id: number, nume: string) => { setViewSubscribersId(id); setViewSubscribersName(nume); };
    const handleViewDetails = (id: number) => { navigate(`/pachete/${id}`); };

    // --- RENDER CARD (EQUAL HEIGHT LOGIC) ---
    const renderSubscriptionCard = (offer: PachetDTO, isList: boolean) => {
        // 1. Prețul de Referință: Prețul pachetului standard (fără abonament)
        // Acesta este prețul la care ne raportăm acum, conform cerinței
        const standardPrice = offer.pretTotal || 0;

        // 2. Prețul de Vânzare: Prețul special pentru abonament
        // Dacă nu există preț special setat, fallback la prețul standard
        const subscriptionPrice = offer.pretAbonament || standardPrice;

        // 3. Calculăm reducerea strict între Pachet Standard vs. Abonament
        const hasDiscount = standardPrice > subscriptionPrice;

        // Evităm împărțirea la 0
        const discountPercent = (hasDiscount && standardPrice > 0)
            ? Math.round(((standardPrice - subscriptionPrice) / standardPrice) * 100)
            : 0;

        return (
            <Card sx={{
                bgcolor: colors.darkGreen1,
                border: `1px solid ${colors.lightGreen1Transparent}`,
                borderRadius: '1rem',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: isList ? { xs: 'column', sm: 'row' } : 'column',
                alignItems: isList ? 'center' : 'stretch',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', borderColor: colors.lightGreen1 }
            }}>
                <CardMedia
                    component="img"
                    image={offer.imagine || "/images/default.jpg"}
                    alt={offer.nume}
                    onClick={() => handleViewDetails(offer.id!)}
                    sx={{
                        objectFit: 'cover',
                        cursor: 'pointer',
                        height: isList ? { xs: 200, sm: '100%' } : 140,
                        minHeight: isList ? { sm: 200 } : 'auto',
                        width: isList ? { xs: '100%', sm: 280 } : '100%',
                        flexShrink: 0
                    }}
                />

                {/* Containerul de text + butoane */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: isList ? { xs: 'column', sm: 'row' } : 'column',
                    flexGrow: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: isList ? 'center' : 'stretch',
                    p: isList ? 2 : 0
                }}>
                    <CardContent sx={{
                        flexGrow: 1,
                        pb: 1,
                        px: isList ? 3 : 1.5,
                        textAlign: isList ? 'left' : 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%'
                    }}>
                        <Typography
                            gutterBottom
                            variant={isList ? "h5" : "subtitle1"}
                            fontWeight="bold"
                            color={colors.white1}
                            sx={{
                                lineHeight: 1.2,
                                mb: 1,
                                minHeight: isList ? 'auto' : '2.4em',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }}
                        >
                            {offer.nume}
                        </Typography>

                        {/* --- ZONA PREȚ ȘI REDUCERE --- */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isList ? 'flex-start' : 'center',
                            mb: 1.5
                        }}>
                            {/* Dacă abonamentul e mai ieftin decât pachetul standard */}
                            {hasDiscount && (
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: colors.white2, opacity: 0.7 }}>
                                        {standardPrice.toFixed(2)} RON
                                    </Typography>
                                    <Chip
                                        label={`Extra -${discountPercent}%`}
                                        size="small"
                                        sx={{
                                            height: '20px',
                                            fontSize: '0.7rem',
                                            bgcolor: 'rgba(46, 125, 50, 0.2)',
                                            color: '#81c784',
                                            border: '1px solid #2e7d32'
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Prețul de Abonament */}
                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                <Chip
                                    icon={<MonetizationOnIcon sx={{ fontSize: '1rem !important', color: colors.darkGreen2 + '!important' }} />}
                                    label={`${subscriptionPrice} RON`}
                                    size="small"
                                    sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2, fontWeight: 'bold' }}
                                />
                                {/* Afișăm frecvența (ex: / săptămână) pentru claritate */}
                                <Typography variant="caption" sx={{ color: colors.white2 }}>
                                    / {offer.frecventaLivrare || 7} zile
                                </Typography>
                            </Box>
                        </Box>

                        {offer.descriere && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: colors.white2,
                                    opacity: 0.7,
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    minHeight: '2.6em'
                                }}
                            >
                                {offer.descriere}
                            </Typography>
                        )}
                    </CardContent>

                    {/* Zona Butoane */}
                    <Box sx={{ p: isList ? 0 : 1.5, pt: 0, display: 'flex', flexDirection: 'column', gap: 1, width: isList ? 'auto' : '100%', minWidth: isList ? '200px' : 'auto', justifyContent: 'center' }}>
                        <Button fullWidth variant="outlined" size="small" startIcon={<GroupIcon fontSize="small"/>} onClick={() => handleViewSubscribers(offer.id!, offer.nume)} sx={{ color: colors.white1, borderColor: colors.lightGreen1Transparent, borderRadius: '0.6rem', '&:hover': { borderColor: colors.lightGreen1, bgcolor: 'rgba(255,255,255,0.05)' } }}>Vezi Abonați</Button>
                        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                            <Button variant="outlined" size="small" onClick={() => handleEditClick(offer)} sx={{ flex: 1, color: colors.lightGreen1, borderColor: colors.lightGreen1Transparent, borderRadius: '0.6rem' }}><EditIcon fontSize="small" /> Editează</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleDeleteOffer(offer.id!)} sx={{ flex: 1, borderRadius: '0.6rem', borderColor: 'rgba(211, 47, 47, 0.5)' }}><DeleteOutlineIcon fontSize="small" /> Șterge</Button>
                        </Box>
                    </Box>
                </Box>
            </Card>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, color: colors.white1, minHeight: '80vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box><Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>Abonamente & Clienți</Typography><Typography variant="body2" sx={{ color: colors.white2, opacity: 0.8 }}>Administrează ofertele.</Typography></Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton onClick={fetchData} sx={{ color: colors.lightGreen1, border: `1px solid ${colors.lightGreen1Transparent}` }}><RefreshIcon /></IconButton>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setIsCreateModalOpen(true)} sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2, borderRadius: '1rem', fontWeight: 'bold', '&:hover': { bgcolor: colors.lightGreen2 } }}>Ofertă Nouă</Button>
                </Box>
            </Box>

            <Card sx={{ width: "100%", p: 4, mb: 4, bgcolor: colors.darkGreen2, border: `1px solid ${colors.lightGreen1Transparent}`, borderRadius: '1.5rem' }}>
                <SearchBar placeholder="Caută abonamente..." value={search} onChange={setSearch} />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                    <FilterSelect label="Preț Min" value={selectedMinPrice} options={[{ value: "", label: "-" }, ...Array.from({ length: 20 }, (_, i) => ({ value: String(i * 10), label: `${i * 10} RON` } ))]} onChange={(e: any) => setSelectedMinPrice(e.target.value)} />
                    <FilterSelect label="Preț Max" value={selectedMaxPrice} options={[{ value: "", label: "-" }, ...Array.from({ length: 20 }, (_, i) => ({ value: String(i * 10), label: `${i * 10} RON` } ))]} onChange={(e: any) => setSelectedMaxPrice(e.target.value)} />
                    <FilterSelect label="Sortare" value={selectedSort} options={sortOptions} onChange={(e: any) => setSelectedSort(e.target.value)} />
                </Box>
            </Card>

            <Box sx={{ mt: 2, mb: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <IconButton onClick={() => setViewType("grid")} sx={{ bgcolor: viewType === "grid" ? colors.lightGreen1 : "transparent", color: viewType === "grid" ? colors.darkGreen2 : colors.white2, border: `1px solid ${colors.lightGreen1Transparent}` }}><GridViewIcon /></IconButton>
                <IconButton onClick={() => setViewType("list")} sx={{ bgcolor: viewType === "list" ? colors.lightGreen1 : "transparent", color: viewType === "list" ? colors.darkGreen2 : colors.white2, border: `1px solid ${colors.lightGreen1Transparent}` }}><ViewListIcon /></IconButton>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
                : filteredOffers.length === 0 ? <Typography align="center" sx={{ color: colors.white2, mt: 4 }}>Nu ai găsit niciun abonament.</Typography>
                    : (
                        // === GRID CONTAINER CU ALIGN ITEMS STRETCH ===
                        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                            {filteredOffers.map((offer) => (
                                <Grid item
                                    // [FIX] display: flex pe Grid item pentru ca Cardul copil să se întindă
                                      sx={{ display: 'flex' }}
                                      xs={viewType === 'grid' ? 6 : 12}
                                      sm={viewType === 'grid' ? 4 : 12}
                                      md={viewType === 'grid' ? 3 : 12}
                                      key={offer.id}
                                >
                                    {renderSubscriptionCard(offer, viewType === 'list')}
                                </Grid>
                            ))}
                        </Grid>
                    )}

            <CreateSubscriptionModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveSubscription} existingPackages={allPackages} />
            <EditSubscriptionModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} targetPackage={targetPackage} onSave={handleSaveSubscription} />
            <ViewSubscribersModal open={!!viewSubscribersId} onClose={() => setViewSubscribersId(null)} pachetId={viewSubscribersId} pachetNume={viewSubscribersName} />
        </Container>
    );
};

export default ProducerSubscriptionsPage;