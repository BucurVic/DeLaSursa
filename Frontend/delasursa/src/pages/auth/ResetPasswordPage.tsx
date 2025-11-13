import React from 'react';
import { Box, TextField, Button, Link, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- 1. Importăm noul logo ---
import logoSrc from '../../assets/logo.png';

// Componenta principală a paginii de resetare
function ResetPasswordPage() {

  const textFieldStyles = {
    '& .MuiInput-root': {
      backgroundColor: '#13271E', 
      color: '#F2F2F2',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '2px solid rgba(95, 238, 149, 0.3)', 
      marginTop: '8px', 
      transition: 'border-color 0.2s ease-in-out', 
      
      '&::before, &::after': {
        display: 'none',
      },
      '&:hover:not(.Mui-focused)': { 
        borderColor: '#5FEE95 !important', 
      },
      '&.Mui-focused': {
        borderColor: '#5FEE95', 
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
      <Box 
        sx={{
          bgcolor: '#13271E', 
          p: { xs: 3, md: 4 },
          pt: 6, 
          pb: 6, 
          borderRadius: '12px',
          boxShadow: 24,
          maxWidth: '420px', 
          width: '100%',
          color: '#F2F2F2', 
          position: 'relative',
        }}
      >
        
        <IconButton sx={{ color: '#F2F2F2', position: 'absolute', top: 24, left: 24 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* Secțiunea de antet (Logo, Titlu) */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>

          {/* --- 2. Am înlocuit HandshakeIcon cu logo-ul tău --- */}
          <Box
            component="img"
            src={logoSrc}
            alt="DeLaSursa Logo"
            sx={{ width: 50, height: 50 }}
          />
          
          <Typography component="h1" sx={{ fontSize: '2.25rem', fontWeight: 800, mt: 2 }}>
            Resetează parola
          </Typography>
        </Box>

        {/* Formularul */}
        <Box component="form" noValidate autoComplete="off">
          
          {/* ... (Câmpurile de text rămân la fel) ... */}
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

          {/* ... (Butonul rămâne la fel) ... */}
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
              mt: 4, 
              borderRadius: '8px', 
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