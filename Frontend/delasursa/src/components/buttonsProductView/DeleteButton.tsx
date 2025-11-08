import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors";
import { textResources } from "../../theme/textResources";

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
                borderColor: colors.red1,
                color: colors.red1,
                fontWeight: 700,
                textTransform: "uppercase",
                borderRadius: "0.75rem",
                py: 1,
                pl: 2,
                justifyContent: "flex-start",
                fontFamily: '"Manrope", sans-serif',
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