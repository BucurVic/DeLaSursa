import {Checkbox, FormControlLabel} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {type ChangeEvent, useState} from "react";

interface CheckBoxProps {
    text: string;
    onChange?: (checked: boolean) => void;
}

export default function CheckBox({ text,onChange }:CheckBoxProps) {
    const theme = useTheme();
    const [checked, setChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChange?.(event.target.checked);
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    sx={{color:theme.palette.primary.light}}
                />
            }
            label={<Typography variant="body2">{text}</Typography>}
        />
    );
}