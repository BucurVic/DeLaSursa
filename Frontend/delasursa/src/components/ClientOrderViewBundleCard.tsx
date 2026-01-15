import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Inventory2Outlined } from "@mui/icons-material";
import { colors, textResources } from "../theme";
import { useNavigate } from "react-router-dom";

export interface OrderBundleItem {
  name: string;
  quantity: number;
  unit: string;
}

interface ClientOrderViewBundleCardProps {
  bundleId: string;
  image: string;
  title: string;
  items: OrderBundleItem[];
  price: number;
  currency?: string;
  onAddReview: () => void;
  quantity: number;
}

const ITEMS_TO_SHOW = 3;

const ClientOrderViewBundleCard: React.FC<ClientOrderViewBundleCardProps> = ({
  bundleId,
  image,
  title,
  items,
  price,
  currency,
  onAddReview,
  quantity,
}) => {
  const navigate = useNavigate();
  const tr = textResources.orders;

  return (
    <Card
      onClick={() => navigate(`/pachete/${bundleId}`)}
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
          gap: "0.25rem",
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
            variant="h6"
            sx={{
              color: colors.white1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {title} - <i>{quantity > 1 ? `${quantity} bucăți` : "O bucată"}</i>
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
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Inventory2Outlined sx={{ fontSize: "1rem" }} />
            Pachet cu
            {items.length > 1
              ? ` ${items.length} tipuri de produse`
              : " un tip de produse"}
          </Typography>
        </Box>

        <Box
          sx={{
            height: { xs: "auto", sm: "1.95rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box>
            {items.slice(0, ITEMS_TO_SHOW).map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: colors.white2,
                  lineHeight: 1.3,
                  padding: "0.2rem",
                }}
              >
                <strong>
                  {item.quantity} {item.unit}
                </strong>{" "}
                {item.name}
              </Typography>
            ))}
          </Box>

          {items.length > ITEMS_TO_SHOW && (
            <Typography
              variant="caption"
              sx={{
                color: colors.lightGreen3,
                fontStyle: "italic",
              }}
            >
              + alte {items.length - ITEMS_TO_SHOW} produse
            </Typography>
          )}
        </Box>

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
          <Typography variant="h6">
            {price} {currency}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Rating />}
            onClick={(e) => {
              e.stopPropagation();
              onAddReview();
            }}
            sx={{
              backgroundColor: colors.lightGreen1,
              color: colors.darkGreen1,
              borderRadius: "0.6rem",
              "&:hover": { backgroundColor: colors.lightGreen2 },
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
            }}
          >
            {tr.addReview}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientOrderViewBundleCard;
