import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import {adminApi, type AdminStats} from "../../api/adminApi.ts";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from '../../theme/colors';
import { useNavigate } from 'react-router-dom';

const AdminOverviewPage: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

  // --- DATE SIMULATE ---
  const recentOrders = [
    { id: "#105", user: "Maria Popescu", amount: "230.00 RON", status: "PENDING", time: "Acum 10 min" },
    { id: "#104", user: "Ion Ionescu", amount: "45.00 RON", status: "COMPLETED", time: "Acum 1 oră" },
    { id: "#103", user: "Andrei Vasile", amount: "120.50 RON", status: "SHIPPED", time: "Acum 3 ore" },
  ];

  const activities = [
    { text: "Producător nou înregistrat: 'Ferma Bio'", time: "Azi, 10:30" },
    { text: "Produs 'Lapte Proaspăt' stoc epuizat", time: "Azi, 09:15", alert: true },
    { text: "Utilizator 'Elena D.' a lăsat o recenzie nouă", time: "Ieri, 18:40" },
  ];

  // Stil comun pentru carduri
  const cardStyle = {
    p: 3,
    bgcolor: colors.darkGreen2,
    color: colors.white1,
    borderRadius: '12px',
    border: `1px solid ${colors.lightGreen1Transparent}`,
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  return (
    <Box sx={{ color: colors.white1, pb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Admin Dashboard - Overview
      </Typography>

      {loading ? (
        <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>Loading statistics...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* --- RÂNDUL 1: STATISTICI (3 coloane) --- */}
          <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3,
              // Pe mobil items sunt 100%, pe tabletă 48%, pe desktop ~32%
              '& > *': { flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }
          }}>
            <Paper sx={cardStyle}>
              <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Utilizatori Totali</Typography>
              <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold' }}>
                {stats?.totalUseri ?? "-"}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.lightGreen2 }}>+12 săptămâna asta</Typography>
            </Paper>

            <Paper sx={cardStyle}>
              <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Comenzi Azi</Typography>
              <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold' }}>
                {stats?.totalComenzi ?? "-"}
              </Typography>
              <Typography variant="caption" sx={{ color: '#ffca28' }}>În așteptare: 12</Typography>
            </Paper>

            <Paper sx={cardStyle}>
              <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Venituri (Luna Asta)</Typography>
              <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold' }}>
                {stats?.totalVanzari ?? "-"} lei
              </Typography>
              <Typography variant="caption" sx={{ color: colors.lightGreen2 }}>+5% față de luna trecută</Typography>
            </Paper>
          </Box>

          {/* --- RÂNDUL 2: DETALII (2 coloane inegale) --- */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            
            {/* Comenzi Recente - Ocupă ~66% pe desktop */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '2 1 60%' }, minWidth: 0 }}>
                <Paper sx={{ ...cardStyle, border: 'none', justifyContent: 'flex-start', minHeight: '400px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Comenzi Recente</Typography>
                    <Button
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: colors.lightGreen1 }}
                    onClick={() => navigate('/admin/orders')}
                    >
                    Vezi toate
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentOrders.map((order, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        bgcolor: 'rgba(255,255,255,0.03)',
                        borderRadius: '8px',
                        transition: '0.2s',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                    }}>
                        <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.white1 }}>{order.user}</Typography>
                        <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.7 }}>
                            #{order.id.replace('#','')} • {order.time}
                        </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'flex-end', gap: {xs: 1, sm: 2} }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.lightGreen1 }}>{order.amount}</Typography>
                        <Chip
                            label={order.status}
                            size="small"
                            color={order.status === 'COMPLETED' ? 'success' : order.status === 'PENDING' ? 'warning' : 'info'}
                            variant="outlined"
                        />
                        </Box>
                    </Box>
                    ))}
                </Box>
                </Paper>
            </Box>

            {/* Activitate Recentă - Ocupă ~33% pe desktop */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, minWidth: 0 }}>
                <Paper sx={{ ...cardStyle, border: 'none', justifyContent: 'flex-start', minHeight: '400px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Activitate Recentă</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {activities.map((act, index) => (
                    <Box key={index} sx={{ position: 'relative', pl: 3, pb: 1, borderLeft: `2px solid ${colors.lightGreen1Transparent}` }}>
                        <Box sx={{
                        position: 'absolute', left: '-5px', top: 2, width: '8px', height: '8px', borderRadius: '50%',
                        bgcolor: act.alert ? '#ff5252' : colors.lightGreen1,
                        boxShadow: `0 0 8px ${act.alert ? '#ff5252' : colors.lightGreen1}`
                        }} />

                        <Typography variant="body2" sx={{ color: colors.white1, lineHeight: 1.4, mb: 0.5 }}>
                            {act.text}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.white2, opacity: 0.6 }}>
                            {act.time}
                        </Typography>
                    </Box>
                    ))}
                </Box>

                <Button fullWidth variant="text" sx={{ mt: 3, color: colors.white2, opacity: 0.7, '&:hover': { opacity: 1, bgcolor: 'transparent' } }}>
                    Vezi tot istoricul
                </Button>
                </Paper>
            </Box>

          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminOverviewPage;