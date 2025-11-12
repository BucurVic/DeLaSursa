import { Box } from "@mui/material";
import SidebarProducer from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function ProducerLayout() {
    return (
        <Box sx={{ minHeight: "100vh"}}>
            <Header />

            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: 240, flexShrink: 0 }}>
                    <SidebarProducer />
                </Box>

                <Box sx={{ flexGrow: 1, padding: "2rem" }}>
                    <Outlet />
                </Box>

            </Box>
        </Box>
    );
}
