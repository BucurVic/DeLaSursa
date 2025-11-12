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
import { colors } from "../theme/colors.ts";
import { typography } from "../theme/typography.ts";
import { textResources as tr } from "../theme/textResources.ts";

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
                                                                             open,
                                                                             onClose,
                                                                             onConfirm,
                                                                             productName,
                                                                         }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const message = tr.deleteModal.message.replace("{productName}", productName);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirm-title"
            aria-describedby="delete-confirm-description"
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
            <DialogTitle id="delete-confirm-title" sx={{ pb: 1.5 }}>
                <Typography
                    sx={{
                        ...typography.h4,
                        color: colors.lightGreen1,
                        fontWeight: 700,
                    }}
                >
                    {tr.deleteModal.title}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: 0, pb: "1.5rem" }}>
                <DialogContentText
                    id="delete-confirm-description"
                    sx={{
                        ...typography.body1,
                        color: colors.white1,
                        opacity: 0.85,
                        lineHeight: 1.6,
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ pb: "1.5rem", pr: "1.5rem", gap: "1rem" }}>
                <Button
                    onClick={onClose}
                    sx={{
                        ...typography.button,
                        color: colors.lightGreen1,
                        border: `1px solid ${colors.lightGreen1}`,
                        backgroundColor: "transparent",
                        borderRadius: "0.5rem",
                        px: "1.5rem",
                        py: "0.6rem",
                        "&:hover": {
                            backgroundColor: colors.lightGreen1Transparent,
                            borderColor: colors.lightGreen2,
                        },
                    }}
                >
                    {tr.buttons.cancel}
                </Button>

                <Button
                    onClick={handleConfirm}
                    sx={{
                        ...typography.button,
                        color: colors.red1,
                        border: `1px solid ${colors.red1}`,
                        borderRadius: "0.5rem",
                        px: "1.5rem",
                        py: "0.6rem",
                        fontWeight: 700,
                        "&:hover": {
                            backgroundColor: colors.redTransparent,
                        },
                    }}
                    autoFocus
                >
                    {tr.buttons.delete}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;