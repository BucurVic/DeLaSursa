import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button,
    Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';

import { colors, textResources } from '../../theme';
import EditUserModal, { type UserData } from '../../components/EditUserModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

// --- IMPORTĂM BUTOANELE TALE PERSONALIZATE ---
import EditButton from '../../components/buttonsProductView/EditButton';
import DeactivateButton from '../../components/buttonsProductView/DeactivateButton';
import DeleteButton from '../../components/buttonsProductView/DeleteButton';

// --- DATE SIMULATE ---
const CURRENT_ADMIN_ID = 1;

const mockUsers = [
    { id: 1, fullName: 'Victor Bucur', email: 'victor@admin.com', role: 'ADMIN', status: true, joinDate: '2023-10-15', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, fullName: 'Ion Popescu', email: 'ion.pop@email.com', role: 'PRODUCATOR', status: true, joinDate: '2023-11-02', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, fullName: 'Maria Ionescu', email: 'maria.i@email.com', role: 'CLIENT', status: true, joinDate: '2023-12-10', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, fullName: 'Andrei Rusu', email: 'andrei.spam@bad.com', role: 'CLIENT', status: false, joinDate: '2024-01-05', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, fullName: 'Elena Dumitrescu', email: 'elena.d@email.com', role: 'CLIENT', status: true, joinDate: '2024-02-20', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, fullName: 'George Enescu', email: 'george@music.ro', role: 'CLIENT', status: true, joinDate: '2024-02-20', avatar: 'https://i.pravatar.cc/150?u=6' },
];

const AdminUsersPage: React.FC = () => {
    const [rows, setRows] = useState(mockUsers);

    // --- STATE MODALE ---
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{id: number, name: string} | null>(null);

    const TR = textResources;
    const TUsers = TR.adminUsers;
    const TCommon = TR.productCard;

    // --- HANDLERS ---

    const handleAdd = () => {
        setSelectedUser(null);
        setIsEditOpen(true);
    };

    const handleEdit = (id: number) => {
        const userToEdit = rows.find(r => r.id === id);
        if (userToEdit) {
            setSelectedUser({
                id: userToEdit.id,
                username: userToEdit.fullName,
                email: userToEdit.email,
                role: userToEdit.role,
            });
            setIsEditOpen(true);
        }
    };

    const handleSaveUser = (userData: UserData) => {
        if (userData.id === 0) {
            const newUser = {
                id: Math.max(...rows.map(u => u.id), 0) + 1,
                fullName: userData.username,
                email: userData.email,
                role: userData.role,
                status: true,
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
            };
            setRows([...rows, newUser]);
        } else {
            setRows(rows.map(row =>
                row.id === userData.id
                    ? {
                        ...row,
                        fullName: userData.username,
                        email: userData.email,
                        role: userData.role
                    }
                    : row
            ));
        }
        setIsEditOpen(false);
    };

    const handleToggleStatus = (id: number, currentStatus: boolean) => {
        if (id === CURRENT_ADMIN_ID) return;
        const newStatus = !currentStatus;
        setRows(rows.map(row => row.id === id ? { ...row, status: newStatus } : row));
    };

    const handleDeleteClick = (id: number) => {
        if (id === CURRENT_ADMIN_ID) return;
        const user = rows.find(r => r.id === id);
        if (user) {
            setUserToDelete({ id: user.id, name: user.fullName });
            setIsDeleteOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            setRows(rows.filter((row) => row.id !== userToDelete.id));
            setIsDeleteOpen(false);
            setUserToDelete(null);
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'error';
            case 'PRODUCATOR': return 'warning';
            case 'CLIENT': return 'info';
            default: return 'default';
        }
    };

    // --- COLOANE ---
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'avatar',
            headerName: TUsers.columns.avatar,
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Avatar src={params.value} sx={{ width: 40, height: 40, border: `2px solid ${colors.lightGreen1}` }} />
                </Box>
            )
        },
        {
            field: 'fullName',
            headerName: TUsers.columns.user,
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.white1 }}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.white2 }}>
                        {params.row.email}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'role',
            headerName: TUsers.columns.role,
            width: 130,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Chip
                        icon={params.value === 'ADMIN' ? <SecurityIcon fontSize="small" /> : undefined}
                        label={params.value}
                        color={getRoleColor(params.value)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>
            )
        },
        {
            field: 'joinDate',
            headerName: TUsers.columns.joinDate,
            width: 120,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'status',
            headerName: TCommon.columns.status,
            width: 120,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: "0.7rem",
                            py: "0.3rem",
                            borderRadius: "0.75rem",
                            backgroundColor: params.value
                                ? colors.lightGreen1Transparent
                                : colors.redTransparent,
                            color: params.value
                                ? colors.lightGreen1
                                : colors.red1,
                            fontSize: "0.8rem",
                            minWidth: "5rem",
                            maxWidth: "5rem",
                            maxHeight: "2rem",
                            fontWeight: "bold"
                        }}
                    >
                        {params.value ? TCommon.status.active : TUsers.status.suspended}
                    </Box>
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: TCommon.columns.actions,
            minWidth: 350,
            flex: 0.7,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const isMyAccount = params.row.id === CURRENT_ADMIN_ID;

                const disabledStyle = isMyAccount ? {
                    opacity: 0.4,
                    pointerEvents: 'none' as const, // Previne click-ul
                } : {};

                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1rem",
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        {/* 1. BUTON EDITARE - Activ mereu (te poți edita pe tine) */}
                        <Box sx={{ width: "6rem" }}>
                            <EditButton
                                fullWidth={false}
                                onClick={() => handleEdit(params.row.id)}
                            />
                        </Box>

                        {/* 2. BUTON DEZACTIVARE / ACTIVARE - Blurat dacă e contul meu */}
                        <Box sx={disabledStyle}>
                            <DeactivateButton
                                onClick={() => handleToggleStatus(params.row.id, params.row.status)}
                                fullWidth={false}
                            >
                                {params.row.status
                                    ? TR.productCard.buttons.deactivate
                                    : TR.productCard.buttons.activate
                                }
                            </DeactivateButton>
                        </Box>

                        {/* 3. BUTON ȘTERGERE - Blurat dacă e contul meu */}
                        <Box sx={{ width: "6rem", ...disabledStyle }}>
                            <DeleteButton
                                fullWidth={false}
                                onClick={() => handleDeleteClick(params.row.id)}
                            />
                        </Box>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box sx={{ color: colors.white1, height: '100%', display: 'flex', flexDirection: 'column' }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {TUsers.title}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    startIcon={<PersonAddIcon />}
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        '&:hover': { bgcolor: colors.lightGreen2 }
                    }}
                >
                    {TUsers.addButton}
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
                        bgcolor: colors.white1,
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
                    rowHeight={80}
                />
            </Paper>

            <EditUserModal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={handleSaveUser}
                initialData={selectedUser}
            />

            <DeleteConfirmationModal
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={userToDelete?.name || ''}
                customMessage={
                    userToDelete
                        ? TUsers.messages.deleteConfirmDynamic.replace("{name}", userToDelete.name)
                        : ""
                }
            />
        </Box>
    );
};

export default AdminUsersPage;