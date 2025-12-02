import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    Box,
    IconButton,
    MenuItem,
    InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { colors, textResources } from "../theme";

export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
    password?: string;
}

interface EditUserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: UserData) => void;
    initialData: UserData | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
                                                         open,
                                                         onClose,
                                                         onSave,
                                                         initialData,
                                                     }) => {
    // Default Data
    const defaultData: UserData = {
        id: 0,
        username: "",
        email: "",
        role: "CLIENT", // Default pe CLIENT (nu USER)
        password: "",
    };

    const [formData, setFormData] = useState<UserData>(defaultData);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setFormData(initialData ? { ...initialData, password: "" } : defaultData);
        setShowPassword(false);
    }, [initialData, open]);

    const tr = textResources.adminUsers.editModal;
    const isAddMode = formData.id === 0;

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
        },
        "& .MuiInputBase-input": {
            color: colors.white1,
            "&.MuiSelect-select": { display: 'flex', alignItems: 'center' },
        },
        "& .MuiSvgIcon-root": { color: colors.lightGreen1 }
    });

    const labelStyles = {
        color: colors.white2,
        mb: "0.25rem",
        fontSize: "0.875rem",
        textAlign: "left",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
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
                    borderRadius: "1rem",
                    border: `1px solid ${colors.lightGreen1Transparent}`,
                    boxShadow: "1rem 1rem 1rem rgba(0,0,0,0.4)",
                    p: "0.5rem",
                },
            }}
        >
            <DialogTitle sx={{ p: "1rem", borderBottom: `2px solid ${colors.darkGreen2}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: colors.lightGreen1 }}>
                        {isAddMode ? tr.addTitle : tr.title}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" sx={{ color: colors.white2, opacity: 0.7, mt: "0.25rem" }}>
                    {tr.subtitle}
                </Typography>
            </DialogTitle>

            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent sx={{ display: "grid", gap: "1rem", pt: "1.5rem" }}>

                    {/* Username */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.fields.username}</Typography>
                        <TextField
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            variant="standard"
                            required
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(false)}
                        />
                    </Box>

                    {/* Email */}
                    <Box>
                        <Typography sx={labelStyles}>Email</Typography>
                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            variant="standard"
                            required
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(false)}
                        />
                    </Box>

                    {/* Password */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.fields.password}</Typography>
                        <TextField
                            fullWidth
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={isAddMode ? tr.fields.passwordPlaceholderAdd : tr.fields.passwordPlaceholderEdit}
                            variant="standard"
                            required={isAddMode}
                            margin="none"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: colors.lightGreen1 }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={textFieldStyles(false)}
                        />
                    </Box>

                    {/* ROL - AICI AM MODIFICAT VALORILE */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.fields.role}</Typography>
                        <TextField
                            select
                            fullWidth
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            variant="standard"
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(false)}
                        >
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="PRODUCATOR">PRODUCATOR</MenuItem>
                            <MenuItem value="CLIENT">CLIENT</MenuItem>
                        </TextField>
                    </Box>

                </DialogContent>

                <DialogActions sx={{ p: "1.5rem", gap: "1rem", justifyContent: "flex-end" }}>
                    <Button onClick={onClose} sx={{ color: colors.lightGreen1, border: `1px solid ${colors.lightGreen1}`, borderRadius: "0.5rem", px: "1.5rem", "&:hover": { backgroundColor: colors.lightGreen1Transparent } }}>
                        {textResources.buttons.cancel}
                    </Button>
                    <Button type="submit" sx={{ backgroundColor: colors.lightGreen1, color: colors.darkGreen1, borderRadius: "0.5rem", px: "1.5rem", fontWeight: "bold", "&:hover": { backgroundColor: colors.lightGreen2 } }}>
                        {textResources.buttons.submit}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default EditUserModal;