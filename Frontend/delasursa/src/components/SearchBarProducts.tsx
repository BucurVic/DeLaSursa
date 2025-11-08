import React from "react";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../theme/colors";
import { textResources } from "../theme/textResources";

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
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: colors.darkGreen2,
                border: `1px solid ${colors.lightGreen1Transparent}`,
                borderRadius: "15px",
                px: 2,
                py: 1.5,

                width: 450,
                flex: "0 0 600px",
                boxSizing: "border-box",

                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: colors.lightGreen1 },
                "&:focus-within": { borderColor: colors.lightGreen1 },
            }}
        >
            <SearchIcon
                sx={{
                    color: colors.white2,
                    fontSize: "1.5rem",
                }}
            />
            <InputBase
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                sx={{
                    flex: 1,
                    color: colors.white1,
                    fontFamily: '"Manrope", sans-serif',
                    "& input::placeholder": {
                        color: colors.white2,
                        opacity: 1,
                    },
                }}
            />
        </Box>
    );
};
export default SearchBar;