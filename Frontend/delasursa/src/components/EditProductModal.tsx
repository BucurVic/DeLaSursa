import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { textResources as tr } from "../theme/textResources";

interface ProductData {
    name: string;
    category: string;
    price: string;
    stock: string;
    unit: string;
}

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: ProductData) => void;
    initialData: ProductData;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
                                                               open,
                                                               onClose,
                                                               onSave,
                                                               initialData,
                                                           }) => {
    const [formData, setFormData] = React.useState(initialData);

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
                borderColor: disabled
                    ? colors.lightGreen1Transparent
                    : `${colors.lightGreen1}`,
            },
            "&.Mui-focused": {
                borderColor: colors.lightGreen1,
            },
        },
        "& .MuiInputBase-input": {
            ...typography.body1,
            color: colors.white1,
            "&.Mui-disabled": {
                color: colors.white2,
                opacity: 0.6,
                "-webkit-text-fill-color": colors.white2,
            },
        },
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
            {/* 🔹 Titlu și descriere */}
            <DialogTitle
                sx={{
                    p: "1rem",
                    borderBottom: `2px solid ${colors.darkGreen2}`,
                }}
            >
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography
                        sx={{
                            ...typography.h4,
                            color: colors.lightGreen1,
                        }}
                    >
                        {tr.editModal.title}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography
                    variant="body2"
                    sx={{ color: colors.white2, opacity: 0.7, mt: "0.25rem" }}
                >
                    {tr.editModal.subtitle}
                </Typography>
            </DialogTitle>

            {/* 🔸 Formular */}
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent
                    sx={{
                        display: "grid",
                        gap: "1rem",
                        pt: "1.5rem",
                    }}
                >
                    {/* Nume produs */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.form.name}</Typography>
                        <TextField
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            variant="standard"
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(false)}
                        />
                    </Box>

                    {/* Categorie */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.form.category}</Typography>
                        <TextField
                            fullWidth
                            name="category"
                            value={formData.category}
                            disabled
                            variant="standard"
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(true)}
                        />
                    </Box>

                    {/* Preț & Stoc */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                        }}
                    >
                        <Box>
                            <Typography sx={labelStyles}>{tr.editModal.fields.price}</Typography>
                            <TextField
                                fullWidth
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                variant="standard"
                                margin="none"
                                InputProps={{ disableUnderline: true }}
                                sx={textFieldStyles(false)}
                            />
                        </Box>

                        <Box>
                            <Typography sx={labelStyles}>{tr.form.stock}</Typography>
                            <TextField
                                fullWidth
                                name="stock"
                                value={formData.stock}
                                disabled
                                variant="standard"
                                margin="none"
                                InputProps={{ disableUnderline: true }}
                                sx={textFieldStyles(true)}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: colors.lightGreen1,
                                    fontSize: "0.75rem",
                                }}
                            >
                                {tr.editModal.fields.stockNote}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Unitate de măsură */}
                    <Box>
                        <Typography sx={labelStyles}>{tr.form.unit}</Typography>
                        <TextField
                            fullWidth
                            name="unit"
                            value={
                                formData.unit
                                    .trim()
                                    .replace(/^[\d\s.,]+/, "")
                                    .replace(/\d+$/, "")
                                    .trim() || "-"
                            }
                            disabled
                            variant="standard"
                            margin="none"
                            InputProps={{ disableUnderline: true }}
                            sx={textFieldStyles(true)}
                        />
                    </Box>
                </DialogContent>

                {/* 🔘 Acțiuni */}
                <DialogActions sx={{ p: "1.5rem", gap: "1rem", justifyContent: "flex-end" }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            ...typography.button,
                            color: colors.lightGreen1,
                            border: `1px solid ${colors.lightGreen1}`,
                            borderRadius: "0.5rem",
                            py: "0.6rem",
                            px: "1.5rem",
                            "&:hover": {
                                backgroundColor: colors.lightGreen1Transparent,
                            },
                        }}
                    >
                        {tr.buttons.cancel}
                    </Button>

                    <Button
                        type="submit"
                        sx={{
                            ...typography.button,
                            backgroundColor: colors.lightGreen1,
                            color: colors.darkGreen1,
                            borderRadius: "0.5rem",
                            py: "0.6rem",
                            px: "1.5rem",
                            "&:hover": {
                                backgroundColor: colors.lightGreen2,
                            },
                        }}
                    >
                        {tr.editModal.buttons.save}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default EditProductModal;