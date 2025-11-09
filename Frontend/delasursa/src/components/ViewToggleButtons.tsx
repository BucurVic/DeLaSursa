import React, { useState } from 'react';
import { Box, IconButton, SvgIcon } from '@mui/material';

// --- DEFINIREA ICONIȚELOR ---

// Iconița pentru Grid View (Vizualizare Grilă)
const GridIcon = (props: any) => (
  <SvgIcon {...props}>
    {/* Patru pătrate pentru grilă */}
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4z" />
  </SvgIcon>
);

// Iconița pentru List View (Vizualizare Listă)
const ListIcon = (props: any) => (
  <SvgIcon {...props}>
    {/* Trei linii orizontale pentru listă */}
    <path d="M4 14h16v-2H4v2zm0 5h16v-2H4v2zm0-10h16V7H4v2z" />
  </SvgIcon>
);


// --- COMPONENTA PRINCIPALĂ ---

interface ViewToggleButtonsProps {
  initialView?: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({ initialView = 'grid', onViewChange }) => {
  // Starea internă pentru a urmări modul de vizualizare
  const [activeView, setActiveView] = useState<'grid' | 'list'>(initialView);

  const handleToggle = (view: 'grid' | 'list') => {
    setActiveView(view);
    onViewChange(view);
  };

  // Definim culorile proiectului pentru a le folosi în 'sx'
  const COLORS = {
    activeBg: '#5FEE95',   // lightGreen1 (Background pentru butonul activ)
    inactiveBorder: '#5FEE95', // lightGreen1 (Bordura pentru butonul inactiv)
    activeIcon: '#0C1A14', // background (Culoarea iconiței active)
    inactiveIcon: '#5FEE95', // lightGreen1 (Culoarea iconiței inactive)
    inactiveBg: 'transparent', 
  };


  return (
    <Box sx={{ display: 'inline-flex', gap: 2, p: 1 }}>

      {/* BUTONUL GRID VIEW */}
      <IconButton
        onClick={() => handleToggle('grid')}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '12px', // Rotunjire pentru buton
          border: `2px solid ${COLORS.inactiveBorder}`,
          bgcolor: activeView === 'grid' ? COLORS.activeBg : COLORS.inactiveBg,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: activeView === 'grid' ? COLORS.activeBg : 'rgba(95, 238, 149, 0.1)', // Umbră la hover
          },
        }}
      >
        <GridIcon
          sx={{
            color: activeView === 'grid' ? COLORS.activeIcon : COLORS.inactiveIcon,
            fontSize: 24,
          }}
        />
      </IconButton>

      {/* BUTONUL LIST VIEW */}
      <IconButton
        onClick={() => handleToggle('list')}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '12px',
          border: `2px solid ${COLORS.inactiveBorder}`,
          bgcolor: activeView === 'list' ? COLORS.activeBg : COLORS.inactiveBg,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: activeView === 'list' ? COLORS.activeBg : 'rgba(95, 238, 149, 0.1)',
          },
        }}
      >
        <ListIcon
          sx={{
            color: activeView === 'list' ? COLORS.activeIcon : COLORS.inactiveIcon,
            fontSize: 24,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ViewToggleButtons;