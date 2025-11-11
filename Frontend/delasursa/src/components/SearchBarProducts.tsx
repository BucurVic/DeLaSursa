import React from "react";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../theme/colors.ts";
import { textResources } from "../theme/textResources";
import {useTheme} from "@mui/material/styles";

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 placeholder = textResources.searchBar.placeholder,
                                                 value,
                                                 onChange,
                                             }) => {
    const theme=useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${colors.lightGreen1Transparent}`,
                borderRadius: "15px",
                px: 2,
                py: 1.5,

                width: '70rem',
                boxSizing: "border-box",

                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: theme.palette.primary.light },
                "&:focus-within": { borderColor: theme.palette.primary.light },
            }}
        >
            <SearchIcon
                sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "1.5rem",
                }}
            />
            <InputBase
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                sx={{
                    flex: 1,
                    color: theme.palette.text.primary,
                    fontFamily: '"Manrope", sans-serif',
                    "& input::placeholder": {
                        color: theme.palette.text.secondary,
                        opacity: 1,
                    },
                }}
            />
        </Box>
    );
};
export default SearchBar;