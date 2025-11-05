import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    type SelectChangeEvent,
} from "@mui/material";

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
    // Adaugam className (pentru spatii/pozitionare externa)
    className?: string;
    // Adaugam prop pentru a seta latimea responsiva (ex: "w-full md:w-1/2")
    width?: string;
}

// Folosim React.forwardRef pentru a permite o referinta la elementul DOM
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
         className = "",
         width = "w-full", // Setam w-full (mobil) ca valoare implicita
     }, ref) => {

        // Combinam clasa de lățime responsivă cu alte clase de poziționare
        const responsiveClassName = `${width} ${className}`;

        return (
            // Aplicam ref, fullWidth=true (pentru ca Select sa ocupe tot FormControl-ul),
            // si clasa responsiva pe containerul exterior
            <FormControl
                ref={ref}
                fullWidth={fullWidth}
                error={error}
                required={required}
                className={responsiveClassName}
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