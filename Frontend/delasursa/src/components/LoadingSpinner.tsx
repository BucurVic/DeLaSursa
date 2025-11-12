import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { colors } from "../theme/colors";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0, // top, right, bottom, left = 0
        backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent overlay
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // să fie peste toate elementele
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: colors.lightGreen1,
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
