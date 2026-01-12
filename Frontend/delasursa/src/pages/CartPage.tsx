import React, { useContext } from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { colors, textResources } from "../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCost = totalPrice < 200 ? 20 : 0;
  const finalTotal = totalPrice + deliveryCost;

  // --- LOGICA DE NAVIGARE INTELIGENTĂ ---
  const handleItemClick = (item: any) => {
    const idValue = Number(item.id);

    // Verificăm dacă este un abonament (bazat pe convenția id >= 50000 stabilită anterior)
    if (!isNaN(idValue) && idValue >= 50000) {
      // Scădem offset-ul pentru a obține ID-ul real din baza de date
      const realId = idValue - 50000;
      navigate(`/pachete/${realId}`);
    } else {
      // Altfel, este un produs obișnuit
      navigate(`/produse/${item.id}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.darkGreen1,
        minHeight: "100vh",
        padding: "2rem",
        color: colors.white1,
      }}
    >
      <Typography variant="h4" sx={{ mb: "2rem" }}>
        {textResources.cartPage?.title || "Coșul tău"}
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" sx={{ opacity: 0.7 }}>
            {textResources.cartPage.emptyCart}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/produse")}
            sx={{
              mt: 2,
              color: colors.lightGreen1,
              borderColor: colors.lightGreen1,
            }}
          >
            Continuă cumpărăturile
          </Button>
        </Box>
      ) : (
        <>
          {items.map(
            (
              item,
              index, // <--- Adaugă index aici
            ) => (
              <Box
                key={`${item.id}-${index}`} // --- AICI AM MODIFICAT CLICK-UL ---
                onClick={() => handleItemClick(item)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: colors.darkGreen2,
                  marginBottom: "1rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                  cursor: "pointer", // Adăugat cursor pointer
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                {/* STÂNGA — imagine + nume */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    minWidth: "200px",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover",
                      borderRadius: "0.7rem",
                    }}
                  />

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.7, marginTop: "0.15rem" }}
                    >
                      {item.price} RON
                    </Typography>
                  </Box>
                </Box>

                {/* MIJLOC — cantitate */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    flexGrow: 1,
                    justifyContent: "center",
                    minWidth: "160px",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      border: `1px solid ${colors.lightGreen1}`,
                      borderRadius: "0.4rem",
                      color: colors.lightGreen1,
                      width: "2rem",
                      height: "2rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, item.quantity - 1);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    variant="h6"
                    sx={{ width: "2rem", textAlign: "center" }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{
                      border: `1px solid ${colors.lightGreen1}`,
                      borderRadius: "0.4rem",
                      color: colors.lightGreen1,
                      width: "2rem",
                      height: "2rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, item.quantity + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* DREAPTA — total + delete */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: "120px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {(item.price * item.quantity).toFixed(2)} RON
                  </Typography>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    sx={{
                      color: colors.lightGreen1,
                      "&:hover": { color: colors.lightGreen2 },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ),
          )}

          <Divider
            sx={{ borderColor: colors.lightGreen1Transparent, my: "1.5rem" }}
          />

          {/* Subtotal */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "0.5rem",
            }}
          >
            <Typography variant="h6">
              {textResources.cartPage.totalProducts}
            </Typography>
            <Typography variant="h6">{totalPrice.toFixed(2)} RON</Typography>
          </Box>

          {/* Cost livrare */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "0.5rem",
            }}
          >
            <Typography variant="h6">
              {textResources.cartPage.deliveryFee}
            </Typography>

            {deliveryCost === 0 ? (
              <Typography variant="h6" sx={{ color: colors.lightGreen2 }}>
                {textResources.cartPage.freeDelivery}
              </Typography>
            ) : (
              <Typography variant="h6">
                {deliveryCost.toFixed(2)} RON
              </Typography>
            )}
          </Box>

          <Divider
            sx={{ borderColor: colors.lightGreen1Transparent, my: "1.5rem" }}
          />

          {/* Total final */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {textResources.cartPage.totalPrice}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {finalTotal.toFixed(2)} RON
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: colors.lightGreen1Transparent, my: "1.5rem" }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "2rem" }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                backgroundColor: colors.lightGreen2,
                color: colors.darkGreen1,
                padding: "0.8rem 2rem",
                borderRadius: "0.6rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login");
                  return;
                }
                navigate("/checkout");
              }}
            >
              {textResources.cartPage.proceedToCheckout}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
