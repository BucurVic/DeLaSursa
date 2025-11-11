import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    type SelectChangeEvent,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    label: string;
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    options?: DropdownOption[];
    error?: boolean;
    helperText?: string;
    required?: boolean;
    fullWidth?: boolean;
    name?: string;
    width?: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    ({
         label,
         value,
         onChange,
         options = [],
         error = false,
         helperText = "",
         required = false,
         fullWidth = true,
         name,
     }, ref) => {
        const theme=useTheme();

        return (

            <FormControl
                ref={ref}
                fullWidth={fullWidth}
                error={error}
                required={required}
                sx={{backgroundColor:theme.palette.background.default,
borderRadius:2,
            }}
            >
                <InputLabel>{label}</InputLabel>

                <Select
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                >
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>

                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        );
    }
);

Dropdown.displayName = "Dropdown";
export default Dropdown;