import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button,
    Avatar,
    Tooltip,
    IconButton,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Divider
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AgricultureIcon from '@mui/icons-material/Agriculture';
// --- IMPORT NOU PENTRU BUTONUL X ---
import CloseIcon from '@mui/icons-material/Close';

import { colors, textResources } from '../../theme';
import EditUserModal, { type UserData } from '../../components/EditUserModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import {adminApi} from "../../api/adminApi.ts";

// --- MODAL VIZUALIZARE CERERE ACTUALIZAT ---
interface RequestModalProps {
    open: boolean;
    onClose: () => void;
    onApprove: () => void;
    onReject: () => void;
    data: any;
}

const ProducerRequestModal: React.FC<RequestModalProps> = ({ open, onClose, onApprove, onReject, data }) => {
    if (!data) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: colors.darkGreen2,
                    color: colors.white1,
                    border: `1px solid ${colors.lightGreen1}`,
                    borderRadius: '1.5rem',
                    p: 1
                }
            }}
        >
            {/* --- 1. TITLU CU BUTON X DE ÎNCHIDERE --- */}
            <DialogTitle sx={{m: 0, p: 2, textAlign: 'center', borderBottom: `1px solid ${colors.lightGreen1Transparent}`, mb: 2, position: 'relative'}}>
                <Typography variant="h4" fontWeight="bold" color={colors.lightGreen1}>
                    Solicitare Producător
                </Typography>

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: colors.lightGreen3,
                        '&:hover': { color: colors.white1, bgcolor: colors.lightGreen1Transparent }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {/* Header Cerere */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Avatar src={data.avatar} sx={{ width: 60, height: 60, border: `2px solid ${colors.lightGreen1}` }} />
                        <Box>
                            <Typography variant="h6">{data.fullName}</Typography>
                            <Typography variant="body2" color={colors.white2}>{data.email}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ bgcolor: colors.lightGreen1Transparent }} />

                    {/* Detalii Fermă (MOCK) */}
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.lightGreen2 }}>
                        <AgricultureIcon /> Detalii Fermă
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="caption" color={colors.white2}>Nume Fermă</Typography>
                            <Typography variant="body1" fontWeight="bold">{data.requestDetails?.farmName || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color={colors.white2}>CUI</Typography>
                            <Typography variant="body1">{data.requestDetails?.cui || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color={colors.white2}>Județ</Typography>
                            <Typography variant="body1">{data.requestDetails?.region || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color={colors.white2}>Telefon</Typography>
                            <Typography variant="body1">{data.requestDetails?.phone || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color={colors.white2}>Descriere</Typography>
                            <Paper sx={{ bgcolor: colors.darkGreen1, p: 2, mt: 0.5, borderRadius: '1rem' }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.9 }}>
                                    "{data.requestDetails?.description || 'Fără descriere.'}"
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            {/* --- 2. BUTOANE SCHIMBATE ÎNTRE ELE --- */}
            <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
                {/* STÂNGA: ACCEPTĂ */}
                <Button
                    onClick={onApprove}
                    variant="contained"
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        borderRadius: '1rem',
                        px: 4,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: colors.lightGreen2 }
                    }}
                >
                    Acceptă Cererea
                </Button>

                {/* DREAPTA: RESPINGE */}
                <Button
                    onClick={onReject}
                    variant="outlined"
                    color="error"
                    sx={{ borderRadius: '1rem', px: 4, textTransform: 'none', fontWeight: 'bold' }}
                >
                    Respinge
                </Button>
            </DialogActions>
        </Dialog>
    );
};


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

    // --- STATE MODAL CERERE ---
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [selectedRequestUser, setSelectedRequestUser] = useState<any>(null);

    const TR = textResources;
    const TUsers = TR.adminUsers;
    const TCommon = TR.productCard;

    useEffect(() => {
        adminApi.getUsers(page, pageSize).then(response => {
            const data = response.data;

            const mapped = data.content.map((u: any) => {
                const isPending = u.id === 2;

                const mockRequestDetails = isPending ? {
                    farmName: "Ferma Bio Poiana Verde",
                    cui: "RO9876543",
                    region: "Bistrița-Năsăud",
                    phone: "0701 111 111",
                    description: "Producem legume bio și lactate proaspete. Dorim să ne extindem piața de desfacere prin platforma voastră."
                } : null;

                return {
                    id: u.id,
                    fullName: `${u.userDetails?.nume ?? ""} ${u.userDetails?.prenume ?? ""}`.trim(),
                    email: u.email,
                    role: u.roles.length > 0 ? u.roles[0].toUpperCase() : "UNKNOWN",
                    status: u.status ?? true,
                    joinDate: u.registrationDate,
                    avatar: u.avatar,
                    isPendingProducer: isPending && !u.roles.includes('PRODUCATOR'),
                    requestDetails: mockRequestDetails
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

    const handleViewRequest = (row: any) => {
        setSelectedRequestUser(row);
        setIsRequestModalOpen(true);
    };

    const handleConfirmApprove = () => {
        if (selectedRequestUser) {
            console.log(`User ID ${selectedRequestUser.id} aprobat ca producător.`);
            setRows(rows.map(row =>
                row.id === selectedRequestUser.id
                    ? { ...row, role: 'PRODUCATOR', isPendingProducer: false, requestDetails: null }
                    : row
            ));
        }
        setIsRequestModalOpen(false);
        setSelectedRequestUser(null);
    };

    const handleRejectRequest = () => {
        if (selectedRequestUser) {
            console.log(`User ID ${selectedRequestUser.id} respins.`);
            setRows(rows.map(row =>
                row.id === selectedRequestUser.id
                    ? { ...row, isPendingProducer: false, requestDetails: null }
                    : row
            ));
        }
        setIsRequestModalOpen(false);
        setSelectedRequestUser(null);
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
            width: 240,
            renderCell: (params: GridRenderCellParams) => {
                const isPending = params.row.isPendingProducer;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
                        <Chip
                            icon={params.value === 'ADMIN' ? <SecurityIcon fontSize="small" /> : undefined}
                            label={params.value}
                            color={getRoleColor(params.value)}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        />
                        {isPending && (
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<VisibilityIcon sx={{ width: 16, height: 16 }} />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewRequest(params.row);
                                }}
                                sx={{
                                    bgcolor: colors.lightGreen1,
                                    color: colors.darkGreen2,
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    py: 0.2,
                                    px: 1.5,
                                    borderRadius: '0.8rem',
                                    '&:hover': { bgcolor: colors.lightGreen2 },
                                    boxShadow: '0 0 5px rgba(0,0,0,0.3)'
                                }}
                            >
                                Vezi Cerere
                            </Button>
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
                    <Chip
                        label={params.value ? TCommon.status.active : TUsers.status.suspended}
                        color={params.value ? "success" : "error"}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: TCommon.columns.actions,
            minWidth: 180,
            flex: 0.5,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const isMyAccount = params.row.id === CURRENT_ADMIN_ID;

                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 1,
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <Tooltip title="Editează">
                            <IconButton onClick={() => handleEdit(params.row.id)} sx={{ color: colors.lightGreen1 }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={params.row.status ? "Dezactivează" : "Activează"}>
                            <Switch
                                checked={params.row.status}
                                onChange={() => handleToggleStatus(params.row.id, params.row.status)}
                                color="success"
                                size="small"
                                disabled={isMyAccount}
                            />
                        </Tooltip>

                        <Tooltip title="Șterge">
                            <span>
                                <IconButton onClick={() => handleDeleteClick(params.row.id)} sx={{ color: '#ff5252' }} disabled={isMyAccount}>
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
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

            <ProducerRequestModal
                open={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                data={selectedRequestUser}
                onApprove={handleConfirmApprove}
                onReject={handleRejectRequest}
            />

        </Box>
    );
};

export default AdminUsersPage;