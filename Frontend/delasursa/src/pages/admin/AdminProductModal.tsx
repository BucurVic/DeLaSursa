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
  Stack,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../theme/colors';

// Tipul de date extins pentru Admin
export interface ProductData {
  id?: number;
  name: string;
  producer: string;
  category: string;
  price: string | number;
  stock: string | number;
  unit: string;
  active: boolean;
  image?: string;
}

interface AdminProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductData) => void;
  initialData: ProductData | null;
  mode: 'add' | 'edit';
}

const CATEGORIES = ['Legume', 'Fructe', 'Lactate', 'Carne', 'Miere', 'Băuturi', 'Panificație'];
const UNITS = ['kg', 'g', 'L', 'ml', 'buc', 'borcan', 'pachet'];

const AdminProductModal: React.FC<AdminProductModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  
  const emptyProduct: ProductData = {
    name: '',
    producer: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
    active: true,
    image: ''
  };

  const [formData, setFormData] = React.useState<ProductData>(emptyProduct);

  useEffect(() => {
    if (open) {
      setFormData(mode === 'edit' && initialData ? initialData : emptyOrder(emptyProduct));
    }
  }, [open, initialData, mode]);

  // Mic helper pentru a reseta state-ul corect
  const emptyOrder = (defaultVal: any) => JSON.parse(JSON.stringify(defaultVal));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, active: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // --- STILURI CONSISTENTE ---
  const textFieldStyles = (disabled: boolean = false) => ({
    "& .MuiInput-root": {
        backgroundColor: colors.darkGreen2,
        color: colors.white1,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        marginTop: "0.25rem",
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
        padding: 0,
        "&.MuiSelect-select": { display: 'flex', alignItems: 'center' },
    },
    "& .MuiSvgIcon-root": { color: colors.lightGreen1 }
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
            {mode === 'add' ? 'Adaugă Produs' : 'Editează Produs'}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "grid", gap: "1rem", pt: "1.5rem" }}>
          
          {/* Status Switch (Sus) */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
             <FormControlLabel
                control={<Switch checked={formData.active} onChange={handleSwitchChange} color="success" />}
                label={<Typography sx={{ color: colors.white2, fontSize: '0.9rem' }}>Produs Activ</Typography>}
                labelPlacement="start"
              />
          </Box>

          {/* Nume Produs */}
          <Box>
            <Typography sx={labelStyles}>Nume Produs</Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            />
          </Box>

          {/* Producător */}
          <Box>
            <Typography sx={labelStyles}>Producător</Typography>
            <TextField
              fullWidth
              name="producer"
              value={formData.producer}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            />
          </Box>

          {/* Categorie */}
          <Box>
            <Typography sx={labelStyles}>Categorie</Typography>
            <TextField
              select
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Preț și Stoc */}
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
                <Typography sx={labelStyles}>Preț (RON)</Typography>
                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  variant="standard"
                  margin="none"
                  InputProps={{ disableUnderline: true }}
                  sx={textFieldStyles(false)}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography sx={labelStyles}>Stoc</Typography>
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  variant="standard"
                  margin="none"
                  InputProps={{ disableUnderline: true }}
                  sx={textFieldStyles(false)}
                />
            </Box>
          </Stack>

          {/* Unitate */}
          <Box>
            <Typography sx={labelStyles}>Unitate de Măsură</Typography>
            <TextField
              select
              fullWidth
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
              variant="standard"
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles(false)}
            >
              {UNITS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
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

export default AdminProductModal;