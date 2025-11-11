import React from "react";
import { Tab, Tabs, Box, Select, MenuItem, useMediaQuery, type SelectChangeEvent } from "@mui/material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { textResources as tr } from "../theme/textResources";

const routes = ["lista", "adauga", "inventar", "promotii"] as const;
type RouteType = typeof routes[number];

const ProducerPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const tab = location.pathname.split("/").pop() as RouteType | undefined;
    const value = routes.indexOf(tab ?? "lista");

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        const selectedRoute = routes[newValue];
        navigate(`/dashboard-producator/produse/${selectedRoute}`);
    };

    const handleMobileChange = (event: SelectChangeEvent<RouteType>) => {
        const selected = event.target.value as RouteType;
        navigate(`/dashboard-producator/produse/${selected}`);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <h1 style={{ color: "white" }}>{tr.producerPage.title}</h1>
            <p style={{ color: "lightgreen" }}>{tr.producerPage.subtitle}</p>

            {isMobile ? (
                <Select<RouteType>
                    value={(routes[value] ?? "lista") as RouteType}
                    onChange={handleMobileChange}
                    sx={{
                        mt: 2,
                        bgcolor: "#123123",
                        color: "white",
                        borderRadius: "8px",
                        width: "100%",
                        "& .MuiSvgIcon-root": { color: "white" },
                    }}
                >
                    <MenuItem value="lista">{tr.producerPage.tabs.list}</MenuItem>
                    <MenuItem value="adauga">{tr.producerPage.tabs.add}</MenuItem>
                    <MenuItem value="inventar">{tr.producerPage.tabs.inventory}</MenuItem>
                    <MenuItem value="promotii">{tr.producerPage.tabs.promotions}</MenuItem>
                </Select>
            ) : (
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{ mt: 2 }}
                >
                    <Tab label={tr.producerPage.tabs.list} />
                    <Tab label={tr.producerPage.tabs.add} />
                    <Tab label={tr.producerPage.tabs.inventory} />
                    <Tab label={tr.producerPage.tabs.promotions} />
                </Tabs>
            )}

            <Box sx={{ mt: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ProducerPage;
