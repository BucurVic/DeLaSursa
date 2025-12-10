import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { textResources as tr } from "../theme";

export default function ProducerDashboardMain() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2 }}>
      <h1 style={{ color: "white" }}>{tr.producerDashboard.title}</h1>
    </Box>
  );
}
