import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { colors } from "../theme/colors";

interface ProducerContactCardProps {
  phone: string;
  email: string;
}

const ProducerContactCard: React.FC<ProducerContactCardProps> = ({ phone, email }) => {
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
      <Typography variant="h4" sx={{ color: colors.white1 }}>
        Contact
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Phone */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Box
              sx={{
                color: colors.lightGreen1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneOutlinedIcon fontSize="small" />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: colors.white2 }}
            >
              Telefon
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: colors.white1 }}>
            {phone}
          </Typography>
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Box
              sx={{
                color: colors.lightGreen1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailOutlinedIcon fontSize="small" />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: colors.white2 }}
            >
              Email
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: colors.white1, wordBreak: "break-word", textAlign: "right" }}
          >
            {email}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<PhoneOutlinedIcon />}
          sx={{
            backgroundColor: colors.lightGreen1,
            color: colors.darkGreen1,
            borderRadius: "0.5rem",
            textTransform: "none",
            "&:hover": { backgroundColor: colors.lightGreen2 },
          }}
        >
          SUNĂ
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<EmailOutlinedIcon />}
          sx={{
            borderColor: colors.lightGreen1,
            color: colors.lightGreen1,
            borderRadius: "0.5rem",
            textTransform: "none",
            "&:hover": {
              borderColor: colors.lightGreen1,
              backgroundColor: `${colors.lightGreen1}15`,
            },
          }}
        >
          MESAJ
        </Button>
      </Box>
    </Box>
  );
};

export default ProducerContactCard;