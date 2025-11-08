import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FilterChipProps {
    label: string;
    onRemove?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '16px',
                backgroundColor: 'transparent',
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
            <Typography variant="body2">{label}</Typography>
        </Box>
    );
};

export default FilterChip;
