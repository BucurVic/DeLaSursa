import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Chip, 
  Button,
  Tooltip
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { colors } from '../../theme/colors';

// --- DATE SIMULATE (Aici vor veni din Backend) ---
const mockOrders = [
  { id: 1, customer: 'Popescu Ion', date: '2023-10-25', total: '150.00 RON', status: 'PENDING', items: 3 },
  { id: 2, customer: 'Maria Ionescu', date: '2023-10-24', total: '45.50 RON', status: 'COMPLETED', items: 1 },
  { id: 3, customer: 'Vasile Andrei', date: '2023-10-24', total: '320.00 RON', status: 'SHIPPED', items: 5 },
  { id: 4, customer: 'Elena Dumitru', date: '2023-10-23', total: '80.00 RON', status: 'CANCELLED', items: 2 },
  { id: 5, customer: 'George Enescu', date: '2023-10-22', total: '1200.00 RON', status: 'PENDING', items: 10 },
];

const AdminOrdersPage: React.FC = () => {
  const [rows, setRows] = useState(mockOrders);

  // --- HANDLERS ---
  const handleDelete = (id: number) => {
    if (window.confirm('Ești sigur că vrei să ștergi această comandă?')) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleStatusChange = (id: number) => {
    console.log("Deschide modal editare status pentru comanda:", id);
    // Aici vom implementa logica de editare status
  };

  // --- DEFINIREA COLOANELOR ---
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customer', headerName: 'Client', flex: 1, minWidth: 150 },
    { field: 'date', headerName: 'Dată', width: 120 },
    { field: 'items', headerName: 'Produse', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'total', headerName: 'Total', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        let color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "default";
        if (params.value === 'COMPLETED') color = "success";
        if (params.value === 'PENDING') color = "warning";
        if (params.value === 'SHIPPED') color = "info";
        if (params.value === 'CANCELLED') color = "error";
        
        return (
          <Chip label={params.value} color={color} size="small" variant="outlined" sx={{ fontWeight: 'bold' }} />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Acțiuni',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Vezi detalii / Editează">
            <IconButton onClick={() => handleStatusChange(params.row.id)} sx={{ color: colors.lightGreen1 }}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Șterge">
            <IconButton onClick={() => handleDelete(params.row.id)} sx={{ color: '#ff5252' }}>
              <DeleteIcon />
            </IconButton>
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
          Comenzi
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
          Comandă Nouă
        </Button>
      </Box>

      {/* Tabelul (DataGrid) */}
      <Paper 
        sx={{ 
          flexGrow: 1, 
          bgcolor: colors.darkGreen2, 
          color: colors.white1,
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
            color: colors.white1,
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'rgba(95, 238, 149, 0.05)',
            borderBottom: `1px solid ${colors.lightGreen1}`,
            color: colors.lightGreen1,
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${colors.lightGreen1Transparent}`,
          },
          '& .MuiTablePagination-root': {
            color: colors.white2,
          },
          '& .MuiSvgIcon-root': {
            color: colors.white2,
          }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default AdminOrdersPage;