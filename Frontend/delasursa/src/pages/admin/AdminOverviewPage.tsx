import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import {adminApi, type AdminStats} from "../../api/adminApi.ts";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from '../../theme/colors';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  // Stil comun pentru carduri (reutilizabil)
  const cardStyle = {
    p: 3,
    bgcolor: colors.darkGreen2,
    color: colors.white1,
    borderRadius: '12px',
    border: `1px solid ${colors.lightGreen1Transparent}`,
    height: '100%' // Important pentru a avea înălțimi egale
  };

  return (
    <Box sx={{ color: colors.white1, pb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Admin Dashboard - Overview
      </Typography>

      {/* Container FLEXIBIL în loc de Grid */}
        {loading ? (
            <Typography variant="h3" sx={{ color: colors.lightGreen1, mt: 1 }}>Loading statistics...</Typography>
        ) : (
      <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, // Gap folosește unități relative din temă (3 * 8px = 24px)
          mb: 4
      }}>

        {/* Cardurile se adaptează automat */}
        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: '45%', md: '30%' } }}>
          <Paper sx={cardStyle}>
            <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Utilizatori Totali</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>
                {stats?.totalUseri ?? "-"}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.lightGreen2 }}>+12 săptămâna asta</Typography>
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: '45%', md: '30%' } }}>
          <Paper sx={cardStyle}>
            <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Comenzi Azi</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>
                {stats?.totalComenzi ?? "-"}
            </Typography>
            <Typography variant="caption" sx={{ color: '#ffca28' }}>În așteptare: 12</Typography>
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: '45%', md: '30%' } }}>
          <Paper sx={cardStyle}>
            <Typography variant="body2" sx={{ color: colors.white2, mb: 1 }}>Venituri (Luna Asta)</Typography>
            <Typography variant="h3" sx={{ color: colors.lightGreen1, fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>
                {stats?.totalVanzari ?? "-"} lei
            </Typography>
            <Typography variant="caption" sx={{ color: colors.lightGreen2 }}>+5% față de luna trecută</Typography>
          </Paper>
        </Box>


      {/* --- SECȚIUNEA 2: DETALII --- */}
      <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3
      }}>

        {/* PANOU STÂNGA: Comenzi Recente */}
        <Box sx={{ flexGrow: 2, flexBasis: { xs: '100%', md: '60%' } }}>
          <Paper sx={{ ...cardStyle, border: 'none' }}> {/* Suprascriem border-ul dacă vrem */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                    p: 1.5,
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    flexWrap: 'wrap', // Permitem wrapping pe mobil
                    gap: 1
                }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{order.user}</Typography>
                    <Typography variant="caption" sx={{ color: colors.white2 }}>{order.id} • {order.time}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{order.amount}</Typography>
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

        {/* PANOU DREAPTA: Activitate Recentă */}
        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '30%' } }}>
          <Paper sx={{ ...cardStyle, border: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Activitate Recentă</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {activities.map((act, index) => (
                <Box key={index} sx={{ position: 'relative', pl: 2, pb: 3, borderLeft: `2px solid ${colors.lightGreen1Transparent}` }}>
                  <Box sx={{
                    position: 'absolute', left: '-5px', top: 0, width: '8px', height: '8px', borderRadius: '50%',
                    bgcolor: act.alert ? '#ff5252' : colors.lightGreen1
                  }} />

                  <Typography variant="body2" sx={{ color: colors.white1, lineHeight: 1.2 }}>{act.text}</Typography>
                  <Typography variant="caption" sx={{ color: colors.white2, mt: 0.5, display: 'block' }}>{act.time}</Typography>
                </Box>
              ))}
            </Box>

            <Button fullWidth variant="outlined" sx={{ mt: 1, borderColor: colors.lightGreen1Transparent, color: colors.white2 }}>
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