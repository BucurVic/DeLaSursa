import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors.ts";
import { typography } from "../../theme/typography.ts";
import { textResources } from "../../theme/textResources.ts";

interface EditButtonProps {
    onClick?: () => void;
    fullWidth?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, fullWidth = true }) => {
    return (
        <Button
            onClick={onClick}
            fullWidth={fullWidth}
            variant="outlined"
            sx={{
                ...typography.button,
                justifyContent: "flex-start", // 👈 text aliniat la stânga
                borderColor: colors.lightGreen1,
                color: colors.lightGreen1,
                borderRadius: "0.75rem",
                py: "0.9rem",
                letterSpacing: "0.02em",
                "&:hover": {
                    backgroundColor: colors.lightGreen1Transparent,
                    borderColor: colors.lightGreen2,
                },
            }}
        >
            {textResources.buttons.edit}
        </Button>
    );
};

export default EditButton;