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

// Tipul de date pentru Comandă
export interface OrderData {
  id?: number;
  customer: string;
  date: string; // Format YYYY-MM-DD
  total: string; // Îl ținem ca string pentru simplificare în form (ex: "150.00 RON")
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
  
  // Stare inițială goală
  const emptyOrder: OrderData = {
    customer: '',
    date: new Date().toISOString().split('T')[0], // Data de azi
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
          bgcolor: '#0C1A14',
          color: colors.white1,
          borderRadius: '12px',
          boxShadow: 24,
          border: `1px solid ${colors.lightGreen1Transparent}`
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>
          {mode === 'add' ? 'Adaugă Comandă (Admin)' : 'Editează Comandă (Admin)'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.white1 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, pt: 1 }}>
        <Stack spacing={2}>
          
          {/* Nume Client */}
          <TextField
            label="Nume Client"
            name="customer"
            fullWidth
            required
            value={formData.customer}
            onChange={handleInputChange}
            sx={textFieldStyles}
          />

          <Stack direction="row" spacing={2}>
            {/* Data */}
            <TextField
              label="Data"
              name="date"
              type="date"
              fullWidth
              required
              value={formData.date}
              onChange={handleInputChange}
              sx={textFieldStyles}
              InputLabelProps={{ shrink: true }}
            />
             {/* Nr. Produse */}
             <TextField
              label="Nr. Articole"
              name="items"
              type="number"
              fullWidth
              required
              value={formData.items}
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Stack>

          {/* Status (Select) */}
          <TextField
            select
            label="Status Comandă"
            name="status"
            fullWidth
            required
            value={formData.status}
            onChange={handleInputChange}
            sx={textFieldStyles}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Total (Simplificat ca text pentru acest demo) */}
          <TextField
            label="Total (ex: 150.00 RON)"
            name="total"
            fullWidth
            required
            value={formData.total}
            onChange={handleInputChange}
            sx={textFieldStyles}
          />

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
              color: colors.darkGreen2,
              fontWeight: 'bold',
              '&:hover': { bgcolor: colors.lightGreen2 }
            }}
          >
            {mode === 'add' ? 'Adaugă Comandă' : 'Salvează Modificările'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AdminOrderModal;