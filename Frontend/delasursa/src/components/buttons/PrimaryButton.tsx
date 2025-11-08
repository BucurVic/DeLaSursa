import Button from '@mui/material/Button';
import {useTheme} from "@mui/material/styles";
import {useNotify} from "../NotifyProvider.tsx";

export default function PrimaryButton({ text }: { text: string }) {
    const theme = useTheme();
    const notify=useNotify();

    return (
        <Button
            variant="contained"
            sx={{ color: theme.palette.background.default }}
            onClick={() => notify('PrimaryButton clicked!',"success")}
        >
            {text}
        </Button>
    );
}
