import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export interface ProducerBundleItem {
  name: string;
  quantity: string;
}

export interface ProducerBundleCardProps {
  id: string;
  title: string;
  image: string;
  items: ProducerBundleItem[];
  onDelete: () => void;
}

const ProducerBundleCard: React.FC<ProducerBundleCardProps> = ({
  id,
  title,
  image,
  items,
  onDelete,
}) => {
  const navigate = useNavigate();
  const ITEMS_TO_SHOW = 4;

  return (
    <Card
      sx={{
        backgroundColor: colors.darkGreen2,
        borderRadius: "1rem",
        border: `1px solid ${colors.lightGreen1Transparent}`,
        color: colors.white1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minHeight: "34rem",
        width: "100%",
        boxShadow: "0 0 20px rgba(0,0,0,0.25)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-0.2rem)",
          boxShadow: "0 0 25px rgba(95, 238, 149, 0.15)",
        },
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: "12rem",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1.2rem",
          px: "1.5rem",
          py: "1.25rem",
        }}
      >
        <Box
          sx={{
            minHeight: "3.6rem",
            maxHeight: "3.6rem",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              ...typography.h5,
              color: colors.white1,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            borderTop: `1px solid ${colors.lightGreen1Transparent}`,
            my: "0.5rem",
          }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              ...typography.caption,
              color: colors.lightGreen3,
              textTransform: "uppercase",
              letterSpacing: "1px",
              mb: 1,
              display: "block",
            }}
          >
            Conținut pachet
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {items.slice(0, ITEMS_TO_SHOW).map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: colors.lightGreen1, fontSize: "1rem", mt: 0.3 }}
                />
                <Typography sx={typography.body2}>
                  <strong>{item.quantity}</strong> {item.name}
                </Typography>
              </Box>
            ))}

            {items.length > ITEMS_TO_SHOW && (
              <Typography
                sx={{
                  ...typography.caption,
                  color: colors.lightGreen3,
                  pl: 3,
                }}
              >
                + încă {items.length - ITEMS_TO_SHOW} produse
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "0.8rem", mt: "auto" }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard-producator/pachete/editeaza/${id}`);
            }}
          >
            Editează
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Șterge
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProducerBundleCard;
