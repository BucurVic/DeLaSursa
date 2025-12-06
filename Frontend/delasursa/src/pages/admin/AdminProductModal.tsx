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
interface ProductData {
  id?: number;
  name: string;
  producer: string; // Adminul poate edita și numele producătorului (teoretic)
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
  initialData: ProductData | null; // Poate fi null dacă adăugăm un produs nou
  mode: 'add' | 'edit';
}

// Categorii posibile (pentru dropdown)
const CATEGORIES = ['Legume', 'Fructe', 'Lactate', 'Carne', 'Miere', 'Băuturi', 'Panificație'];
const UNITS = ['kg', 'g', 'L', 'ml', 'buc', 'borcan', 'pachet'];

const AdminProductModal: React.FC<AdminProductModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  
  // Stare inițială goală pentru "Add Mode"
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

  // Când se deschide modalul sau se schimbă datele, actualizăm formularul
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setFormData(initialData);
      } else {
        setFormData(emptyProduct);
      }
    }
  }, [open, initialData, mode]);

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

  // Stiluri comune
  const textFieldStyles = {
    '& .MuiInput-root': {
      backgroundColor: colors.darkGreen2,
      color: colors.white1,
      borderRadius: '8px',
      '& fieldset': { borderColor: colors.lightGreen1Transparent },
      '&:hover fieldset': { borderColor: colors.lightGreen1 },
      '&.Mui-focused fieldset': { borderColor: colors.lightGreen1 },
    },
    '& .MuiInputBase-input': { color: colors.white1 },
    '& .MuiInputLabel-root': { color: colors.white2 },
    '& .MuiInputLabel-root.Mui-focused': { color: colors.lightGreen1 },
    '& .MuiSelect-icon': { color: colors.lightGreen1 },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0C1A14', // Background pagina
          color: colors.white1,
          borderRadius: '12px',
          boxShadow: 24,
          border: `1px solid ${colors.lightGreen1Transparent}`
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
          {mode === 'add' ? 'Adaugă Produs (Admin)' : 'Editează Produs (Admin)'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, pt: 1 }}>
        <Stack spacing={2}>
          
          {/* Status Switch */}
          <FormControlLabel
            control={
              <Switch 
                checked={formData.active} 
                onChange={handleSwitchChange} 
                color="success" 
              />
            }
            label={<Typography sx={{ color: colors.white2 }}>Produs Activ</Typography>}
          />

          {/* Nume */}
          <TextField
            label="Nume Produs"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleInputChange}
            sx={textFieldStyles}
          />

          {/* Producător (Editabil doar de Admin!) */}
          <TextField
            label="Nume Producător"
            name="producer"
            fullWidth
            required
            value={formData.producer}
            onChange={handleInputChange}
            helperText="Admin: Poți corecta numele producătorului aici."
            sx={textFieldStyles}
            FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
          />

          {/* Categorie (Select) */}
          <TextField
            select
            label="Categorie"
            name="category"
            fullWidth
            required
            value={formData.category}
            onChange={handleInputChange}
            sx={textFieldStyles}
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Preț și Stoc */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Preț (RON)"
              name="price"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
            <TextField
              label="Stoc"
              name="stock"
              type="number"
              fullWidth
              required
              value={formData.stock}
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Stack>

          {/* Unitate de Măsură (Select) */}
          <TextField
            select
            label="Unitate de Măsură"
            name="unit"
            fullWidth
            required
            value={formData.unit}
            onChange={handleInputChange}
            sx={textFieldStyles}
          >
            {UNITS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

        </Stack>

        <DialogActions sx={{ mt: 4, p: 0 }}>
          <Button onClick={onClose} sx={{ color: colors.white2 }}>
            Anulează
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              bgcolor: colors.lightGreen1, 
              color: colors.darkGreen1,
              fontWeight: 'bold',
              '&:hover': { bgcolor: colors.lightGreen2 }
            }}
          >
            {mode === 'add' ? 'Adaugă Produs' : 'Salvează Modificările'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AdminProductModal;