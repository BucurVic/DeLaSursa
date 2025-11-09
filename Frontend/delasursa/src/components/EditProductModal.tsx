import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
  IconButton
} from '@mui/material';

// --- LINIA CORECTATĂ ---
import CloseIcon from '@mui/icons-material/Close'; // Am scos ":" de după @mui

// Tipul de date pentru produsul pe care îl edităm (simplificat)
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

  const COLORS = {
    modalBg: '#0C1A14', 
    fieldBg: '#13271E',
    idleBorder: 'rgba(95, 238, 149, 0.3)', 
    lightGreen1: '#5FEE95', // Verde deschis
    lightGreen3: '#3BC76A',
    white1: '#F2F2F2',
    white2: '#BEBEBE',
    textDark: '#0C1A14', 
  };

  const textFieldStyles = (disabled: boolean = false) => ({
    '& .MuiInput-root': {
      backgroundColor: COLORS.fieldBg,
      color: COLORS.white1,
      padding: '8px 12px', 
      borderRadius: '8px',
      border: `2px solid ${COLORS.idleBorder}`,
      marginTop: '8px', 
      transition: 'border-color 0.2s ease-in-out', 
      opacity: disabled ? 0.7 : 1,
      
      '&::before, &::after': {
        display: 'none',
      },

      '&:hover:not(.Mui-focused)': { 
        borderColor: disabled ? COLORS.idleBorder : `${COLORS.lightGreen1} !important`,
      },
      '&.Mui-focused': {
        borderColor: COLORS.lightGreen1,
      },
    },
    '& .MuiInputBase-input': {
      padding: 0, 
      fontWeight: 'bold', 
      color: COLORS.white1,
      '&.Mui-disabled': { 
        color: COLORS.white2,
        opacity: 0.6,
        fontWeight: 'normal',
        '-webkit-text-fill-color': COLORS.white2, 
      },
    }
  });
  
  const labelStyles = {
    color: COLORS.white2,
    mb: 0, 
    fontSize: '0.875rem',
    textAlign: 'left', 
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
          bgcolor: COLORS.modalBg, 
          color: COLORS.white1,
          borderRadius: '8px',
          boxShadow: 24,
          p: 1, 
        },
      }}
    >
      <DialogTitle sx={{ p: 2, pb: 1, borderBottom: `1px solid ${COLORS.fieldBg}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Titlul "Editează produs" este verde deschis */}
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: COLORS.lightGreen1 }}>
            Editează produs
          </Typography>
          <IconButton onClick={onClose} sx={{ color: COLORS.white1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: COLORS.white2, opacity: 0.7, mb: 1 }}>
          Modifică informațiile câmpului. Unele câmpuri nu pot fi editate.
        </Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, pt: 2, px: 3 }}>
          
          {/* Câmp 1: Nume Produs */}
          <Box>
            <Typography sx={labelStyles}>Nume produs</Typography>
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
          
          {/* Câmp 2: Categorie (View-only) */}
          <Box>
            <Typography sx={labelStyles}>Categorie (View-only)</Typography>
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

          {/* Câmpuri 3 & 4: Preț & Stoc (Afișare 2 coloane) */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {/* Preț */}
            <Box>
              <Typography sx={labelStyles}>Preț</Typography>
              <TextField
                  fullWidth
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0 lei"
                  variant="standard"
                  margin="none"
                  InputProps={{ disableUnderline: true }}
                  sx={textFieldStyles(false)}
              />
            </Box>
            {/* Stoc (View-only) */}
            <Box>
              <Typography sx={labelStyles}>Stoc (View-only)</Typography>
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
               <Typography variant="caption" sx={{ color: COLORS.lightGreen1, mt: 0.5, fontSize: '0.75rem' }}>
                 *Stocul se gestionează în secțiunea Inventar
              </Typography>
            </Box>
          </Box>

          {/* Câmp 5: Unitate de Măsură (View-only) */}
          <Box>
            <Typography sx={labelStyles}>Unitate de Măsură (View-only)</Typography>
            <TextField
                fullWidth
                name="unit"
                value={formData.unit}
                disabled
                variant="standard"
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles(true)}
            />
          </Box>
          
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'flex-end' }}>
          
          {/* Butonul ANULEAZĂ cu bordură și text verde deschis */}
          <Button
            onClick={onClose}
            sx={{
              color: COLORS.lightGreen1, // Text verde deschis
              bgcolor: 'transparent',
              border: `1px solid ${COLORS.lightGreen1}`, // Bordură verde deschis
              py: '8px',
              px: '20px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: 'rgba(95, 238, 149, 0.1)', // Verde transparent la hover
                border: `1px solid ${COLORS.lightGreen1}`,
              },
            }}
          >
            Anulează
          </Button>

          {/* Butonul SALVEAZĂ MODIFICĂRILE */}
          <Button
            type="submit"
            sx={{
              color: COLORS.textDark, 
              bgcolor: COLORS.lightGreen1, 
              py: '8px',
              px: '20px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: COLORS.lightGreen3, 
              },
            }}
          >
            Salvează modificările
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditProductModal;