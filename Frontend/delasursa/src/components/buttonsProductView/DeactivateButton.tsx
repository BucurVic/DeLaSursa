import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../theme/colors.ts";
import { typography } from "../../theme/typography.ts";
import { textResources } from "../../theme/textResources.ts";

interface DeactivateButtonProps {
    onClick?: () => void;
    fullWidth?: boolean;
    children?: React.ReactNode;
}

const DeactivateButton: React.FC<DeactivateButtonProps> = ({
                                                               onClick,
                                                               fullWidth = true,
                                                               children,
                                                           }) => {
    return (
        <Button
            onClick={onClick}
            fullWidth={fullWidth}
            variant="outlined"
            sx={{
                ...typography.button,
                // justifyContent: "flex-start",
                // pl: "1rem",
                borderColor: colors.lightGreen1,
                color: colors.lightGreen1,
                borderRadius: "0.75rem",
                py: "0.9rem",
                letterSpacing: "0.02em",
                width: "8rem !important",
                minWidth: "8rem !important",
                maxWidth: "8rem !important",
                "&:hover": {
                    backgroundColor: colors.lightGreen1Transparent,
                    borderColor: colors.lightGreen2,
                },
            }}
        >
            {children || textResources.buttons.deactivate}
        </Button>
    );
};

export default DeactivateButton;