import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { colors } from '../theme';

interface RoleWarningModalProps {
    open: boolean;
    onClose: () => void;
    roleName: string | null;
}

export const RoleWarningModal: React.FC<RoleWarningModalProps> = ({ open, onClose, roleName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: colors.darkGreen2,
                    color: colors.white1,
                    border: `1px solid ${colors.lightGreen1}`,
                    borderRadius: '1.5rem',
                    p: 2,
                    textAlign: 'center',
                    minWidth: '300px'
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <InfoIcon sx={{ fontSize: '3rem', color: colors.lightGreen1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Ești deja înregistrat!
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ color: colors.white2, mb: 1, fontSize: '1.1rem' }}>
                    Contul tău are deja drepturi de <span style={{ color: colors.lightGreen1, fontWeight: 'bold' }}>{roleName}</span>.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Nu este necesar să completezi formularul din nou.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        fontWeight: 'bold',
                        borderRadius: '1rem',
                        px: 4,
                        '&:hover': { bgcolor: colors.lightGreen2 }
                    }}
                >
                    Am înțeles
                </Button>
            </DialogActions>
        </Dialog>
    );
};