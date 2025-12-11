import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button,
    Avatar,
    Tooltip,
    IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Iconita pentru aprobare

import { colors, textResources } from '../../theme';
import EditUserModal, { type UserData } from '../../components/EditUserModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

import EditButton from '../../components/buttonsProductView/EditButton';
import DeactivateButton from '../../components/buttonsProductView/DeactivateButton';
import DeleteButton from '../../components/buttonsProductView/DeleteButton';
import {adminApi} from "../../api/adminApi.ts";

const CURRENT_ADMIN_ID = 1;

const AdminUsersPage: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [rowCount, setRowCount] = useState(0);

    // --- STATE MODALE ---
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{id: number, name: string} | null>(null);

    const TR = textResources;
    const TUsers = TR.adminUsers;
    const TCommon = TR.productCard;

    useEffect(() => {
        adminApi.getUsers(page, pageSize).then(response => {
            const data = response.data;

            const mapped = data.content.map((u: any) => {
                // --- LOGICĂ SIMULATĂ: Determinam cine are cerere depusa ---
                // In productie, asta vine din backend (ex: u.requestedRole === 'PRODUCATOR')
                const isPending = u.userDetails?.nume === "Rusu" || u.id === 4;

                return {
                    id: u.id,
                    fullName: `${u.userDetails?.nume ?? ""} ${u.userDetails?.prenume ?? ""}`.trim(),
                    email: u.email,
                    role: u.roles.length > 0 ? u.roles[0].toUpperCase() : "UNKNOWN",
                    status: u.status ?? true,
                    joinDate: u.registrationDate,
                    avatar: u.avatar,
                    isPendingProducer: isPending && !u.roles.includes('PRODUCATOR')
                };
            });

            setRows(mapped);
            setRowCount(data.totalElements);
        })
    }, [page, pageSize]);

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

    // --- HANDLER APROBARE ---
    const handleApproveProducer = (id: number) => {
        console.log(`User ID ${id} aprobat ca producător.`);
        // Call API here...

        // Update local
        setRows(rows.map(row =>
            row.id === id
                ? { ...row, role: 'PRODUCATOR', isPendingProducer: false }
                : row
        ));
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
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
                isPendingProducer: false
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

    // --- CULORI ORIGINALE ---
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'error';     // Roșu
            case 'PRODUCATOR': return 'warning'; // Portocaliu
            case 'CLIENT': return 'info';     // Albastru
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
            width: 200, // Am mărit lățimea pentru a încăpea și bifa
            renderCell: (params: GridRenderCellParams) => {
                const isPending = params.row.isPendingProducer;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
                        {/* Chip-ul cu rolul curent (ex: CLIENT - Albastru) */}
                        <Chip
                            icon={params.value === 'ADMIN' ? <SecurityIcon fontSize="small" /> : undefined}
                            label={params.value}
                            color={getRoleColor(params.value)}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        />

                        {/* Bifa de aprobare apare doar dacă e solicitare */}
                        {isPending && (
                            <Tooltip title="Aprobă cerere producător">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // Previne selectarea rândului
                                        handleApproveProducer(params.row.id);
                                    }}
                                    size="small"
                                    sx={{
                                        color: colors.darkGreen2,
                                        bgcolor: colors.lightGreen1,
                                        '&:hover': { bgcolor: colors.lightGreen2 },
                                        width: 28, height: 28
                                    }}
                                >
                                    <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                );
            }
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
                const disabledStyle = isMyAccount ? { opacity: 0.4, pointerEvents: 'none' as const } : {};

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
                        {/* 1. EDIT BUTTON */}
                        <Box sx={{ width: "6rem" }}>
                            <EditButton
                                fullWidth={false}
                                onClick={() => handleEdit(params.row.id)}
                            />
                        </Box>

                        {/* 2. DEACTIVATE BUTTON */}
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

                        {/* 3. DELETE BUTTON */}
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
                    pagination
                    paginationMode="server"
                    rowCount={rowCount}
                    paginationModel={{page, pageSize}}
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setPageSize(model.pageSize);
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