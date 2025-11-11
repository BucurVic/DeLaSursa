import { Tab, Tabs, Box, Select, MenuItem, useMediaQuery } from "@mui/material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function ProducerPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const tab = location.pathname.split("/").pop();
    const routes = ["lista", "adauga", "inventar", "promotii"];
    const value = routes.indexOf(tab);

    const handleChange = (e, v) => {
        navigate(`/dashboard-producator/produse/${routes[v]}`);
    };

    const handleMobileChange = (e) => {
        const selected = e.target.value;
        navigate(`/dashboard-producator/produse/${selected}`);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <h1 style={{color: "white"}}>Produsele mele</h1>
            <p style={{color: "lightgreen"}}>Gestionează produsele tale, stocul și promoțiile</p>

            {/* ✅ Mobile = Select Dropdown */}
            {isMobile ? (
                <Select
                    value={routes[value] ?? "lista"}
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
                    <MenuItem value="lista">Listă produse</MenuItem>
                    <MenuItem value="adauga">Adaugă produs</MenuItem>
                    <MenuItem value="inventar">Stoc / Inventar</MenuItem>
                    <MenuItem value="promotii">Promoții & Campanii</MenuItem>
                </Select>
            ) : (
                /* ✅ Desktop = Tabs */
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{ mt: 2 }}
                >
                    <Tab label="Listă produse" />
                    <Tab label="Adaugă produs" />
                    <Tab label="Stoc / Inventar" />
                    <Tab label="Promoții & Campanii" />
                </Tabs>
            )}

            <Box sx={{ mt: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
