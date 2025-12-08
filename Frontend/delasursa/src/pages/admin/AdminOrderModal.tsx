import React, { useEffect } from 'react';
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
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../theme/colors';

// Tipul de date pentru Comandă
export interface OrderData {
  id?: number;
  customer: string;
  date: string;
  total: string;
  status: 'PENDING' | 'COMPLETED' | 'SHIPPED' | 'CANCELLED';
  items: number;
}

interface AdminOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: OrderData) => void;
  initialData: OrderData | null;
  mode: 'add' | 'edit';
}

const STATUS_OPTIONS = ['PENDING', 'COMPLETED', 'SHIPPED', 'CANCELLED'];

const AdminOrderModal: React.FC<AdminOrderModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  const emptyOrder: OrderData = {
    customer: '',
    date: new Date().toISOString().split('T')[0],
    total: '',
    status: 'PENDING',
    items: 1
  };

  const [formData, setFormData] = React.useState<OrderData>(emptyOrder);

  useEffect(() => {
    if (open) {
      setFormData(mode === 'edit' && initialData ? initialData : emptyOrder);
    }
  }, [open, initialData, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // --- STILURI CONSISTENTE (Ca la EditUserModal) ---
  const textFieldStyles = (disabled: boolean = false) => ({
    "& .MuiInput-root": {
        backgroundColor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "1rem", // Rotunjire mare
        border: `1px solid ${colors.lightGreen1Transparent}`,
        marginTop: "0.25rem", // Spațiu mic între label și input
        padding: "0.75rem 0.75rem",
        opacity: disabled ? 0.7 : 1,
        transition: "border-color 0.2s ease-in-out",
        "&::before, &::after": { display: "none" }, // Ascunde linia de jos
        "&:hover:not(.Mui-focused)": {
            borderColor: disabled ? colors.lightGreen1Transparent : `${colors.lightGreen1}`,
        },
        "&.Mui-focused": { borderColor: colors.lightGreen1 },
    },
    "& .MuiInputBase-input": {
        color: colors.white1,
        padding: 0,
        "&.MuiSelect-select": { display: 'flex', alignItems: 'center' },
    },
    "& .MuiSvgIcon-root": { color: colors.lightGreen1 } // Iconița dropdown verde
  });

  const labelStyles = {
    color: colors.white2,
    mb: "0.25rem",
    fontSize: "0.875rem",
    textAlign: "left",
    fontWeight: 500
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: colors.darkGreen1, // Fundal închis (ca la pagină)
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
            {mode === 'add' ? 'Adaugă Comandă' : 'Editează Comandă'}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: colors.white2, opacity: 0.7, mt: "0.25rem" }}>
          Gestionează detaliile comenzii.
        </Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "grid", gap: "1rem", pt: "1.5rem" }}>
          
          {/* Nume Client */}
          <Box>
            <Typography sx={labelStyles}>Nume Client</Typography>
            <TextField
              fullWidth
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            />
          </Box>

          {/* Data și Nr. Articole (Pe același rând) */}
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
                <Typography sx={labelStyles}>Data</Typography>
                <TextField
                fullWidth
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                variant="standard"
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles(false)}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography sx={labelStyles}>Nr. Articole</Typography>
                <TextField
                fullWidth
                name="items"
                type="number"
                value={formData.items}
                onChange={handleInputChange}
                required
                variant="standard"
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles(false)}
                />
            </Box>
          </Stack>

          {/* Status */}
          <Box>
            <Typography sx={labelStyles}>Status Comandă</Typography>
            <TextField
              select
              fullWidth
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Total */}
          <Box>
            <Typography sx={labelStyles}>Total</Typography>
            <TextField
              fullWidth
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              required
              placeholder="ex: 150.00 RON"
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            />
          </Box>

        </DialogContent>

        <DialogActions sx={{ p: "1.5rem", gap: "1rem", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ color: colors.lightGreen1, border: `1px solid ${colors.lightGreen1}`, borderRadius: "0.5rem", px: "1.5rem", "&:hover": { backgroundColor: colors.lightGreen1Transparent } }}>
                Anulează
            </Button>
            <Button type="submit" sx={{ backgroundColor: colors.lightGreen1, color: colors.darkGreen1, borderRadius: "0.5rem", px: "1.5rem", fontWeight: "bold", "&:hover": { backgroundColor: colors.lightGreen2 } }}>
                {mode === 'add' ? 'Adaugă' : 'Salvează'}
            </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AdminOrderModal;