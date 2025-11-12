import React from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Link, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import logoSrc from '../assets/logo.png'; 

function SignUpPage() {

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
          borderRadius: '12px',
          boxShadow: 24,
          maxWidth: '600px', 
          width: '100%',
          color: '#F2F2F2', 
          position: 'relative',
        }}
      >
        
        <IconButton sx={{ color: '#F2F2F2', position: 'absolute', top: 24, left: 24 }}>
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          
          <Box
            component="img"
            src={logoSrc}
            alt="DeLaSursa Logo"
            sx={{ 
              width: 72,   // --- AM MĂRIT AICI ---
              height: 72,  // --- AM MĂRIT AICI ---
              mb: 1 // Adaugă puțin spațiu sub logo, ca să nu stea lipit de titlu
            }}
          />
          
          <Typography component="h1" sx={{ fontSize: '2.25rem', fontWeight: 800, mt: 2 }}>
            Înregistrare
          </Typography>
          <Typography sx={{ color: '#BEBEBE', mt: 1 }}>
            Ai deja cont?{' '}
            <Link href="/login" sx={{ color: '#4ADE80', fontWeight: 'bold' }}>
              Autentifică-te!
            </Link>
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
              gap: '16px 24px' 
            }}
          >
            <Box>
              <Typography sx={labelStyles}>
                Nume complet
              </Typography>
              <TextField
                fullWidth
                required
                id="nume-complet"
                placeholder="Introdu numele"
                variant="standard" 
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography sx={labelStyles}>
                Email
              </Typography>
              <TextField
                fullWidth
                required
                id="email"
                type="email"
                placeholder="Introdu email-ul"
                variant="standard" 
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography sx={labelStyles}>
                Parolă
              </Typography>
              <TextField
                fullWidth
                required
                id="parola"
                type="password"
                placeholder="Introdu parola"
                variant="standard" 
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography sx={labelStyles}>
                Confirmare parolă
              </Typography>
              <TextField
                fullWidth
                required
                id="confirmare-parola"
                type="password"
                placeholder="Confirmă parola"
                variant="standard" 
                margin="none"
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Checkbox 
                defaultChecked 
                sx={{
                  color: '#BEBEBE',
                  '&.Mui-checked': {
                    color: '#5FEE95',
                  },
                }} 
              />
            }
            label={
              <Typography sx={{ color: '#BEBEBE' }}>
                Sunt de acord cu{' '}
                <Link href="/termeni" sx={{ color: '#4ADE80' }}>
                  termenii și condițiile
                </Link>
              </Typography>
            }
            sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
          />
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
              mt: 3,
              '&:hover': {
                backgroundColor: '#4ADE80',
              },
            }}
          >
            Înregistrare
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;