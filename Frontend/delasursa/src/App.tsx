import React from 'react';
//import SignUpPage from './components/SignUpPage'; 
//import ResetPasswordPage from './components/ResetPasswordPage';
//import ViewToggleButtons from './components/ViewToggleButtons';
//import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EditProductModal from './components/EditProductModal';
import { Box,Typography } from '@mui/material';
import './App.css'; 

function App() {
  /*
  const handleViewChange = (view: 'grid' | 'list') => {
    console.log(`Vizualizare activă: ${view}`);
  };

  return (
    
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      
      <ViewToggleButtons onViewChange={handleViewChange} />
      
    </Box>
  );
  */

  /*
  const handleClose = () => { console.log("Modal închis."); };
  const handleConfirm = () => { console.log("Ștergere confirmată!"); };


  return (
    
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0C1A14' }}>
      
      <Typography variant="h6" sx={{ color: '#BEBEBE' }}>
        Pagina principală este goală.
      </Typography>

      
      <DeleteConfirmationModal
        open={true} 
        onClose={handleClose} 
        onConfirm={handleConfirm} 
        productName="Roșii Cherry Bio" 
      />
      
    </Box>
  );
  */

  const mockData = { 
    name: "Roșii Cherry Bio", 
    category: "Legume", 
    price: "22 lei", 
    stock: "45", 
    unit: "kg" 
  };

  return (
    // ...
    <EditProductModal
      open={true} // Setat la true pentru a fi vizibil
      onClose={() => console.log("Închis")}
      onSave={(data) => console.log("Date salvate:", data)}
      initialData={mockData}
    />);
}

export default App;