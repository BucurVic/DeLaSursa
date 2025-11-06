
import Button from '@mui/material/Button';
import {useTheme} from "@mui/material/styles";

export default function PrimaryButton({text} : {text: string}) {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            sx={{ color: theme.palette.background.default }}
        >
            {text}
        </Button>
    );
}
