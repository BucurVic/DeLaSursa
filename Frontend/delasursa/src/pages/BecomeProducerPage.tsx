import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Container,
    MenuItem,
    InputAdornment,
    Stack,
    Alert,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';

import { colors, textResources, typography } from '../theme';
import { AuthContext } from '../context/AuthContext';

// --- DATE ---
const regions = [
    "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov",
    "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța",
    "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara",
    "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt",
    "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea",
    "Vaslui", "Vâlcea", "Vrancea"
];

// --- STILURI ---
const textFieldStyles = (disabled: boolean = false) => ({
    "& .MuiInput-root": {
        backgroundColor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        marginTop: "0.5rem",
        padding: "0.75rem 0.75rem",
        opacity: disabled ? 0.7 : 1,
        transition: "border-color 0.2s ease-in-out",
        "&::before, &::after": { display: "none" },
        "&:hover:not(.Mui-focused)": {
            borderColor: disabled ? colors.lightGreen1Transparent : `${colors.lightGreen1}`,
        },
        "&.Mui-focused": { borderColor: colors.lightGreen1 },
        "& .MuiSvgIcon-root": { color: colors.lightGreen1, mr: 1 },
        "& .MuiSelect-select": { display: 'flex', alignItems: 'center' },
    },
    "& .MuiInputBase-input": { ...typography.body1, color: colors.white1 },
});

const labelStyles = { color: colors.white2, mb: "0.25rem", fontSize: "0.875rem", textAlign: "left", fontWeight: 500 };

// --- COMPONENTA CUSTOM INPUT ---
interface CustomTextFieldProps { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; startIcon?: React.ReactNode; endIcon?: React.ReactNode; type?: string; multiline?: boolean; rows?: number; select?: boolean; children?: React.ReactNode; }

const CustomTextField: React.FC<CustomTextFieldProps> = ({
                                                             label, name, value, onChange, placeholder = "", startIcon = null, endIcon = null, type = "text", multiline = false, rows = 1, select = false, children
                                                         }) => (
    <Box sx={{ width: '100%' }}>
        <Typography sx={labelStyles}>{label}</Typography>
        <TextField fullWidth select={select} name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} multiline={multiline} rows={rows} variant="standard" margin="none" InputProps={{ disableUnderline: true, startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : null, endAdornment: endIcon ? <InputAdornment position="end">{endIcon}</InputAdornment> : null }} SelectProps={{ MenuProps: { PaperProps: { sx: { bgcolor: colors.darkGreen2, color: colors.white1, border: `1px solid ${colors.lightGreen1}`, maxHeight: 300, "& .MuiMenuItem-root": { "&:hover": { bgcolor: colors.lightGreen1Transparent }, "&.Mui-selected": { bgcolor: colors.lightGreen1Transparent, "&:hover": { bgcolor: colors.lightGreen1Transparent } } } } } } }} sx={textFieldStyles(false)} >{children}</TextField>
    </Box>
);

const BecomeProducerPage: React.FC = () => {
    const tr = textResources.becomeProducer;
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext);

    // --- STATE ---
    // detectedRole va fi null, "Admin" sau "Producător"
    const [detectedRole, setDetectedRole] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        farmName: "", phone: "", region: "", cui: "", description: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // --- CHECK ROLE EFFECT ---
    useEffect(() => {
        if (isAuthenticated && user) {
            // Verificăm ce rol are userul
            const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];

            if (userRoles.includes('ADMIN')) {
                setDetectedRole('Admin');
            } else if (userRoles.includes('PRODUCATOR')) {
                setDetectedRole('Producător');
            }
        }
    }, [isAuthenticated, user]);

    // --- HANDLER REDIRECT ---
    const handleRedirectHome = () => {
        navigate('/');
    };

    // --- HANDLERS FORMULAR ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) setFormData({ ...formData, [name]: numericValue });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);
        console.log("Trimite date:", formData);

        setTimeout(() => {
            setLoading(false);
            alert(tr.successMessage);
            navigate('/');
        }, 1500);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3, color: colors.white1 }}>

            {/* --- MODALUL APARE PESTE CONȚINUT DACĂ S-A DETECTAT UN ROL --- */}
            <Dialog
                open={!!detectedRole} // Se deschide dacă detectedRole NU este null
                PaperProps={{
                    sx: {
                        bgcolor: colors.darkGreen2,
                        color: colors.white1,
                        border: `1px solid ${colors.lightGreen1}`,
                        borderRadius: '1.5rem',
                        p: 2,
                        textAlign: 'center',
                        zIndex: 9999 // Ne asigurăm că e peste tot
                    }
                }}
                // Blochează închiderea la click în afară (forțăm butonul)
                disableEscapeKeyDown
            >
                <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <InfoIcon sx={{ fontSize: '3rem', color: colors.lightGreen1 }} />
                    <Typography variant="h5" fontWeight="bold">
                        Ești deja înregistrat!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ color: colors.white2, mb: 1, fontSize: '1.1rem' }}>
                        Contul tău are deja drepturi de <span style={{ color: colors.lightGreen1, fontWeight: 'bold' }}>{detectedRole}</span>.
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Nu este necesar să completezi acest formular.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleRedirectHome}
                        sx={{
                            bgcolor: colors.lightGreen1,
                            color: colors.darkGreen2,
                            fontWeight: 'bold',
                            borderRadius: '1rem',
                            px: 4,
                            '&:hover': { bgcolor: colors.lightGreen2 }
                        }}
                    >
                        Înapoi la Pagina Principală
                    </Button>
                </DialogActions>
            </Dialog>

            {/* --- CONȚINUTUL PAGINII (FORMULARUL) RĂMÂNE VIZIBIL ÎN SPATE --- */}

            <Box sx={{ textAlign: 'center', mb: 6, opacity: detectedRole ? 0.3 : 1 }}> {/* Opțional: Facem spatele puțin transparent/blur */}
                <Typography variant="h3" sx={{ fontSize:"2.5rem", fontWeight: 'bold', color: colors.lightGreen1, mb: 1 }}>
                    {tr.title}
                </Typography>
                <Typography variant="h6" sx={{ color: colors.white2, opacity: 0.8 }}>
                    {tr.subtitle}
                </Typography>
            </Box>

            <Paper
                elevation={6}
                sx={{
                    p: { xs: 3, md: 5 },
                    bgcolor: colors.darkGreen1,
                    border: `1px solid ${colors.lightGreen1Transparent}`,
                    borderRadius: '1.5rem',
                    // Dacă e deschis modalul, mai scădem opacitatea fundalului ca să iasă modalul în evidență
                    opacity: detectedRole ? 0.3 : 1,
                    pointerEvents: detectedRole ? 'none' : 'auto' // Blochează click-urile pe formular
                }}
            >
                <Stack spacing={4}>
                    {/* ... SECTIUNEA DATE CONT (Doar pt nelogați) ... */}
                    {!isAuthenticated && (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <PersonIcon sx={{ color: colors.lightGreen1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{tr.sections.account}</Typography>
                            </Box>
                            <Stack spacing={3}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                    <Box sx={{ flex: 1 }}>
                                        <CustomTextField label={tr.fields.lastName} name="lastName" value={formData.lastName} onChange={handleChange} startIcon={<PersonIcon />} placeholder={tr.placeholders.lastName} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <CustomTextField label={tr.fields.firstName} name="firstName" value={formData.firstName} onChange={handleChange} startIcon={<PersonIcon />} placeholder={tr.placeholders.firstName} />
                                    </Box>
                                </Stack>
                                <Box sx={{ width: '100%' }}>
                                    <CustomTextField label={tr.fields.email} name="email" value={formData.email} onChange={handleChange} startIcon={<EmailIcon />} placeholder="email@exemplu.ro" />
                                </Box>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                    <Box sx={{ flex: 1 }}>
                                        <CustomTextField label={tr.fields.password} name="password" value={formData.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} startIcon={<LockIcon />} endIcon={<IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: colors.lightGreen1 }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <CustomTextField label={tr.fields.confirmPassword} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type={showConfirmPassword ? 'text' : 'password'} startIcon={<LockIcon />} endIcon={<IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: colors.lightGreen1 }}>{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton>} />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Alert severity="info" sx={{ bgcolor: colors.darkGreen2, color: colors.white2, border: `1px solid ${colors.lightGreen1Transparent}`, borderRadius: '1rem', width: 'fit-content', px: 4, '& .MuiAlert-icon': { color: colors.lightGreen1 } }}>
                                    {tr.loginQuestion}{' '}
                                    <Link to="/login" state={{ from: location }} style={{ color: colors.lightGreen1, textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}>
                                        {tr.loginAction}
                                    </Link>
                                </Alert>
                            </Box>
                            <Divider sx={{ bgcolor: colors.lightGreen1Transparent, my: 4 }} />
                        </Box>
                    )}

                    {/* ... SECTIUNEA DETALII FERMA ... */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <AgricultureIcon sx={{ color: colors.lightGreen1 }} />
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{tr.sections.details}</Typography>
                        </Box>

                        <Stack spacing={3}>
                            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ width: '100%' }}>
                                <Box sx={{ flex: 1 }}>
                                    <CustomTextField label={tr.fields.farmName} name="farmName" value={formData.farmName} onChange={handleChange} placeholder={tr.placeholders.farmName} startIcon={<StorefrontIcon />} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomTextField label={tr.fields.phone} name="phone" value={formData.phone} onChange={handleChange} placeholder="07xxxxxxxx" startIcon={<ContactPhoneIcon />} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomTextField select label={tr.fields.region} name="region" value={formData.region} onChange={handleChange} startIcon={<MapIcon />}>
                                        {regions.map((reg) => (<MenuItem key={reg} value={reg}>{reg}</MenuItem>))}
                                    </CustomTextField>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomTextField label={tr.fields.cui} name="cui" value={formData.cui} onChange={handleChange} placeholder="RO123456" />
                                </Box>
                            </Stack>
                            <Box sx={{ width: '100%' }}>
                                <CustomTextField multiline rows={5} label={tr.fields.description} name="description" value={formData.description} onChange={handleChange} placeholder={tr.placeholders.description} startIcon={<DescriptionIcon sx={{ mt: 1 }} />} />
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="contained" size="large" onClick={handleSubmit} disabled={loading} sx={{ px: '6rem', py: '1rem', fontSize: '1.2rem', fontWeight: 'bold', bgcolor: colors.lightGreen1, color: colors.darkGreen2, borderRadius: '1rem', textTransform: 'none', '&:hover': { bgcolor: colors.lightGreen2, transform: 'scale(1.02)' }, transition: 'all 0.2s' }}>
                            {loading ? "Se trimite..." : tr.button}
                        </Button>
                    </Box>

                </Stack>
            </Paper>
        </Container>
    );
};

export default BecomeProducerPage;