import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { colors } from "../theme";

export interface ProducerOrderViewBundleItem {
  name: string;
  quantity: number;
  unit: string;
}

interface ProducerOrderViewBundleCardProps {
  bundleId: number;
  image: string;
  title: string;
  items: ProducerOrderViewBundleItem[];
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
}

const ITEMS_TO_SHOW = 2;

const ProducerOrderViewBundleCard: React.FC<
  ProducerOrderViewBundleCardProps
> = ({ image, title, items, price, currency, rating, reviewCount }) => {
  return (
    <Card
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
            variant="h6"
            sx={{
              color: colors.white1,
              overflow: "hidden",
              whiteSpace: { xs: "normal", sm: "nowrap" },
              textOverflow: "ellipsis",
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
            }}
          >
            Pachet cu
            {items.length > 1
              ? ` ${items.length} tipuri de produse`
              : " un tip de produse"}
          </Typography>
        </Box>

        <Box>
          {items.slice(0, ITEMS_TO_SHOW).map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: colors.white2,
                lineHeight: 1.3,
                paddingBottom: "0.2rem",
              }}
            >
              <strong>
                {item.quantity} {item.unit}
              </strong>{" "}
              {item.name}
            </Typography>
          ))}

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
            height: "1.95rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: colors.lightGreen1,
              },
              "& .MuiRating-iconEmpty": {
                color: colors.lightGreen1,
              },
              "& .MuiRating-icon": {
                fontSize: "0.9rem",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: colors.white2,
              marginLeft: "0.39rem",
              whiteSpace: "nowrap",
            }}
          >
            {rating.toFixed(1)} ({reviewCount})
          </Typography>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProducerOrderViewBundleCard;
