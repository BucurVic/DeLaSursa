import React from 'react';

// Importuri MUI
import { Box, TextField, Button, Link, IconButton, Typography } from '@mui/material';

// Importuri Iconițe MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HandshakeIcon from '@mui/icons-material/Handshake'; // Ca placeholder pentru logo

// Componenta principală a paginii de resetare
function ResetPasswordPage() {

  // Stilurile sunt identice cu cele de la SignUp
  const textFieldStyles = {
    '& .MuiInput-root': {
      backgroundColor: '#13271E', // darkGreen1
      color: '#F2F2F2',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '2px solid rgba(95, 238, 149, 0.3)', // lightGreen1Transparent
      marginTop: '8px', 
      transition: 'border-color 0.2s ease-in-out', 
      
      '&::before, &::after': {
        display: 'none',
      },
      '&:hover:not(.Mui-focused)': { 
        borderColor: '#5FEE95 !important', // lightGreen1
      },
      '&.Mui-focused': {
        borderColor: '#5FEE95', // lightGreen1
      },
    },
    '& .MuiInputBase-input': {
      padding: 0, 
      '&::placeholder': {
        color: '#BEBEBE', 
        opacity: 0.7,
      }
    }
  };
  
  const labelStyles = {
    color: '#BEBEBE',
    mb: 0, 
    fontSize: '0.875rem',
    textAlign: 'left', 
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        fontFamily: 'Manrope, sans-serif',
      }}
    >
      
      {/* Cardul de resetare -- LĂȚIME ȘI ÎNĂLȚIME MODIFICATĂ */}
      <Box 
        sx={{
          bgcolor: '#13271E', // darkGreen1
          p: { xs: 3, md: 4 },
          // Mărim padding-ul vertical (sus/jos) pentru a face cardul mai înalt
          pt: 6, 
          pb: 6, 
          borderRadius: '12px',
          boxShadow: 24,
          maxWidth: '420px', // --- SCHIMBAT LA 420px ---
          width: '100%',
          color: '#F2F2F2', // white1
          position: 'relative',
        }}
      >
        
        <IconButton sx={{ color: '#F2F2F2', position: 'absolute', top: 24, left: 24 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* Secțiunea de antet (Logo, Titlu) */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HandshakeIcon sx={{ fontSize: 50, color: '#5FEE95' }} /> 
          
          <Typography component="h1" sx={{ fontSize: '2.25rem', fontWeight: 800, mt: 2 }}>
            Resetează parola
          </Typography>
        </Box>

        {/* Formularul */}
        <Box component="form" noValidate autoComplete="off">
          
          {/* --- Câmp: Parolă nouă --- */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>
              Parolă nouă
            </Typography>
            <TextField
              fullWidth
              required
              id="parola-noua"
              type="password"
              placeholder="Introdu parola nouă"
              variant="standard" 
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles}
            />
          </Box>

          {/* --- Câmp: Confirmare parolă nouă --- */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>
              Confirmare parolă nouă
            </Typography>
            <TextField
              fullWidth
              required
              id="confirmare-parola-noua"
              type="password"
              placeholder="Confirmă parola nouă"
              variant="standard" 
              margin="none"
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles}
            />
          </Box>

          {/* Butonul de resetare -- ROTUNJIRE MODIFICATĂ */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#5FEE95',
              color: '#0C1A14',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: '12px',
              mt: 4, // Am mărit marginea de sus
              borderRadius: '8px', // <--- ROTUNJIREA AICI
              '&:hover': {
                backgroundColor: '#4ADE80',
              },
            }}
          >
            RESETARE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;