import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors.ts";
import { typography } from "../../theme/typography.ts";
import { textResources } from "../../theme/textResources.ts";

interface DeleteButtonProps {
    onClick?: () => void;
    fullWidth?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, fullWidth = true }) => {
    return (
        <Button
            onClick={onClick}
            fullWidth={fullWidth}
            variant="outlined"
            sx={{
                ...typography.button,
                justifyContent: "flex-start", // 👈 text aliniat la stânga
                borderColor: colors.red1,
                color: colors.red1,
                borderRadius: "0.75rem",
                py: "0.9rem",
                letterSpacing: "0.02em",
                "&:hover": {
                    backgroundColor: colors.redTransparent,
                    borderColor: colors.red1,
                },
            }}
        >
            {textResources.buttons.delete}
        </Button>
    );
};

export default DeleteButton;
