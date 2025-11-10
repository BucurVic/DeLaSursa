import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors.ts";
import {textResources} from "../../theme/textResources.ts";

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
                borderColor: colors.lightGreen1,
                color: colors.lightGreen1,
                fontWeight: 700,
                textTransform: "uppercase",
                borderRadius: "0.75rem",
                py: 1,
                fontFamily: '"Manrope", sans-serif',
                justifyContent: "flex-start",
                pl: 2,
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