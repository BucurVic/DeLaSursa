import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    MenuItem,
    Select,
    IconButton,
    InputAdornment,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock'; // Am importat iconita de lacăt
import { colors } from '../theme';
import type { PachetDTO, SubscriptionOfferDTO } from '../common/types';

// --- STILURI CUSTOM ---
const inputStyles = {
    "& .MuiInputBase-root": {
        backgroundColor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        "& fieldset": { border: "none" },
        "&:hover": { border: `1px solid ${colors.lightGreen1}` },
        "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
        // Stil specific pentru DISABLED (ca să se vadă textul pe dark mode)
        "&.Mui-disabled": {
            opacity: 0.7,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            border: `1px solid ${colors.lightGreen1Transparent}`
        }
    },
    "& .MuiInputBase-input": {
        color: colors.white1,
        // Asigură că textul rămâne alb și când e disabled
        "&.Mui-disabled": {
            "-webkit-text-fill-color": colors.white2,
            color: colors.white2
        }
    },
    "& .MuiSelect-icon": { color: colors.lightGreen1 },
    "& .MuiFormLabel-root": { color: colors.white2 },
    "& .MuiFormLabel-root.Mui-focused": { color: colors.lightGreen1 }
};

interface EditSubscriptionModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: SubscriptionOfferDTO) => void;
    targetPackage: PachetDTO | null;
}

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
                                                                         open,
                                                                         onClose,
                                                                         onSave,
                                                                         targetPackage
                                                                     }) => {
    // State local pentru formular
    const [formData, setFormData] = useState({
        nume: '',
        imagine: '',
        descriere: '',
        pretTotal: '',
        pretAbonament: '',
        frecventa: '7'
    });

    // Populăm formularul
    useEffect(() => {
        if (open && targetPackage) {
            setFormData({
                nume: targetPackage.nume || '',
                imagine: targetPackage.imagine || '',
                descriere: targetPackage.descriere || '',
                pretTotal: targetPackage.pretTotal ? targetPackage.pretTotal.toString() : '',
                pretAbonament: targetPackage.pretAbonament ? targetPackage.pretAbonament.toString() : '',
                frecventa: targetPackage.frecventaLivrare ? targetPackage.frecventaLivrare.toString() : '7'
            });
        }
    }, [open, targetPackage]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!targetPackage) return;

        // Construim payload-ul combinând datele vechi cu cele noi
        const payload = {
            // 1. Păstrăm baza (ID, produse, producerId etc.)
            ...targetPackage,

            // 2. SUPRASCRIEM explicit câmpurile editabile
            // Backend-ul ia valoarea de aici, indiferent ce era în targetPackage
            nume: formData.nume,
            imagine: formData.imagine,
            descriere: formData.descriere,

            // Convertim la numere
            pretTotal: Number(formData.pretTotal),
            pretAbonament: Number(formData.pretAbonament),

            // --- FIX CRITIC ---
            // State-ul tău se numește 'frecventa', dar Backend-ul așteaptă 'frecventaLivrare'
            frecventaLivrare: Number(formData.frecventa),

            // Ne asigurăm că produsele nu se pierd
            produse: targetPackage.produse || []
        };

        console.log("Se trimite la update:", payload); // Debug în consolă
        onSave(payload);
        // onClose(); <--- Sfat: Mută asta în componenta părinte (după succes), sau las-o aici dacă vrei optimistic UI
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
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
                        Editează Abonament
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: colors.white2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>

                {/* 1. NUME ȘI DESCRIERE */}
                <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Nume Pachet</Typography>
                        <TextField
                            fullWidth
                            value={formData.nume}
                            onChange={(e) => handleChange('nume', e.target.value)}
                            sx={inputStyles}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Descriere Scurtă</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.descriere}
                            onChange={(e) => handleChange('descriere', e.target.value)}
                            sx={inputStyles}
                        />
                    </Box>
                </Box>

                {/* 2. IMAGINE */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Link Imagine (URL)</Typography>
                    <TextField
                        fullWidth
                        value={formData.imagine}
                        onChange={(e) => handleChange('imagine', e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><UploadFileIcon sx={{ color: colors.white2 }} /></InputAdornment>
                        }}
                        sx={inputStyles}
                    />
                </Box>

                {/* 3. PREȚURI ȘI FRECVENȚĂ */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Preț Standard (RON)</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            value={formData.pretTotal}
                            // --- MODIFICARE: Câmpul este DISABLED ---
                            disabled
                            InputProps={{
                                // Adăugăm un lacăt vizual
                                endAdornment: <InputAdornment position="end"><LockIcon fontSize="small" sx={{ color: colors.white2, opacity: 0.5 }} /></InputAdornment>
                            }}
                            sx={inputStyles}
                        />
                        <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.5, fontSize: '0.7rem', ml: 1 }}>
                            (Calculat automat din produse)
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: colors.lightGreen1, fontWeight: 'bold', mb: 0.5 }}>Preț Abonament (Redus)</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            placeholder="Optional"
                            value={formData.pretAbonament}
                            onChange={(e) => handleChange('pretAbonament', e.target.value)}
                            sx={{
                                ...inputStyles,
                                "& .MuiInputBase-root": {
                                    ...inputStyles["& .MuiInputBase-root"],
                                    border: `1px solid ${colors.lightGreen1}`
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Frecvență Livrare</Typography>
                        <Select
                            fullWidth
                            value={formData.frecventa}
                            onChange={(e) => handleChange('frecventa', e.target.value)}
                            sx={inputStyles["& .MuiInputBase-root"]}
                            MenuProps={{ PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1 } } }}
                        >
                            <MenuItem value="7">Săptămânal (7 zile)</MenuItem>
                            <MenuItem value="14">Bi-Săptămânal (14 zile)</MenuItem>
                            <MenuItem value="30">Lunar (30 zile)</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: `1px solid ${colors.lightGreen1Transparent}` }}>
                <Button onClick={onClose} sx={{ color: colors.white2, textTransform: 'none' }}>
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
                        px: 4,
                        '&:hover': { bgcolor: colors.lightGreen2 }
                    }}
                >
                    Salvează Modificările
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSubscriptionModal;