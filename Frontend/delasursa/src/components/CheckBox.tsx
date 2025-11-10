import {Checkbox, FormControlLabel} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";

export default function CheckBox({ text }: { text: string }) {
    const theme = useTheme();

    return (
        <FormControlLabel
            control={<Checkbox sx={{color:theme.palette.primary.light}} />}
            label={<Typography variant="body2">{text}</Typography>}
        />
    );
}