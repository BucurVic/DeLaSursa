import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar'; 
import Footer from './Footer';

const WIDTH_COLLAPSED = "5rem"; // 80px

const MainLayout: React.FC = () => {
  const [sidebarCollapsed] = useState(true); 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#0C1A14' }}>
      
      <Header />
      
      <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
        
       
        <Sidebar collapsed={sidebarCollapsed} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            pl: { 
              xs: WIDTH_COLLAPSED, 
            },
            pt: 4, 
            px: 4,
            pr: 0,
            width: '100%',
            overflowY: 'auto'
          }}
        >
          <Outlet /> 
        </Box>
      </Box>

      {/* 4. FOOTER (Componenta ta existentă) */}
      <Box sx={{ pl: { xs: WIDTH_COLLAPSED } }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;