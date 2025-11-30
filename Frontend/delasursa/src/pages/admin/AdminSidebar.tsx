import React, { useContext } from 'react'; // 1. Am importat useContext
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

// 2. Importăm AuthContext direct (nu useAuth)
import { AuthContext } from '../../context/AuthContext'; 
import { colors } from '../../theme/colors'; 

const DRAWER_WIDTH = 240;

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 3. Folosim useContext pentru a accesa logout
  const { logout } = useContext(AuthContext); 

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Utilizatori', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Produse', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Comenzi', icon: <ShoppingCartIcon />, path: '/admin/orders' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
            width: DRAWER_WIDTH, 
            boxSizing: 'border-box',
            backgroundColor: colors.darkGreen1, 
            color: colors.white1,
            borderRight: `1px solid ${colors.lightGreen1Transparent}`
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: colors.lightGreen1, fontWeight: 'bold' }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: colors.lightGreen1Transparent }} />
      
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                    '&.Mui-selected': {
                        backgroundColor: colors.lightGreen1Transparent,
                        borderRight: `4px solid ${colors.lightGreen1}`
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(95, 238, 149, 0.05)'
                    }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? colors.lightGreen1 : colors.white2 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2, borderColor: colors.lightGreen1Transparent }} />
        
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => { 
                    if (logout) logout(); // Verificare de siguranță
                    navigate('/login'); 
                }}>
                    <ListItemIcon sx={{ color: '#ff5252' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Deconectare" sx={{ color: '#ff5252' }} />
                </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
export { DRAWER_WIDTH };