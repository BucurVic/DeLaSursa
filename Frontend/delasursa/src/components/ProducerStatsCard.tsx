import React from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { colors } from "../theme/colors";

interface ProducerStatsCardProps {
  experience: number;
  farmSize: number;
  organic: number;
  totalOrders: number;
  activeProducts: number;
  rating: number;
}

const ProducerStatsCard: React.FC<ProducerStatsCardProps> = ({
  experience,
  farmSize,
  organic,
  totalOrders,
  activeProducts,
  rating,
}) => {
  const stats = [
    { icon: <TrendingUpIcon fontSize="small" />, label: "Experiență", value: `${experience} ani` },
    { icon: <AgricultureOutlinedIcon fontSize="small"/>, label: "Dimensiune fermă", value: `${farmSize} hectare` },
    { icon: <CompostOutlinedIcon fontSize="small"/>, label: "Organic din", value: organic },
    { icon: <ShoppingBagOutlinedIcon fontSize="small"/>, label: "Total comenzi", value: totalOrders.toLocaleString() },
    { icon: <Inventory2OutlinedIcon fontSize="small"/>, label: "Produse active", value: activeProducts },
    { icon: <StarOutlineOutlinedIcon fontSize="small"/>, label: "Rating mediu", value: `${rating} / 5` },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colors.darkGreen2,
        border: `1px solid ${colors.lightGreen1Transparent}`,
        borderRadius: "1rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: colors.white1,
        }}
      >
        Statistici
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {stats.map((stat, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Box
                sx={{
                  color: colors.lightGreen1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: colors.white2,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: colors.white1,
              }}
            >
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProducerStatsCard;