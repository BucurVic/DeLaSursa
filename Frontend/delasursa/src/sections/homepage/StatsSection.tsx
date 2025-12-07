import React from "react";
import { Box, Typography } from "@mui/material";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { colors } from "../../theme/colors";

const STATS_DATA = [
    {
        id: "stat-1",
        icon: <GroupsOutlinedIcon sx={{ fontSize: "2rem" }} />,
        value: "250+",
        label: "Producători",
    },
    {
        id: "stat-2",
        icon: <Inventory2OutlinedIcon sx={{ fontSize: "2rem" }} />,
        value: "10.000+",
        label: "Produse",
    },
    {
        id: "stat-3",
        icon: <HowToRegOutlinedIcon sx={{ fontSize: "2rem" }} />,
        value: "5.000+",
        label: "Clienți activi",
    },
    {
        id: "stat-4",
        icon: <StarBorderIcon sx={{ fontSize: "2rem" }} />,
        value: "1.200+",
        label: "Recenzii verificate",
    },
];

const StatsSection: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3rem",
                backgroundColor: colors.darkGreen1,
                width: "100%",
                padding: "4rem 6rem",
                borderTop: `1px solid ${colors.lightGreen1Transparent}`,
                borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
            }}
        >
            {/* stats grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                    },
                    gap: { xs: "2rem", sm: "3rem", md: "6rem" },
                    width: "100%",
                    maxWidth: "75rem",
                }}
            >
                {STATS_DATA.map((stat) => (
                    <Box
                        key={stat.id}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        {/* icon container */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "50%",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                                color: colors.lightGreen1,
                                backgroundColor: colors.darkGreen2,
                            }}
                        >
                            {stat.icon}
                        </Box>

                        {/* value */}
                        <Typography
                            variant="h2"
                            sx={{
                                color: colors.white1,
                            }}
                        >
                            {stat.value}
                        </Typography>

                        {/* label */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: colors.white2,
                                textAlign: "center",
                            }}
                        >
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default StatsSection;