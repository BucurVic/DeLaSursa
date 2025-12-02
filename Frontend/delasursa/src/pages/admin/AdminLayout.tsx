import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AdminSidebar, { DRAWER_WIDTH } from './AdminSidebar';
import { colors } from '../../theme/colors';

const AdminLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: colors.darkGreen1, minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Sidebar-ul fix în stânga */}
      <AdminSidebar />

      {/* Conținutul paginii în dreapta */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          color: colors.white1
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;