import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from '@mui/material';

// Definirea tipurilor pentru a face componenta reutilizabilă
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void; // Funcție apelată la Anulare
  onConfirm: () => void; // Funcție apelată la Ștergere
  productName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  // Culorile proiectului tău
  const COLORS = {
    darkGreen1: '#13271E',
    lightGreen3: '#3BC76A',
    lightGreen1: '#5FEE95',
    background: '#0C1A14',
    white1: '#F2F2F2',
  };

  const handleConfirm = () => {
    onConfirm();
    onClose(); // Închide modalul după confirmare
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      
      // Stilul cutiei principale (pentru a imita stilul din poză)
      PaperProps={{
        sx: {
          bgcolor: COLORS.darkGreen1, // Fundal card
          color: COLORS.white1,       // Text
          borderRadius: '8px',
          boxShadow: 24,
          p: 1, // Padding intern
          maxWidth: '450px',
        },
      }}
    >
      <DialogTitle id="confirm-dialog-title">
        {/* Titlul "Confirmare ștergere" */}
        <Typography component="div" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Confirmare ștergere
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ border: 'none', pt: 0, pb: 2 }}>
        {/* Textul de avertizare */}
        <DialogContentText id="confirm-dialog-description" sx={{ color: COLORS.white1, opacity: 0.8 }}>
          Ești sigur că vrei să ștergi produsul **{productName}**? Această acțiune nu poate fi anulată.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 3, gap: 1 }}>
        
        {/* Butonul ANULEAZĂ */}
        <Button
          onClick={onClose}
          sx={{
            color: COLORS.white1,
            bgcolor: COLORS.darkGreen1, // Fundal transparent/dark
            border: `1px solid ${COLORS.white1}`,
            py: '10px',
            px: '20px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: 'rgba(242, 242, 242, 0.1)', // Umbră ușoară la hover
              border: `1px solid ${COLORS.white1}`,
            },
          }}
        >
          Anulează
        </Button>

        {/* Butonul ȘTERGE (verde) */}
        <Button
          onClick={handleConfirm}
          sx={{
            color: COLORS.background, // Text negru (din background)
            bgcolor: COLORS.lightGreen1, // lightGreen1 (verde deschis)
            py: '10px',
            px: '20px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: COLORS.lightGreen3, // lightGreen3 (verde puțin mai închis la hover)
              boxShadow: 'none',
            },
          }}
          autoFocus // Păstrează focusul pe acest buton
        >
          Șterge
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;