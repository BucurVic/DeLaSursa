import React from 'react';
import Chip from '@mui/material/Chip';

interface StockChipProps {
    stockLevel: 'epuizat' | 'redus' | 'suficient';
}

const StockChip: React.FC<StockChipProps> = ({ stockLevel }) => {
    let label = '';
    let color: 'error' | 'warning' | 'success' = 'success';

    switch (stockLevel) {
        case 'epuizat':
            label = 'Stoc epuizat';
            color = 'error';
            break;
        case 'redus':
            label = 'Stoc redus';
            color = 'warning';
            break;
        case 'suficient':
            label = 'Stoc suficient';
            color = 'success';
            break;
        default:
            label = 'Necunoscut';
            color = 'warning';
    }

    return (
        <Chip
            label={label}
            color={color}
            variant="filled"
            sx={{
                fontWeight: 'bold',
                borderRadius: '12px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
            }}
        />
    );
};

export default StockChip;
