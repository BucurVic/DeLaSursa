import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { colors, textResources, typography } from "../theme";

interface PaymentConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    amount: string;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
                                                                               open,
                                                                               onClose,
                                                                               onConfirm,
                                                                               amount,
                                                                           }) => {
    const tr = textResources.checkout.paymentModal;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: colors.darkGreen2,
                    color: colors.white1,
                    borderRadius: "0.75rem",
                    boxShadow: "0 0 25px rgba(0,0,0,0.35)",
                    p: "0.5rem",
                    maxWidth: "28rem",
                    width: "90%",
                },
            }}
        >
            <DialogTitle sx={{ pb: 1.5 }}>
                <Typography sx={{ ...typography.h4, color: colors.lightGreen1, fontWeight: 700 }}>
                    {tr.title}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: 0, pb: "1.5rem" }}>
                <DialogContentText sx={{ ...typography.body1, color: colors.white1, opacity: 0.85 }}>
                    {tr.message.replace("{amount}", amount)}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ pb: "1.5rem", pr: "1.5rem", gap: "1rem" }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: colors.lightGreen1,
                        border: `1px solid ${colors.lightGreen1}`,
                        borderRadius: "0.5rem",
                        px: "1.5rem",
                        "&:hover": { backgroundColor: colors.lightGreen1Transparent },
                    }}
                >
                    {textResources.buttons.cancel}
                </Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        bgcolor: colors.lightGreen1,
                        color: colors.darkGreen2,
                        fontWeight: "bold",
                        borderRadius: "0.5rem",
                        px: "1.5rem",
                        "&:hover": { bgcolor: colors.lightGreen2 },
                    }}
                >
                    {tr.confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentConfirmationModal;