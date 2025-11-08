import React, { useState } from 'react';
import { Box, Card, Typography, IconButton, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StockChip from './StockChip';

interface StockCardProps {
    imageUrl: string;
    title: string;
    category: string;
    initialQuantity: number;
}

const StockCard: React.FC<StockCardProps> = ({ imageUrl, title, category, initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => Math.max(prev - 1, 0));
    const handleIncreaseBy5 = () => setQuantity(prev => prev + 5);
    const handleIncreaseBy10 = () => setQuantity(prev => prev + 10);

    let stockLevel: 'epuizat' | 'redus' | 'suficient';
    if (quantity === 0) stockLevel = 'epuizat';
    else if (quantity <= 5) stockLevel = 'redus';
    else stockLevel = 'suficient';

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '12px', border: '1px solid #ccc', backgroundColor: 'transparent' }}>
            {/* Imagine produs */}
            <Box component="img" src={imageUrl} alt={title} sx={{ width: 80, height: 80, borderRadius: '8px', mr: 2 }} />

            {/* Titlu si categorie */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{category}</Typography>
            </Box>

            {/* Controale cantitate si StockChip */}
            <Stack direction="row" spacing={1} alignItems="center">
                <StockChip stockLevel={stockLevel} />
                <IconButton onClick={handleDecrease} size="small"><RemoveIcon /></IconButton>
                <Box sx={{ minWidth: 32, textAlign: 'center' }}>{quantity}</Box>
                <IconButton onClick={handleIncrease} size="small"><AddIcon /></IconButton>
                {/* Butoane +5 si +10 */}
                <Button variant="outlined" size="small" onClick={handleIncreaseBy5}>+5</Button>
                <Button variant="outlined" size="small" onClick={handleIncreaseBy10}>+10</Button>
            </Stack>
        </Card>
    );
};

export default StockCard;
