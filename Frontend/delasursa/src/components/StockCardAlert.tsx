import React from 'react';
import { Box, Card, Typography, Stack, Avatar } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface StockCardAlertProps {
    productName: string;  // numele produsului
    quantity: number;     // cantitate stoc
}

const StockCardAlert: React.FC<StockCardAlertProps> = ({ productName, quantity }) => {
    let stockLevel: 'epuizat' | 'redus' | 'suficient';
    if (quantity === 0) stockLevel = 'epuizat';
    else if (quantity <= 5) stockLevel = 'redus';
    else stockLevel = 'suficient';

    if (stockLevel === 'suficient') return null; // nu afișăm card dacă stocul e ok

    const iconColor = stockLevel === 'epuizat' ? 'red' : 'orange';
    const statusText = stockLevel === 'epuizat' ? 'Stoc epuizat' : 'Stoc redus';

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            borderRadius: '12px',
            border: `1px solid ${iconColor}`,
            backgroundColor: 'transparent',
            mb: 2
        }}>
            <Stack direction="row" spacing={2} alignItems="center">
                {/* Icon warning */}
                <Avatar sx={{ bgcolor: 'transparent', width: 32, height: 32 }}>
                    <WarningIcon sx={{ color: iconColor }} />
                </Avatar>

                {/* Text stoc + nr produse */}
                <Typography variant="body1" fontWeight="bold">
                    {statusText} ({quantity} produse)
                </Typography>
            </Stack>

            {/* Bubble sub icon si text */}
            <Box sx={{
                mt: 1,
                display: 'inline-block',
                px: 2,
                py: 0.5,
                borderRadius: '16px',
                border: `1px solid ${iconColor}`,
                color: iconColor,
                fontSize: '0.8rem'
            }}>
                {productName}
            </Box>
        </Card>
    );
};

export default StockCardAlert;
