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
    Alert,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { colors } from '../theme';
import type { Pachet, SubscriptionOfferDTO } from '../common/types';

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
    "& .MuiFormLabel-root.Mui-focused": { color: colors.lightGreen1 },
    "& .MuiInputBase-input.Mui-disabled": {
        color: colors.white2,
        WebkitTextFillColor: colors.white2,
        opacity: 0.7,
        fontStyle: 'italic'
    }
};

interface CreateSubscriptionModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: SubscriptionOfferDTO) => void;
    existingPackages: Pachet[];
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
                                                                             open, onClose, onSave, existingPackages
                                                                         }) => {

    const [selectedPackageId, setSelectedPackageId] = useState<string>("");

    // Configurare Ofertă
    const [description, setDescription] = useState("");
    const [standardPrice, setStandardPrice] = useState<string>("");
    const [subscriptionPrice, setSubscriptionPrice] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("7");

    // --- STATE PENTRU DATELE ORIGINALE ---
    const [pkgName, setPkgName] = useState("");
    const [pkgImage, setPkgImage] = useState("");
    const [pkgProducts, setPkgProducts] = useState<any[]>([]);

    // Validare
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    // Resetare la deschidere
    useEffect(() => {
        if (open) {
            setSelectedPackageId("");
            setDescription("");
            setStandardPrice("");
            setSubscriptionPrice("");
            setFrequency("7");
            setPkgName("");
            setPkgImage("");
            setPkgProducts([]);
            setWarningMessage(null);
        }
    }, [open]);

    // --- HANDLER: SELECTARE PACHET ---
    const handlePackageSelect = (id: string) => {
        setSelectedPackageId(id);
        const pkg = existingPackages.find(p => p.id === Number(id));

        if (pkg) {
            setStandardPrice(pkg.pretTotal ? pkg.pretTotal.toString() : "");
            setDescription(pkg.descriere || "");

            // Salvăm datele critice
            setPkgName(pkg.nume || "");
            setPkgImage(pkg.imagine || "");

            // --- FIX TS2339: Folosim (pkg as any) pentru a accesa 'produse' ---
            // Dacă 'produse' nu există pe tipul Pachet, îl forțăm aici
            const produseExistente = (pkg as any).produse || [];
            setPkgProducts(produseExistente);

            if (pkg.eAbonament) {
                setWarningMessage(`Pachetul "${pkg.nume}" este deja activ ca abonament. Modificările vor actualiza oferta.`);
                setSubscriptionPrice(pkg.pretAbonament ? pkg.pretAbonament.toString() : (pkg.pretTotal ? pkg.pretTotal.toString() : ""));
                setFrequency(pkg.frecventaLivrare ? pkg.frecventaLivrare.toString() : "7");
            } else {
                setWarningMessage(null);
                setSubscriptionPrice("");
                setFrequency("7");
            }
        }
    };

    // --- HANDLER: SAVE ---
    const handleSubmit = () => {
        if (!selectedPackageId) return;

        const std = Number(standardPrice);
        const sub = Number(subscriptionPrice);

        if (sub >= std && std > 0) {
            if(!window.confirm("Prețul de abonament este mai mare sau egal cu prețul standard. Continui?")) {
                return;
            }
        }

        // --- FIX: Folosim 'any' pentru DTO pentru a permite câmpul 'produse' ---
        const dto: any = {
            isNewPachet: false,
            pachetId: Number(selectedPackageId),

            // Datele de update esențiale
            numePachetNou: pkgName,
            imaginePachetNou: pkgImage,
            produse: pkgProducts, // <--- Lista de produse pe care am salvat-o mai sus

            pret: Number(standardPrice),
            pretAbonament: Number(subscriptionPrice),
            frecventa: Number(frequency),
            descriere: description
        };

        onSave(dto);
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
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
                    Activează Abonament
                </Typography>
                <IconButton onClick={onClose} sx={{ color: colors.white2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 3 }}>
                {/* 1. SELECTARE PACHET */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Selectează Pachetul din Stoc</Typography>
                    <Select
                        fullWidth
                        value={selectedPackageId}
                        onChange={(e) => handlePackageSelect(e.target.value)}
                        displayEmpty
                        sx={inputStyles["& .MuiInputBase-root"]}
                        MenuProps={{ PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1 } } }}
                    >
                        <MenuItem value="" disabled><span style={{ opacity: 0.7 }}>Alege un pachet...</span></MenuItem>
                        {existingPackages.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.nume} {p.eAbonament ? "(Activ)" : ""}
                            </MenuItem>
                        ))}
                    </Select>

                    {warningMessage && (
                        <Alert
                            severity="warning"
                            icon={<WarningAmberIcon fontSize="inherit" />}
                            sx={{ mt: 2, bgcolor: 'rgba(255, 167, 38, 0.1)', color: '#ffb74d', border: '1px solid #ffb74d' }}
                        >
                            {warningMessage}
                        </Alert>
                    )}
                </Box>

                {/* 2. DESCRIERE */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Mesaj pentru Abonați (Descriere)</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Ex: Primești acest coș în fiecare marți..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={inputStyles}
                        disabled={!selectedPackageId}
                    />
                </Box>

                {/* 3. PREȚURI ȘI FRECVENȚĂ */}
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Preț Standard</Typography>
                        <TextField
                            fullWidth
                            value={standardPrice}
                            disabled
                            InputProps={{ endAdornment: <InputAdornment position="end" sx={{color: colors.white2}}>RON</InputAdornment> }}
                            sx={inputStyles}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="body2" sx={{ color: colors.lightGreen1, fontWeight: 'bold', mb: 0.5 }}>Preț Abonament</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            placeholder="0.00"
                            value={subscriptionPrice}
                            onChange={(e) => setSubscriptionPrice(e.target.value)}
                            disabled={!selectedPackageId}
                            InputProps={{ endAdornment: <InputAdornment position="end" sx={{color: colors.lightGreen1}}>RON</InputAdornment> }}
                            sx={{
                                ...inputStyles,
                                "& .MuiInputBase-root": {
                                    ...inputStyles["& .MuiInputBase-root"],
                                    border: `1px solid ${colors.lightGreen1}`
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="body2" sx={{ color: colors.white2, mb: 0.5 }}>Frecvență</Typography>
                        <Select
                            fullWidth
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            disabled={!selectedPackageId}
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
                    disabled={!selectedPackageId}
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        px: 4,
                        '&:hover': { bgcolor: colors.lightGreen2 },
                        '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                    }}
                >
                    Activează
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateSubscriptionModal;