import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, IconButton, Box, Typography,
    Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, CircularProgress, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { colors } from '../theme';
import { subscriptiiApi } from '../api/subscriptiiApi';
import type {SubscriptieDTO} from '../common/types';

interface ViewSubscribersModalProps {
    open: boolean;
    onClose: () => void;
    pachetId: number | null;
    pachetNume: string;
}

const ViewSubscribersModal: React.FC<ViewSubscribersModalProps> = ({ open, onClose, pachetId, pachetNume }) => {
    const [subscribers, setSubscribers] = useState<SubscriptieDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open && pachetId) {
            fetchData(pachetId);
        } else {
            setSubscribers([]); // Reset la inchidere
        }
    }, [open, pachetId]);

    const fetchData = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await subscriptiiApi.getByPachet(id);
            setSubscribers(res.data.content);
        } catch (err) {
            setError("Nu s-au putut încărca abonații.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: colors.darkGreen1,
                    color: colors.white1,
                    borderRadius: "1.5rem",
                    border: `1px solid ${colors.lightGreen1Transparent}`
                }
            }}
        >
            <DialogTitle sx={{ borderBottom: `1px solid ${colors.lightGreen1Transparent}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Abonați activi</Typography>
                    <Typography variant="caption" sx={{ color: colors.lightGreen1 }}>
                        Pentru: {pachetNume}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: colors.white2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ minHeight: '300px', p: 0 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress sx={{ color: colors.lightGreen1 }} />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
                ) : subscribers.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 5, p: 2 }}>
                        <Typography sx={{ color: colors.white2 }}>Nu există niciun client abonat la acest pachet încă.</Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 2 }}>
                        {subscribers.map((sub) => (
                            <ListItem key={sub.id} sx={{
                                mb: 1,
                                bgcolor: 'rgba(255,255,255,0.05)',
                                borderRadius: '1rem',
                                border: `1px solid ${colors.lightGreen1Transparent}`
                            }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.lightGreen1, color: colors.darkGreen2 }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight="bold" color={colors.white1}>
                                            {sub.client.nume} {sub.client.prenume}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography variant="caption" color={colors.white2}>
                                                {sub.client.telefon} | {sub.client.email}
                                            </Typography>
                                            <Typography variant="caption" color={colors.lightGreen1}>
                                                Start: {sub.dataInceput} | Frecvență: {sub.frecventa} zile
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Chip
                                    size="small"
                                    icon={sub.status === 'ACTIV' ? <CheckCircleIcon/> : <CancelIcon/>}
                                    label={sub.status}
                                    color={sub.status === 'ACTIV' ? "success" : "default"}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewSubscribersModal;