import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import type { Subscription } from "../types/Subscription.ts";

interface SubscriptionCardProps {
  subscription: Subscription;
  viewMode?: "grid" | "list";
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  viewMode = "grid",
}) => {
  const isList = viewMode === "list";
  const ITEMS_TO_SHOW = 4;
  const navigate = useNavigate();
  const { pachet } = subscription;

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: isList ? "100%" : "20rem",
        display: "flex",
        flexDirection: { xs: "column", md: isList ? "row" : "column" },
        bgcolor: colors.darkGreen1,
        color: colors.white1,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 10px 20px -5px rgba(0,0,0,0.3)`,
          border: `1px solid ${colors.lightGreen1}`,
        },
      }}
      onClick={() => navigate(`/pachete/${pachet.id}`)}
    >
      <Box
        sx={{
          width: { xs: "100%", md: isList ? "300px" : "100%" },
          minWidth: { md: isList ? "300px" : "auto" },
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={pachet.image}
          alt={pachet.title}
          sx={{
            height: { xs: "140px", md: isList ? "100%" : "140px" },
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 3,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Abonament "{pachet.title}"
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.lightGreen1}
              >
                {pachet.price} {pachet.currency}
              </Typography>
              <Typography variant="body2" color={colors.white2}>
                / livrare
              </Typography>
            </Box>

            <Typography variant="body2" color={colors.white2} sx={{ mt: 0.5 }}>
              <strong>Stare abonament:</strong> {subscription.status} <br />
              <strong>Frecvență livrare:</strong> {subscription.freceventa} zile{" "}
              <br />
              <strong>Durată abonament:</strong> {subscription.duration} luni
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              {subscription.supplierLogo && (
                <Box
                  component="img"
                  src={subscription.supplierLogo}
                  alt={subscription.supplier}
                  sx={{ width: 24, height: 24, borderRadius: "50%", mr: 1 }}
                />
              )}
              <Typography variant="body2" color={colors.white2}>
                <strong>Producător:</strong> {subscription.supplier} <br />
                <strong>Regiune:</strong> {subscription.supplierRegion}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: colors.lightGreen1Transparent, my: 1 }} />

        {/* LISTA PRODUSE */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            color={colors.lightGreen3}
            sx={{
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.75rem",
            }}
          >
            Produse incluse în pachet:
          </Typography>

          <Stack direction="column" spacing={1}>
            {pachet.items.slice(0, ITEMS_TO_SHOW).map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: colors.lightGreen1,
                    fontSize: "1.1rem",
                    mt: 0.3,
                  }}
                />
                <Typography
                  variant="body2"
                  color={colors.white1}
                  sx={{ lineHeight: 1.4 }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: colors.white2,
                    }}
                  >
                    {item.quantity}
                  </span>{" "}
                  {item.name}
                </Typography>
              </Box>
            ))}
            {pachet.items.length > ITEMS_TO_SHOW && (
              <Typography
                variant="caption"
                color={colors.lightGreen3}
                sx={{ pl: 3.5, pt: 0.5, fontStyle: "italic" }}
              >
                + alte {pachet.items.length - ITEMS_TO_SHOW}...
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
