import React, { useState, useEffect, useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Grid,
    Select,
    MenuItem,
    Paper,
    Alert,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { colors } from '../theme';
import type { PachetDTO, ProdusDTO } from '../common/types';

// --- STILURI ---
const inputStyles = {
    "& .MuiInputBase-root": {
        backgroundColor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        "& fieldset": { border: "none" },
        "&:hover": { border: `1px solid ${colors.lightGreen1}` },
        "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
    },
    "& .MuiInputBase-input": { color: colors.white1 },
    "& .MuiSelect-icon": { color: colors.lightGreen1 },
    "& .MuiFormLabel-root": { color: colors.white2 },
    "& .MuiFormLabel-root.Mui-focused": { color: colors.lightGreen1 }
};

interface EditBundleModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    targetBundle: PachetDTO | null;
    availableProducts: ProdusDTO[];
}

interface SelectedProduct {
    uniqueId: number;
    nume: string;
    pretUnitar: number;
    cantitate: number;
    unitateMasura: string;
}

const EditBundleModal: React.FC<EditBundleModalProps> = ({
                                                             open,
                                                             onClose,
                                                             onSave,
                                                             targetBundle,
                                                             availableProducts
                                                         }) => {
    const [formData, setFormData] = useState({
        nume: '',
        imagine: '',
        descriere: '',
        pretVanzare: '',
    });

    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const [productToAddId, setProductToAddId] = useState<string>("");

    useEffect(() => {
        if (open && targetBundle) {
            // DEBUG: Vedem ce date primim exact
            console.log("--- DEBUG EDIT MODAL ---");
            console.log("Pachet Tinta:", targetBundle);
            console.log("Produse in pachet:", targetBundle.produse);
            console.log("Produse Disponibile (Stoc):", availableProducts);

            setFormData({
                nume: targetBundle.nume || '',
                imagine: targetBundle.imagine || '',
                descriere: targetBundle.descriere || '',
                pretVanzare: targetBundle.pretTotal ? targetBundle.pretTotal.toString() : ''
            });

            const currentProducts: SelectedProduct[] = [];

            if (targetBundle.produse && Array.isArray(targetBundle.produse)) {
                targetBundle.produse.forEach(pItem => {
                    // 1. Identificăm ID-ul corect al produsului din pachet
                    // Verificăm ambele posibile denumiri (idProdusProducator sau idProdus) pentru siguranță
                    const itemId = pItem.idProdusProducator || (pItem as any).idProdus;

                    // 2. Încercăm să găsim produsul în lista completă de produse (availableProducts)
                    const fullProduct = availableProducts.find(ap => ap.id === itemId);

                    if (fullProduct) {
                        // CAZ A: Produsul există în stoc -> Luăm detaliile din stoc
                        currentProducts.push({
                            uniqueId: fullProduct.id!,
                            nume: fullProduct.nume,
                            pretUnitar: fullProduct.pret,
                            cantitate: pItem.cantitate || 1,
                            unitateMasura: fullProduct.unitateMasura
                        });
                    } else {
                        // CAZ B: Produsul NU a fost găsit în stoc (poate a fost șters sau ID-urile nu bat)
                        // Îl afișăm oricum folosind datele salvate în pachet (Snapshot)
                        console.warn(`Produsul cu ID ${itemId} nu a fost găsit în availableProducts. Folosim datele din pachet.`);

                        currentProducts.push({
                            uniqueId: itemId || Math.floor(Math.random() * 100000), // Fallback ID
                            nume: pItem.numeProdus || "Produs Necunoscut",
                            pretUnitar: pItem.pretUnitar || 0,
                            cantitate: pItem.cantitate || 1,
                            unitateMasura: pItem.unitateMasura || 'buc'
                        });
                    }
                });
            }

            console.log("Produse Mapate Final:", currentProducts);
            setSelectedProducts(currentProducts);
        }
    }, [open, targetBundle, availableProducts]);

    const valoareRealaProduse = useMemo(() => {
        return selectedProducts.reduce((acc, curr) => acc + (curr.pretUnitar * curr.cantitate), 0);
    }, [selectedProducts]);

    const discount = useMemo(() => {
        const pretSetat = Number(formData.pretVanzare) || 0;
        if (valoareRealaProduse <= 0) return 0;
        return valoareRealaProduse - pretSetat;
    }, [valoareRealaProduse, formData.pretVanzare]);

    const handleAddProduct = () => {
        const prodId = Number(productToAddId);
        const product = availableProducts.find(p => p.id === prodId);

        if (product) {
            const exists = selectedProducts.find(p => p.uniqueId === prodId);
            if (exists) {
                handleQuantityChange(prodId, (exists.cantitate + 1).toString());
            } else {
                setSelectedProducts(prev => [...prev, {
                    uniqueId: product.id!,
                    nume: product.nume,
                    pretUnitar: product.pret,
                    cantitate: 1,
                    unitateMasura: product.unitateMasura
                }]);
            }
            setProductToAddId("");
        }
    };

    const handleRemoveProduct = (id: number) => {
        setSelectedProducts(prev => prev.filter(p => p.uniqueId !== id));
    };

    const handleQuantityChange = (id: number, val: string) => {
        const qty = Number(val);
        if (qty < 1) return;
        setSelectedProducts(prev => prev.map(p => p.uniqueId === id ? { ...p, cantitate: qty } : p));
    };

    const handleSubmit = () => {
        if (!targetBundle) return;

        const payload = {
            ...targetBundle,
            nume: formData.nume,
            imagine: formData.imagine,
            descriere: formData.descriere,
            pretTotal: Number(formData.pretVanzare),
            produse: selectedProducts.map(sp => ({
                idProdusProducator: sp.uniqueId, // Mapăm înapoi la numele corect pentru Backend
                numeProdus: sp.nume,
                cantitate: sp.cantitate,
                unitateMasura: sp.unitateMasura,
                pretUnitar: sp.pretUnitar
            }))
        };

        onSave(payload);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '900px', // Lățime fixă
                    bgcolor: colors.darkGreen1,
                    color: colors.white1,
                    borderRadius: "1.5rem",
                    border: `1px solid ${colors.lightGreen1Transparent}`,
                    p: 2
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.lightGreen1Transparent}`, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EditIcon sx={{ color: colors.lightGreen1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
                        Editează Pachet
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: colors.white2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                <Grid container spacing={4}>

                    {/* --- COLOANA STÂNGA --- */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: colors.white2, ml: 1 }}>Nume Pachet</Typography>
                                <TextField
                                    fullWidth
                                    value={formData.nume}
                                    onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                                    sx={inputStyles}
                                />
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: colors.white2, ml: 1 }}>Descriere</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={formData.descriere}
                                    onChange={(e) => setFormData({ ...formData, descriere: e.target.value })}
                                    sx={inputStyles}
                                />
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: colors.white2, ml: 1 }}>Imagine URL</Typography>
                                <TextField
                                    fullWidth
                                    value={formData.imagine}
                                    onChange={(e) => setFormData({ ...formData, imagine: e.target.value })}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><UploadFileIcon sx={{ color: colors.white2 }} /></InputAdornment>
                                    }}
                                    sx={inputStyles}
                                />
                            </Box>
                        </Box>

                        <Paper sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: `1px solid ${colors.lightGreen1Transparent}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <CalculateIcon sx={{ color: colors.lightGreen1 }} />
                                <Typography variant="subtitle1" fontWeight="bold" color={colors.white1}>Calculator Preț</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: colors.white2 }}>Valoare Produse (Referință):</Typography>
                                <Typography variant="body2" sx={{ color: colors.white2, fontWeight: 'bold' }}>{valoareRealaProduse.toFixed(2)} RON</Typography>
                            </Box>

                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

                            <Box>
                                <Typography variant="caption" sx={{ color: colors.lightGreen1, fontWeight: 'bold', mb: 0.5, display: 'block' }}>
                                    Preț Vânzare Pachet (Setat Manual)
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={formData.pretVanzare}
                                    onChange={(e) => setFormData({ ...formData, pretVanzare: e.target.value })}
                                    sx={{
                                        ...inputStyles,
                                        "& .MuiInputBase-input": { fontSize: '1.2rem', fontWeight: 'bold', color: colors.lightGreen1 },
                                        "& .MuiInputBase-root": { border: `1px solid ${colors.lightGreen1}` }
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Typography color={colors.lightGreen1}>RON</Typography></InputAdornment>
                                    }}
                                />
                            </Box>

                            {/* --- FIX 2: Container cu înălțime fixă pentru a preveni săriturile --- */}
                            <Box sx={{ mt: 2, minHeight: '80px', display: 'flex', alignItems: 'center' }}>
                                {discount > 0 ? (
                                    <Alert severity="success" sx={{ width: '100%', bgcolor: 'rgba(46, 125, 50, 0.2)', color: '#81c784', border: '1px solid #2e7d32', py: 0.5, fontSize: '0.85rem' }}>
                                        Excelent! Clientul economisește <strong>{discount.toFixed(2)} RON</strong>.
                                    </Alert>
                                ) : (
                                    <Alert severity="warning" sx={{ width: '100%', bgcolor: 'rgba(237, 108, 2, 0.1)', color: '#ffb74d', border: '1px solid #ed6c02', py: 0.5, fontSize: '0.85rem' }}>
                                        Prețul este mai mare / egal ca suma produselor.
                                    </Alert>
                                )}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* --- COLOANA DREAPTA --- */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <ShoppingBasketIcon sx={{ color: colors.white2 }} />
                            <Typography variant="h6" sx={{ color: colors.white1 }}>Conținut Pachet</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            <Select
                                fullWidth
                                displayEmpty
                                value={productToAddId}
                                onChange={(e) => setProductToAddId(e.target.value)}
                                sx={inputStyles["& .MuiInputBase-root"]}
                                MenuProps={{ PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1, maxHeight: 300 } } }}
                            >
                                <MenuItem value="" disabled>
                                    <em>Selectează un produs din stoc...</em>
                                </MenuItem>
                                {availableProducts.map(p => (
                                    <MenuItem key={p.id} value={p.id}>
                                        {/* --- FIX AFIȘARE --- */}
                                        {p.nume} ({p.pret} RON / {p.unitateMasura})
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant="contained"
                                onClick={handleAddProduct}
                                disabled={!productToAddId}
                                sx={{
                                    bgcolor: colors.lightGreen1,
                                    color: colors.darkGreen2,
                                    minWidth: '50px',
                                    fontWeight: 'bold',
                                    '&:hover': { bgcolor: colors.lightGreen2 }
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Box>

                        <Box sx={{
                            maxHeight: '400px',
                            overflowY: 'auto',
                            pr: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}>
                            {selectedProducts.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 5, border: `1px dashed ${colors.white2}`, borderRadius: '1rem', opacity: 0.5 }}>
                                    <Typography color={colors.white1}>Pachetul este gol.</Typography>
                                    <Typography variant="caption" color={colors.white2}>Adaugă produse folosind meniul de sus.</Typography>
                                </Box>
                            ) : (
                                selectedProducts.map((prod) => (
                                    <Paper key={prod.uniqueId} sx={{
                                        p: 1.5,
                                        bgcolor: 'rgba(0,0,0,0.2)',
                                        border: `1px solid ${colors.lightGreen1Transparent}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderRadius: '0.8rem',
                                        transition: '0.2s',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }
                                    }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body1" sx={{ color: colors.white1, fontWeight: 'bold' }}>
                                                {/* Asigură-te că afișăm numele */}
                                                {prod.nume}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.7 }}>
                                                {/* --- FIX AFIȘARE UNITATE --- */}
                                                Preț unitar: {prod.pretUnitar} RON / {prod.unitateMasura || 'buc'}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <TextField
                                                type="number"
                                                size="small"
                                                // label="Cant." <--- Poți scoate label-ul dacă ocupă loc aiurea
                                                value={prod.cantitate}
                                                onChange={(e) => handleQuantityChange(prod.uniqueId, e.target.value)}
                                                sx={{ ...inputStyles, width: '90px' }}
                                                InputProps={{
                                                    // Adăugăm unitatea de măsură în dreapta inputului
                                                    endAdornment: <InputAdornment position="end">
                                                        <Typography variant="caption" sx={{ color: colors.white2 }}>
                                                            {prod.unitateMasura || 'buc'}
                                                        </Typography>
                                                    </InputAdornment>
                                                }}
                                            />

                                            <Box sx={{ textAlign: 'right', minWidth: '70px' }}>
                                                <Typography variant="body2" sx={{ color: colors.lightGreen1, fontWeight: 'bold' }}>
                                                    {(prod.pretUnitar * prod.cantitate).toFixed(2)}
                                                </Typography>
                                            </Box>

                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveProduct(prod.uniqueId)}
                                                sx={{ color: '#ef5350', bgcolor: 'rgba(239, 83, 80, 0.1)', '&:hover': { bgcolor: 'rgba(239, 83, 80, 0.2)' } }}
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                ))
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: `1px solid ${colors.lightGreen1Transparent}` }}>
                <Button onClick={onClose} sx={{ color: colors.white2, textTransform: 'none', fontSize: '1rem' }}>
                    Anulează
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        px: 4,
                        py: 1,
                        borderRadius: '0.8rem',
                        '&:hover': { bgcolor: colors.lightGreen2 }
                    }}
                >
                    Salvează Modificările
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBundleModal;