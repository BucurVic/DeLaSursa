import React, { useState } from 'react';
import { 
  Box, Typography, Paper, IconButton, Chip, Button, Tooltip 
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { colors } from '../../theme/colors';

// --- IMPORTĂM MODALELE ---
import AdminOrderModal, {type OrderData } from '../../pages/admin/AdminOrderModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

// Date Simulate
const mockOrders: OrderData[] = [
  { id: 1, customer: 'Popescu Ion', date: '2023-10-25', total: '150.00 RON', status: 'PENDING', items: 3 },
  { id: 2, customer: 'Maria Ionescu', date: '2023-10-24', total: '45.50 RON', status: 'COMPLETED', items: 1 },
  { id: 3, customer: 'Vasile Andrei', date: '2023-10-24', total: '320.00 RON', status: 'SHIPPED', items: 5 },
  { id: 4, customer: 'Elena Dumitru', date: '2023-10-23', total: '80.00 RON', status: 'CANCELLED', items: 2 },
  { id: 5, customer: 'George Enescu', date: '2023-10-22', total: '1200.00 RON', status: 'PENDING', items: 10 },
];

const AdminOrdersPage: React.FC = () => {
  const [rows, setRows] = useState(mockOrders);

  // --- STARE MODALE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setModalMode('add');
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (order: OrderData) => {
    setModalMode('edit');
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (order: OrderData) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  const handleSaveOrder = (formData: OrderData) => {
    if (modalMode === 'add') {
      const newId = Math.max(...rows.map(r => r.id || 0), 0) + 1;
      const newOrder = { ...formData, id: newId };
      setRows([...rows, newOrder]);
    } else {
      setRows(rows.map(row => row.id === selectedOrder?.id ? { ...row, ...formData } : row));
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      setRows(rows.filter(r => r.id !== selectedOrder.id));
      setIsDeleteOpen(false);
      setSelectedOrder(null);
    }
  };

  // --- COLOANE ---
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
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Editează">
            <IconButton onClick={() => handleOpenEdit(params.row)} sx={{ color: colors.lightGreen1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Șterge">
            <IconButton onClick={() => handleOpenDelete(params.row)} sx={{ color: '#ff5252' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ color: colors.white1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Toate Comenzile
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ 
            bgcolor: colors.lightGreen1, 
            color: colors.darkGreen2,
            '&:hover': { bgcolor: colors.lightGreen2 }
          }}
        >
          Comandă Nouă
        </Button>
      </Box>

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
          '& .MuiSvgIcon-root': { color: colors.white2 }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      {/* --- MODALE --- */}
      <AdminOrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrder}
        initialData={selectedOrder}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={`Comanda #${selectedOrder?.id} - ${selectedOrder?.customer}`}
      />
    </Box>
  );
};

export default AdminOrdersPage;