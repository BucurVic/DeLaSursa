import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Chip, 
  Button,
  Tooltip,
  Switch,
  Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'; // Importăm tipurile separat
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block'; // Pentru dezactivare
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Pentru activare
import AddIcon from '@mui/icons-material/Add';

import { colors } from '../../theme/colors';

// --- DATE SIMULATE (MOCK) ---
const mockProducts = [
  { id: 1, name: 'Roșii Cherry Bio', producer: 'Ferma Vedeta', price: 22.00, stock: 45, category: 'Legume', active: true, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Miere de Salcâm', producer: 'Apicultor Ion', price: 35.00, stock: 12, category: 'Miere', active: true, image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Brânză de Capră', producer: 'Stâna Deal', price: 40.00, stock: 0, category: 'Lactate', active: false, image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Mere Ionathan', producer: 'Livada Soarelui', price: 5.00, stock: 200, category: 'Fructe', active: true, image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Suc de Mere', producer: 'Livada Soarelui', price: 15.00, stock: 50, category: 'Băuturi', active: true, image: 'https://via.placeholder.com/50' },
];

const AdminProductsPage: React.FC = () => {
  const [rows, setRows] = useState(mockProducts);

  // --- HANDLERS ---
  const handleToggleActive = (id: number, currentStatus: boolean) => {
    // Aici vom apela backend-ul pentru a dezactiva/activa
    const newStatus = !currentStatus;
    setRows(rows.map(row => row.id === id ? { ...row, active: newStatus } : row));
    console.log(`Produsul ${id} este acum ${newStatus ? 'Activ' : 'Inactiv'}`);
  };

  const handleEdit = (id: number) => {
    console.log("Editare produs:", id);
    // Aici vom deschide modalul de editare (pe care l-am făcut deja!)
  };

  // --- COLOANE ---
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'image', 
      headerName: 'Img', 
      width: 70, 
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar src={params.value} variant="rounded" sx={{ width: 40, height: 40 }} />
      )
    },
    { field: 'name', headerName: 'Nume Produs', flex: 1, minWidth: 150 },
    { field: 'producer', headerName: 'Producător', width: 150 },
    { field: 'category', headerName: 'Categorie', width: 120 },
    { 
      field: 'price', 
      headerName: 'Preț (RON)', 
      width: 110, 
      type: 'number',
      align: 'left', 
      headerAlign: 'left' 
    },
    { 
      field: 'stock', 
      headerName: 'Stoc', 
      width: 90, 
      type: 'number',
      align: 'left', 
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ color: params.value === 0 ? '#ff5252' : 'inherit', fontWeight: params.value === 0 ? 'bold' : 'normal' }}>
          {params.value}
        </Box>
      )
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value ? "Activ" : "Inactiv"} 
          color={params.value ? "success" : "default"} 
          size="small" 
          variant={params.value ? "filled" : "outlined"}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Acțiuni',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Editează">
            <IconButton onClick={() => handleEdit(params.row.id)} sx={{ color: colors.lightGreen1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={params.row.active ? "Dezactivează" : "Activează"}>
            <Switch 
              checked={params.row.active}
              onChange={() => handleToggleActive(params.row.id, params.row.active)}
              color="success"
              size="small"
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ color: colors.white1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Pagina */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Toate Produsele
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: colors.lightGreen1, 
            color: colors.darkGreen2,
            '&:hover': { bgcolor: colors.lightGreen2 }
          }}
        >
          Adaugă Produs
        </Button>
      </Box>

      {/* Tabelul */}
      <Paper 
        sx={{ 
          flexGrow: 1, 
          bgcolor: colors.darkGreen2, 
          color: colors.white1,
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: `1px solid ${colors.lightGreen1Transparent}`, color: colors.white1 },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'rgba(95, 238, 149, 0.05)',
            borderBottom: `1px solid ${colors.lightGreen1}`,
            color: colors.lightGreen1,
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${colors.lightGreen1Transparent}` },
          '& .MuiTablePagination-root': { color: colors.white2 },
          '& .MuiSvgIcon-root': { color: colors.white2 },
          '& .MuiSwitch-track': { bgcolor: colors.white2 },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default AdminProductsPage;