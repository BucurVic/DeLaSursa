import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { colors, textResources } from "../theme";
import { useNavigate } from "react-router-dom";
import React from "react";

interface SubscriptionCardProps {
  productId: number;
  image: string;
  title: string;
  category: string;
  supplierRegion: string;
  supplierLogo?: string;
  supplier: string;
  totalPrice: number;
  currency: string;
  duration: number;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  productId,
  image,
  title,
  category,
  supplierRegion,
  supplierLogo,
  supplier,
  totalPrice,
  currency,
  duration,
}) => {
  const navigate = useNavigate();
  const tr = textResources.subscriptions;

  return (
    <Card
      onClick={() => navigate(`/product/${productId}`)}
      sx={{
        width: "100%",
        height: { xs: "auto", sm: "13rem" },
        backgroundColor: colors.darkGreen1,
        color: colors.white1,
        borderRadius: "0.8rem",
        border: `0.5px solid ${colors.lightGreen1Transparent}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "1rem",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: { xs: "100%", sm: "13rem" },
          height: { xs: "auto", sm: "13rem" },
          backgroundColor: colors.white2,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.13rem",
          "&.MuiCardContent-root": {
            padding: "0.85rem",
          },
        }}
      >
        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: colors.white1,
              overflow: "hidden",
              whiteSpace: { xs: "normal", sm: "nowrap" },
              textOverflow: "ellipsis",
              textAlign: "left",
            }}
          >
            {tr.subscription}
          </Typography>
        </Box>
        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.white1,
              overflow: "hidden",
              whiteSpace: { xs: "normal", sm: "nowrap" },
              textOverflow: "ellipsis",
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.white2,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              textAlign: "left",
            }}
          >
            {category} • {duration} luni •{" "}
            <LocationOnOutlined sx={{ fontSize: "0.9rem" }} /> {supplierRegion}
          </Typography>
        </Box>

        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          {supplierLogo && (
            <Box
              component="img"
              src={supplierLogo}
              alt={supplier}
              sx={{
                height: "1.5rem",
                width: "1.5rem",
                borderRadius: "50%",
                marginRight: "0.39rem",
              }}
            />
          )}
          <Typography
            variant="body2"
            sx={{
              color: colors.white2,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              textAlign: "left",
            }}
          >
            {supplier}
          </Typography>
        </Box>

        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        />

        <Box
          sx={{
            marginTop: "auto",
            borderTop: `0.5px solid ${colors.lightGreen1Transparent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.5rem",
          }}
        >
          <Typography variant="h6" sx={{ color: colors.white1 }}>
            {totalPrice} {currency}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
