import React from "react";
import {
  Box,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const routes = ["lista", "adauga"] as const;
type RouteType = (typeof routes)[number];

export default function ProducerBundlesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tab = location.pathname.split("/").pop() as RouteType | undefined;
  const value = routes.indexOf(tab ?? "lista");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/dashboard-producator/pachete/${routes[newValue]}`);
  };

  const handleMobileChange = (event: SelectChangeEvent<RouteType>) => {
    navigate(`/dashboard-producator/pachete/${event.target.value}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <h1 style={{ color: "white" }}>Pachetele mele</h1>
      <p style={{ color: "lightgreen" }}>
        Gestionează pachetele create de tine
      </p>

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
          <MenuItem value="lista">Lista pachete</MenuItem>
          <MenuItem value="adauga">Adaugă pachet</MenuItem>
        </Select>
      ) : (
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ mt: 2 }}
        >
          <Tab label="Lista pachete" />
          <Tab label="Adaugă pachet" />
        </Tabs>
      )}

      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
