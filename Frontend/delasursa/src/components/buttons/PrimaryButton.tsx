import Button from '@mui/material/Button';
import {useTheme} from "@mui/material/styles";
import type {ButtonProps} from "./ButtonProps.tsx";

export default function PrimaryButton({ text ,onClick}: ButtonProps) {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            sx={{ color: theme.palette.background.default }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}
