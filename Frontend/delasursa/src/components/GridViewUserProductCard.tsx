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
import { ShoppingCartOutlined } from "@mui/icons-material";
import { colors } from "../theme/colors.ts";
import { useNavigate } from "react-router-dom";

interface GridViewUserProductCardProps {
  productId: string;
  image: string;
  title: string;
  category: string;
  unit: string;
  supplierLogo?: string;
  supplier: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency?: string;
  onAddToCart: () => void;
}

const GridViewUserProductCard: React.FC<GridViewUserProductCardProps> = ({
  productId,
  image,
  title,
  category,
  unit,
  supplierLogo,
  supplier,
  rating,
  reviewCount,
  price,
  currency = "RON",
  onAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/produse/${productId}`)}
      sx={{
        height: "24rem",
        width: "12rem",
        backgroundColor: colors.darkGreen1,
        color: colors.white1,
        borderRadius: "0.8rem",
        border: `0.5px solid ${colors.lightGreen1Transparent}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* image */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: "9.6rem", // 40% of card height
          backgroundColor: colors.white2,
          objectFit: "cover",
        }}
      />

      {/* content */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.144rem", // 1% of content height
          "&.MuiCardContent-root": {
            padding: "0.85rem",
          },
          "&.MuiCardContent-root:last-child": {
            paddingBottom: "0",
          },
        }}
      >
        {/* title */}
        <Box
          sx={{
            height: "1.872rem", // 13% of content height
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
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* category and unit */}
        <Box
          sx={{
            height: "1.872rem", // 13% of content height
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
            {category} • {unit}
          </Typography>
        </Box>

        {/* supplier logo and supplier */}
        <Box
          sx={{
            height: "1.872rem", // 13% of content height
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

        {/* rating and review count */}
        <Box
          sx={{
            height: "1.872rem", // 13% of content height
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
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginLeft: "0.39rem",
              textAlign: "left",
            }}
          >
            {rating.toFixed(1)} ({reviewCount})
          </Typography>
        </Box>

        {/* price and currency */}
        <Box
          sx={{
            height: "2.448rem", // 17% of content height
            borderTop: `0.5px solid ${colors.lightGreen1Transparent}`,
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
              textAlign: "left",
            }}
          >
            {price} {currency}
          </Typography>
        </Box>

        {/* add to cart button */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCartOutlined />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onAddToCart();
            }}
            sx={{
              height: "1.872rem", // 13% of content height
              backgroundColor: colors.lightGreen1,
              color: colors.darkGreen1,
              borderRadius: "0.6rem",
              "&:hover": {
                backgroundColor: colors.lightGreen2,
              },
            }}
          >
            Adaugă în coș
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GridViewUserProductCard;
