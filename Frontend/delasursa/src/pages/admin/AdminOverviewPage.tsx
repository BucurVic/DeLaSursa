import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { colors } from '../../theme/colors';
import {adminApi, type AdminStats} from "../../api/adminApi.ts";

const AdminOverviewPage: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getStats()
            .then(res => {
                setStats(res.data);
            })
            .catch(err => {
                console.error("Failed to load admin stats:", err)
            })
            .finally(() => setLoading(false));
    }, []);
  return (
    <Box sx={{ color: colors.white1 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Admin Dashboard - Overview
      </Typography>

      {/* Container FLEXIBIL în loc de Grid */}
        {loading ? (
            <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>Loading statistics...</Typography>
        ) : (
      <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          flexWrap: 'wrap' // Permite cardurilor să coboare pe rândul următor pe ecrane mici
      }}>
        
        {/* Card 1 - Utilizatori */}
        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}> {/* flex-grow, flex-shrink, flex-basis */}
          <Paper sx={{ p: 3, bgcolor: colors.darkGreen2, color: colors.white1, borderRadius: '12px' }}>
            <Typography variant="h6">Utilizatori Totali</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>
                {stats?.totalUseri ?? "-"}
            </Typography>
          </Paper>
        </Box>

        {/* Card 2 - Comenzi */}
        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
          <Paper sx={{ p: 3, bgcolor: colors.darkGreen2, color: colors.white1, borderRadius: '12px' }}>
            <Typography variant="h6">Comenzi Azi</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>
                {stats?.totalComenzi ?? "-"}
            </Typography>
          </Paper>
        </Box>

        {/* Card 3 - Venituri */}
        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
          <Paper sx={{ p: 3, bgcolor: colors.darkGreen2, color: colors.white1, borderRadius: '12px' }}>
            <Typography variant="h6">Venituri</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>
                {stats?.totalVanzari ?? "-"} lei
            </Typography>
          </Paper>
        </Box>

      </Box>
            )}
    </Box>
  );
};

export default AdminOverviewPage;