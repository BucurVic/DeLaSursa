import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useTheme} from "@mui/material/styles";

interface FilterChipProps {
    label: string;
    onRemove?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
    const theme=useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '16px',
                backgroundColor: theme.palette.background.paper,
                px: 1,
                py: 0.5,
                mr: 1
            }}
        >
            <IconButton
                size="small"
                onClick={onRemove}
                sx={{ p: 0, mr: 0.5 }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6">{label}</Typography>
        </Box>
    );
};

export default FilterChip;
