import React, {useEffect, useState} from 'react';
import { 
  Box, Typography, Paper, IconButton, Chip, Button, Tooltip, Switch, Avatar 
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { colors } from '../../theme/colors';

import AdminProductModal from '../../pages/admin/AdminProductModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import {produseApi} from "../../api/produseApi.ts";
import type {Produs} from "../../types/Produs.ts";

const initialProducts = [
  { id: 1, name: 'Roșii Cherry Bio', producer: 'Ferma Vedeta', price: 22.00, stock: 45, category: 'Legume', active: true, image: '', unit: 'kg' },
  { id: 2, name: 'Miere de Salcâm', producer: 'Apicultor Ion', price: 35.00, stock: 12, category: 'Miere', active: true, image: '', unit: 'borcan' },
  { id: 3, name: 'Brânză de Capră', producer: 'Stâna Deal', price: 40.00, stock: 0, category: 'Lactate', active: false, image: '', unit: 'kg' },
  { id: 4, name: 'Mere Ionathan', producer: 'Livada Soarelui', price: 5.00, stock: 200, category: 'Fructe', active: true, image: '', unit: 'kg' },
  { id: 5, name: 'Suc de Mere', producer: 'Livada Soarelui', price: 15.00, stock: 50, category: 'Băuturi', active: true, image: '', unit: 'L' },
];

const AdminProductsPage: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(6);
  const [rowCount, setRowCount] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        produseApi.getAllPaged(page,pageSize)
            .then(res => {
                const data = res.data;

                const mappedRows = data.content.map((p: Produs) => ({
                    id: p.id,
                    name: p.produsName,
                    producer: p.producatorName,
                    category: p.categorie,
                    price: p.pret,
                    stock: p.cantitate,
                    unit: p.unitate_masura,
                    image: p.produsImagine || "",
                    active: true // dacă backend-ul nu trimite încă activ/inactiv
                }));

                setRows(mappedRows);
                setRowCount(data.totalElements);
            })
            .catch(console.error)
    }, [page,pageSize]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData: any) => {
    if (modalMode === 'add') {
      const newId = Math.max(...rows.map(r => r.id), 0) + 1;
      const newProduct = { id: newId, ...formData, image: '' };
      setRows([...rows, newProduct]);
    } else {
      setRows(rows.map(row => row.id === selectedProduct.id ? { ...row, ...formData } : row));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const productToDelete = rows.find(r => r.id === id);
    if(productToDelete) {
        setSelectedProduct(productToDelete);
        setIsDeleteOpen(true);
    }
  };

  const confirmDelete = () => {
      if(selectedProduct) {
          setRows(rows.filter(r => r.id !== selectedProduct.id));
          setIsDeleteOpen(false);
          setSelectedProduct(null);
      }
  }

  const handleToggleActive = (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setRows(rows.map(row => row.id === id ? { ...row, active: newStatus } : row));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { 
      field: 'image', headerName: 'Img', width: 60, sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
            variant="rounded"
            src={params.row.image}
            alt={params.row.name}
            sx={{
                width: 35,
                height: 35,
                bgcolor: colors.lightGreen1Transparent,
                color: colors.lightGreen1,
                objectFit: 'cover'
            }}
        >
            {params.row.name.charAt(0)}
        </Avatar>
      )
    },
    { field: 'name', headerName: 'Nume Produs', flex: 1, minWidth: 150 },
    { field: 'producer', headerName: 'Producător', width: 150 },
    { field: 'category', headerName: 'Categorie', width: 100 },
    { field: 'price', headerName: 'Preț', width: 80, type: 'number' },
    { field: 'stock', headerName: 'Stoc', width: 80, type: 'number' },
    { field: 'unit', headerName: 'UM', width: 70 },
    {
      field: 'active', headerName: 'Status', width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label={params.value ? "Activ" : "Inactiv"} color={params.value ? "success" : "default"} size="small" variant="outlined" />
      )
    },
    {
      field: 'actions', headerName: 'Acțiuni', width: 150, sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Editează">
            <IconButton onClick={() => handleOpenEdit(params.row)} sx={{ color: colors.lightGreen1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Șterge">
            <IconButton onClick={() => handleDelete(params.row.id)} sx={{ color: '#ff5252' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Switch checked={params.row.active} onChange={() => handleToggleActive(params.row.id, params.row.active)} color="success" size="small" />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ color: colors.white1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Toate Produsele</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2, '&:hover': { bgcolor: colors.lightGreen2 } }}>
          Adaugă Produs
        </Button>
      </Box>

      <Paper sx={{ flexGrow: 1, bgcolor: colors.darkGreen2, color: colors.white1, '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-cell': { borderBottom: `1px solid ${colors.lightGreen1Transparent}`, color: colors.white1 }, '& .MuiDataGrid-columnHeaders': { bgcolor: 'rgba(95, 238, 149, 0.05)', color: colors.lightGreen1, fontWeight: 'bold' }, '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${colors.lightGreen1Transparent}` }, '& .MuiTablePagination-root': { color: colors.white2 }, '& .MuiSvgIcon-root': { color: colors.white2 } }}>
        <DataGrid rows={rows}
                  columns={columns}
                  pagination
                  paginationMode="server"
                  rowCount={rowCount}
                  paginationModel={{page,pageSize}}
                  onPaginationModelChange={(model) =>{
                    setPage(model.page);
                    setPageSize(model.pageSize);
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                  disableRowSelectionOnClick />
      </Paper>

      <AdminProductModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={selectedProduct}
        mode={modalMode}
      />

        {/* --- AICI AM FĂCUT MODIFICAREA --- */}
        {/* Folosim 'itemName' în loc de 'productName' */}
       <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedProduct?.name || ''} 
      />
    </Box>
  );
};

export default AdminProductsPage;