import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors.ts";
import {textResources} from "../../theme/textResources.ts";

interface DeactivateButtonProps {
    onClick?: () => void;
    fullWidth?: boolean;
}

const DeactivateButton: React.FC<DeactivateButtonProps> = ({ onClick, fullWidth = true }) => {
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
                justifyContent: "flex-start",
                fontFamily: '"Manrope", sans-serif',
                "&:hover": {
                    backgroundColor: colors.lightGreen1Transparent,
                    borderColor: colors.lightGreen2,
                },
            }}
        >
            {textResources.buttons.deactivate}
        </Button>
    );
};

export default DeactivateButton;