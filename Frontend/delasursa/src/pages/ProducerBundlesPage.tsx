import React, { useContext, useState, useEffect, useMemo } from 'react';
import {
    Box,
    Card,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Typography,
    Container,
    Button,
    CardMedia,
    CardContent,
    Chip,
    CircularProgress,
    Alert,
    Snackbar
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";

// --- API & TYPES ---
import { pacheteApi } from "../api/pacheteApi";
import { produseApi } from "../api/produseApi";
import type { BundleData } from "../types/BundleData.ts";
import type { PachetDTO, ProdusDTO } from "../common/types";

// --- MODAL IMPORTS ---
import EditBundleModal from "../components/EditBundleModal";
import CreateBundleModal from "../components/CreateBundleModal"; // <--- IMPORT NOU

// --- MAPPER HELPER ACTUALIZAT ---
const mapBackendToFrontend = (pachet: PachetDTO): BundleData & { originalPrice: number } => {
    const originalPrice = pachet.produse
        ? pachet.produse.reduce((acc, item) => acc + ((item.pretUnitar || 0) * (item.cantitate || 1)), 0)
        : (pachet.pretTotal || 0);

    return {
        id: pachet.id?.toString() || "",
        title: pachet.nume,
        price: pachet.pretTotal,
        originalPrice: originalPrice,
        currency: "RON",
        producer: pachet.producatorNume,
        image: pachet.imagine,
        items: pachet.produse ? pachet.produse.map((item) => ({
            name: item.numeProdus || "",
            quantity: `${item.cantitate} ${item.unitateMasura || 'buc'}`,
        })) : [],
    };
};

// --- STILURI ---
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
    { value: "name-desc", label: "Nume Z→A" }
];

// --- COMPONENTA FILTER ---
const FilterSelect: React.FC<any> = ({ label, value, options, onChange }) => (
    <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" }, minWidth: 150 }}>
        <Typography sx={labelStyles}>{label}</Typography>
        <Select fullWidth value={value} onChange={onChange} displayEmpty sx={filterInputStyles} MenuProps={{ PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1 } } }}>
            {options.map((opt: any) => <MenuItem key={opt.value} value={opt.value}>{opt.label === "-" ? <span style={{ opacity: 0.5 }}>-</span> : opt.label}</MenuItem>)}
        </Select>
    </Box>
);

export default function ProducerBundlesPage() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- STATE DATE ---
    const [bundles, setBundles] = useState<BundleData[]>([]);
    const [myProducts, setMyProducts] = useState<ProdusDTO[]>([]);
    const [loading, setLoading] = useState(true);

    // State pentru mesaje globale (Erori / Succes)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // --- STATE FILTRE ---
    const [search, setSearch] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    // --- STATE MODALE ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // <--- STATE NOU CREATE
    const [targetBundle, setTargetBundle] = useState<PachetDTO | null>(null);

    const producerId = token ? Number(jwtDecode<DecodedJwt>(token).id) : null;

    // --- FETCH DATA ---
    const fetchBundles = async () => {
        if (!producerId) return;
        try {
            setLoading(true);
            const response = await pacheteApi.getByProducator(producerId);
            const mappedData = response.data.content.map(mapBackendToFrontend);
            setBundles(mappedData);
        } catch (error) {
            console.error(error);
            setErrorMessage("Nu am putut încărca pachetele.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMyProducts = async () => {
        if (!producerId) return;
        try {
            const response = await produseApi.getByProducator(producerId, 0, 1000);
            let rawData: any[] = [];
            if ((response.data as any).content) {
                rawData = (response.data as any).content;
            } else if (Array.isArray(response.data)) {
                rawData = response.data;
            }

            const mappedProducts: ProdusDTO[] = rawData.map((p: any) => ({
                id: p.id,
                nume: p.produsName || p.nume || "Produs Fără Nume",
                pret: p.pret,
                unitateMasura: p.unitate_masura || p.unitateMasura || 'buc',
                cantitate: p.cantitate,
                imagine: p.produsImagine || p.imagine,
                categorie: p.categorie
            }));

            setMyProducts(mappedProducts);
        } catch (e) {
            console.error("Nu am putut încărca produsele pentru modal", e);
        }
    };

    useEffect(() => {
        fetchBundles();
        fetchMyProducts();
    }, [producerId]);

    // --- HANDLERS ---

    // 1. Deschide Modal Creare
    const handleCreateClick = () => {
        setIsCreateModalOpen(true);
    };

    // 2. Salvează Pachet Nou
    const handleSaveNewBundle = async (newBundleData: any) => {
        try {
            // Adăugăm ID-ul producătorului la datele care vin din modal
            const payload = {
                ...newBundleData,
                producatorId: producerId
            };

            await pacheteApi.create(payload);

            setIsCreateModalOpen(false);
            setSuccessMessage("Pachet creat cu succes!");
            fetchBundles(); // Refresh listă
        } catch (e) {
            console.error(e);
            setErrorMessage("Eroare la crearea pachetului.");
        }
    };

    // 3. Editare Existentă
    const handleEditBundle = async (id: string) => {
        try {
            const res = await pacheteApi.getById(Number(id));
            setTargetBundle(res.data);
            setIsEditModalOpen(true);
        } catch (e) {
            console.error(e);
            setErrorMessage("Nu s-au putut încărca detaliile pachetului.");
        }
    };

    const handleSaveBundleChanges = async (updatedData: PachetDTO) => {
        try {
            if (!updatedData.id) return;
            await pacheteApi.update(updatedData.id, updatedData);
            setIsEditModalOpen(false);
            setSuccessMessage("Pachet actualizat cu succes!");
            fetchBundles();
        } catch (e) {
            console.error(e);
            setErrorMessage("Eroare la actualizarea pachetului.");
        }
    };

    // 4. Ștergere
    const handleDeleteBundle = async (id: string) => {
        if(!window.confirm("Sigur ștergi acest pachet?")) return;
        try {
            await pacheteApi.delete(Number(id));
            setSuccessMessage("Pachet șters cu succes.");
            fetchBundles();
        } catch(error: any) {
            console.error("Eroare la ștergere:", error);
            const serverMsg = error.response?.data?.message || error.response?.data || "A apărut o eroare la ștergere.";
            setErrorMessage(serverMsg);
        }
    };

    const handleViewDetails = (id: string) => { navigate(`/pachete/${id}`); };

    // --- FILTRARE ---
    const filteredBundles = useMemo(() => {
        let result = [...bundles];
        if (search.trim()) result = result.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
        if (selectedMinPrice) result = result.filter((b) => b.price >= Number(selectedMinPrice));
        if (selectedMaxPrice) result = result.filter((b) => b.price <= Number(selectedMaxPrice));
        switch (selectedSort) {
            case "price-asc": result.sort((a, b) => a.price - b.price); break;
            case "price-desc": result.sort((a, b) => b.price - a.price); break;
            case "name-asc": result.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "name-desc": result.sort((a, b) => b.title.localeCompare(a.title)); break;
        }
        return result;
    }, [bundles, search, selectedMinPrice, selectedMaxPrice, selectedSort]);

    // --- CARD RENDERER ---
    const renderCardContent = (bundle: BundleData & { originalPrice?: number }, isList: boolean) => {
        const originalPrice = bundle.originalPrice || 0;
        const hasDiscount = originalPrice > bundle.price;
        const discountPercent = hasDiscount
            ? Math.round(((originalPrice - bundle.price) / originalPrice) * 100)
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
                    image={bundle.image}
                    alt={bundle.title}
                    onClick={() => handleViewDetails(bundle.id)}
                    sx={{
                        objectFit: 'cover',
                        cursor: 'pointer',
                        height: isList ? { xs: 200, sm: '100%' } : 140,
                        minHeight: isList ? { sm: 200 } : 'auto',
                        width: isList ? { xs: '100%', sm: 280 } : '100%',
                        flexShrink: 0
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: isList ? { xs: 'column', sm: 'row' } : 'column',
                    flexGrow: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: isList ? 'center' : 'stretch',
                    p: isList ? 2 : 0
                }}>
                    <CardContent sx={{ flexGrow: 1, pb: 1, px: isList ? 3 : 1.5, textAlign: isList ? 'left' : 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
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
                            {bundle.title}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isList ? 'flex-start' : 'center', mb: 1.5 }}>
                            {hasDiscount && (
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: colors.white2, opacity: 0.7 }}>
                                        {originalPrice.toFixed(2)} RON
                                    </Typography>
                                    <Chip label={`-${discountPercent}%`} size="small" sx={{ height: '20px', fontSize: '0.7rem', bgcolor: 'rgba(46, 125, 50, 0.2)', color: '#81c784', border: '1px solid #2e7d32' }} />
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                <Chip icon={<MonetizationOnIcon sx={{ fontSize: '1rem !important', color: colors.darkGreen2 + '!important' }} />} label={`${bundle.price} RON`} size="small" sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2, fontWeight: 'bold' }} />
                                <Chip label={`${bundle.items.length} Prod.`} size="small" variant="outlined" sx={{ color: colors.white2, borderColor: colors.white2 }} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: isList ? 'flex-start' : 'center', maxHeight: '40px', overflow: 'hidden' }}>
                            {bundle.items.slice(0, 3).map((item, idx) => (
                                <Typography key={idx} variant="caption" sx={{ color: colors.white2, opacity: 0.7 }}>{item.name}{idx < Math.min(bundle.items.length, 3) - 1 ? ", " : ""}</Typography>
                            ))}
                            {bundle.items.length > 3 && <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.5 }}>+{bundle.items.length - 3}...</Typography>}
                        </Box>
                    </CardContent>

                    <Box sx={{ p: isList ? 0 : 1.5, pt: 0, display: 'flex', flexDirection: 'column', gap: 1, width: isList ? 'auto' : '100%', minWidth: isList ? '200px' : 'auto', justifyContent: 'center' }}>
                        <Button fullWidth variant="outlined" size="small" onClick={() => handleEditBundle(bundle.id)} startIcon={<EditIcon fontSize="small" />} sx={{ color: colors.lightGreen1, borderColor: colors.lightGreen1Transparent, borderRadius: '0.6rem', '&:hover': { borderColor: colors.lightGreen1, bgcolor: 'rgba(255,255,255,0.05)' } }}>Editează</Button>
                        <Button fullWidth variant="outlined" size="small" color="error" onClick={() => handleDeleteBundle(bundle.id)} startIcon={<DeleteOutlineIcon fontSize="small" />} sx={{ borderRadius: '0.6rem', borderColor: 'rgba(211, 47, 47, 0.5)', '&:hover': { borderColor: '#d32f2f', bgcolor: 'rgba(211, 47, 47, 0.1)' } }}>Șterge</Button>
                    </Box>
                </Box>
            </Card>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, color: colors.white1, minHeight: '80vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box><Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>Pachetele Mele</Typography><Typography variant="body2" sx={{ color: colors.white2, opacity: 0.8 }}>Gestionează stocul.</Typography></Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton onClick={fetchBundles} sx={{ color: colors.lightGreen1, border: `1px solid ${colors.lightGreen1Transparent}` }}><RefreshIcon /></IconButton>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateClick} sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2, borderRadius: '1rem', fontWeight: 'bold', '&:hover': { bgcolor: colors.lightGreen2 } }}>Pachet Nou</Button>
                </Box>
            </Box>
            <Card sx={{ width: "100%", p: 4, mb: 4, bgcolor: colors.darkGreen2, border: `1px solid ${colors.lightGreen1Transparent}`, borderRadius: '1.5rem' }}>
                <SearchBar placeholder="Caută pachete..." value={search} onChange={setSearch} />
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

            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
                : filteredBundles.length === 0 ? <Typography align="center" sx={{ color: colors.white2, mt: 4 }}>Nu ai creat pachete.</Typography>
                    : (
                        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                            {filteredBundles.map((bundle) => (
                                <Grid item
                                      sx={{ display: 'flex' }}
                                      xs={viewType === 'grid' ? 6 : 12}
                                      sm={viewType === 'grid' ? 4 : 12}
                                      md={viewType === 'grid' ? 3 : 12}
                                      key={bundle.id}
                                >
                                    {renderCardContent(bundle, viewType === 'list')}
                                </Grid>
                            ))}
                        </Grid>
                    )}

            {/* --- MODAL EDITARE --- */}
            <EditBundleModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveBundleChanges}
                targetBundle={targetBundle}
                availableProducts={myProducts}
            />

            {/* --- MODAL CREARE (NOU) --- */}
            <CreateBundleModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleSaveNewBundle}
                availableProducts={myProducts}
            />

            {/* --- SNACKBAR --- */}
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

        </Container>
    );
}