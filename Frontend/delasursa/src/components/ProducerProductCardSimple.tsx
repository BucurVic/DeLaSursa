import { Box, Card, Rating, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { colors } from "../theme";

// PROPS esențiale cerute:
// title (numele produsului), produsImagine, rating, reviewCount, price, unit, currency

interface SimpleProductCardProps {
  title: string;
  produsImagine: string;
  rating: number;
  reviewCount: number;
  price: number;
  unit: string; // unitate_masura (ex: kg, buc)
  currency: string; // ex: LEI
}

const cardStyle = {
  display: "flex",
  alignItems: "center",
  p: 2,
  borderRadius: "1rem",
  border: "0.5px solid",
  borderColor: `${colors.white2}`,
  backgroundColor: "transparent",
  color: "white",
  boxShadow: "none",
  width: "100%",
};

const propertyStyle = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  mt: 0.5,
};

export default function ProducerProductCardSimple({
  title,
  produsImagine,
  rating,
  reviewCount,
  price,
  unit,
  currency,
}: SimpleProductCardProps) {
  return (
    <Card sx={cardStyle}>
      <Box
        component="img"
        src={produsImagine}
        alt={title}
        sx={{
          width: 70,
          height: 70,
          borderRadius: "1rem",
          mr: 2,
          objectFit: "cover",
        }}
      />

      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          noWrap
          sx={{ color: "white" }}
        >
          {title}
        </Typography>

        <Box sx={propertyStyle}>
          <Rating
            value={rating}
            precision={0.1}
            readOnly
            size="small"
            emptyIcon={
              <Star
                style={{ opacity: 0.55, color: colors.white1 }}
                fontSize="inherit"
              />
            }
          />
          <Typography variant="caption" sx={{ color: colors.white1, ml: 0.5 }}>
            ({reviewCount})
          </Typography>
        </Box>
      </Box>

      <Box sx={{ ml: 2, textAlign: "right", minWidth: "80px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: colors.lightGreen1 }}
        >
          {price} {currency}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.white1 }}>
          / {unit}
        </Typography>
      </Box>
    </Card>
  );
}
