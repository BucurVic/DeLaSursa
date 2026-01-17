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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Iconița principală
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { colors } from '../theme';
import type { ProdusDTO } from '../common/types';

// --- STILURI (Identice cu EditBundleModal) ---
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

interface CreateBundleModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    availableProducts: ProdusDTO[];
}

interface SelectedProduct {
    uniqueId: number;
    nume: string;
    pretUnitar: number;
    cantitate: number;
    unitateMasura: string;
}

const CreateBundleModal: React.FC<CreateBundleModalProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 onSave,
                                                                 availableProducts
                                                             }) => {
    // State pentru formular (pornește gol)
    const [formData, setFormData] = useState({
        nume: '',
        imagine: '',
        descriere: '',
        pretVanzare: '',
    });

    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const [productToAddId, setProductToAddId] = useState<string>("");

    // Resetăm formularul când se deschide modalul
    useEffect(() => {
        if (open) {
            setFormData({
                nume: '',
                imagine: '',
                descriere: '',
                pretVanzare: ''
            });
            setSelectedProducts([]);
            setProductToAddId("");
        }
    }, [open]);

    // --- LOGICA DE CALCUL (Identică) ---
    const valoareRealaProduse = useMemo(() => {
        return selectedProducts.reduce((acc, curr) => acc + (curr.pretUnitar * curr.cantitate), 0);
    }, [selectedProducts]);

    const discount = useMemo(() => {
        const pretSetat = Number(formData.pretVanzare) || 0;
        if (valoareRealaProduse <= 0) return 0;
        return valoareRealaProduse - pretSetat;
    }, [valoareRealaProduse, formData.pretVanzare]);

    // --- HANDLERS (Identici) ---
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
        // Construim payload-ul pentru creare (fără ID, că e nou)
        const payload = {
            nume: formData.nume,
            imagine: formData.imagine,
            descriere: formData.descriere,
            pretTotal: Number(formData.pretVanzare),
            eAbonament: false, // Explicit nu e abonament, e pachet simplu
            produse: selectedProducts.map(sp => ({
                idProdusProducator: sp.uniqueId,
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
                    maxWidth: '900px',
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
                    <AddCircleOutlineIcon sx={{ color: colors.lightGreen1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
                        Creează Pachet Nou
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: colors.white2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                <Grid container spacing={4}>

                    {/* --- COLOANA STÂNGA (DETALII) --- */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: colors.white2, ml: 1 }}>Nume Pachet</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Ex: Coșul de Toamnă"
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
                                    placeholder="Descrie ce conține pachetul..."
                                    value={formData.descriere}
                                    onChange={(e) => setFormData({ ...formData, descriere: e.target.value })}
                                    sx={inputStyles}
                                />
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: colors.white2, ml: 1 }}>Imagine URL</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="https://..."
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
                                    placeholder="0.00"
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

                            <Box sx={{ mt: 2, minHeight: '80px', display: 'flex', alignItems: 'center' }}>
                                {valoareRealaProduse > 0 ? (
                                    discount > 0 ? (
                                        <Alert severity="success" sx={{ width: '100%', bgcolor: 'rgba(46, 125, 50, 0.2)', color: '#81c784', border: '1px solid #2e7d32', py: 0.5, fontSize: '0.85rem' }}>
                                            Excelent! Clientul economisește <strong>{discount.toFixed(2)} RON</strong>.
                                        </Alert>
                                    ) : (
                                        <Alert severity="warning" sx={{ width: '100%', bgcolor: 'rgba(237, 108, 2, 0.1)', color: '#ffb74d', border: '1px solid #ed6c02', py: 0.5, fontSize: '0.85rem' }}>
                                            Prețul este mai mare / egal ca suma produselor.
                                        </Alert>
                                    )
                                ) : (
                                    <Typography variant="caption" color={colors.white2} sx={{ fontStyle: 'italic', opacity: 0.7 }}>
                                        Adaugă produse pentru a calcula reducerea.
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* --- COLOANA DREAPTA (CONȚINUT) --- */}
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
                                    <Typography variant="caption" color={colors.white2}>Începe prin a adăuga produse din meniul de sus.</Typography>
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
                                                {prod.nume}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.7 }}>
                                                Preț unitar: {prod.pretUnitar} RON / {prod.unitateMasura || 'buc'}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <TextField
                                                type="number"
                                                size="small"
                                                value={prod.cantitate}
                                                onChange={(e) => handleQuantityChange(prod.uniqueId, e.target.value)}
                                                sx={{ ...inputStyles, width: '90px' }}
                                                InputProps={{
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
                    // Dezactivăm butonul dacă nu avem nume sau preț
                    disabled={!formData.nume || !formData.pretVanzare || selectedProducts.length === 0}
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        px: 4,
                        py: 1,
                        borderRadius: '0.8rem',
                        '&:hover': { bgcolor: colors.lightGreen2 },
                        '&:disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                    }}
                >
                    Creează Pachet
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBundleModal;