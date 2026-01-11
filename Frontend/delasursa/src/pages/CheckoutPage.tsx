import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  RadioGroup,
  Radio,
  Stack,
  Container,
  InputAdornment,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

import { colors, textResources, typography } from "../theme";
import PaymentConfirmationModal from "../components/PaymentConfirmationModal";

// --- IMPORTS ---
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  MetodaLivrare,
  MetodaPlata,
  ordersApi,
  type Adresa,
  type CreateComandaRequest,
} from "../api/ordersApi";

// --- INTERFEȚE LOCALE (FORMULAR) ---

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

// --- GENERARE DATE ---
const months = Array.from({ length: 12 }, (_, i) => {
  const m = i + 1;
  return m < 10 ? `0${m}` : `${m}`;
});

const currentYear = new Date().getFullYear() % 100;
const years = Array.from({ length: 15 }, (_, i) =>
  (currentYear + i).toString()
);

// --- STILURI ---
const textFieldStyles = (disabled: boolean = false) => ({
  "& .MuiInput-root": {
    backgroundColor: colors.darkGreen2,
    color: colors.white1,
    borderRadius: "1rem",
    border: `1px solid ${colors.lightGreen1Transparent}`,
    marginTop: "0.5rem",
    padding: "0.75rem 0.75rem",
    opacity: disabled ? 0.7 : 1,
    transition: "border-color 0.2s ease-in-out",
    "&::before, &::after": { display: "none" },
    "&:hover:not(.Mui-focused)": {
      borderColor: disabled
        ? colors.lightGreen1Transparent
        : `${colors.lightGreen1}`,
    },
    "&.Mui-focused": { borderColor: colors.lightGreen1 },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      paddingRight: "24px !important",
    },
    "& .MuiSvgIcon-root": { color: colors.lightGreen1 },
  },
  "& .MuiInputBase-input": {
    ...typography.body1,
    color: colors.white1,
  },
});

const labelStyles = {
  color: colors.white2,
  mb: "0.25rem",
  fontSize: "0.875rem",
  textAlign: "left",
  fontWeight: 500,
};

// --- COMPONENTA CUSTOM TEXT FIELD ---
interface CustomTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startIcon?: React.ReactNode;
  type?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  select?: boolean;
  children?: React.ReactNode;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  startIcon = null,
  type = "text",
  multiline = false,
  rows = 1,
  maxLength,
  select = false,
  children,
}) => (
  <Box>
    <Typography sx={labelStyles}>{label}</Typography>
    <TextField
      fullWidth
      select={select}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={rows}
      variant="standard"
      margin="none"
      inputProps={{ maxLength: maxLength }}
      InputProps={{
        disableUnderline: true,
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              bgcolor: colors.darkGreen2,
              color: colors.white1,
              border: `1px solid ${colors.lightGreen1}`,
              "& .MuiMenuItem-root": {
                "&:hover": { bgcolor: colors.lightGreen1Transparent },
                "&.Mui-selected": {
                  bgcolor: colors.lightGreen1Transparent,
                  "&:hover": { bgcolor: colors.lightGreen1Transparent },
                },
              },
            },
          },
        },
      }}
      sx={textFieldStyles(false)}
    >
      {children}
    </TextField>
  </Box>
);

const CheckoutPage: React.FC = () => {
  const tr = textResources.checkout;
  const navigate = useNavigate();

  // --- CONTEXTE ---
  const { items, clearCart } = useCart();
  const { user } = useContext(AuthContext); // Luăm user-ul curent pentru clientId

  // --- STATE FORMULAR ---
  const [deliveryAddress, setDeliveryAddress] = useState<Adresa>({
    numeComplet: "",
    telefon: "",
    stradaNumeNumar: "",
    localitate: "",
    judet: "",
    codPostal: "",
  });
  const [billingAddress, setBillingAddress] = useState<Adresa | null>(null);
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);

  const [deliveryMethod, setDeliveryMethod] = useState<MetodaLivrare>(
    MetodaLivrare.HOME_DELIVERY
  );
  const [paymentMethod, setPaymentMethod] = useState<MetodaPlata>(
    MetodaPlata.CARD
  );
  const [cardDetails, setCardDetails] = useState<CardData>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [observations, setObservations] = useState("");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- STATE PENTRU TOAST (SNACKBAR) ---
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // --- VERIFICARE COȘ GOL ---
  useEffect(() => {
    // Dacă coșul e gol și NU suntem în procesul de succes (toast activ) și nu încărcăm, redirectăm
    if (items.length === 0 && !snackbarOpen && !loading) {
      navigate("/products");
    }
  }, [items, navigate, snackbarOpen, loading]);

  // --- CALCULE ---
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost =
    deliveryMethod === MetodaLivrare.SELF_PICKUP ? 0 : subtotal > 200 ? 0 : 20;
  const total = subtotal + shippingCost;

  // --- HANDLERS ---
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "delivery" | "billing"
  ) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length > 10) return;
      finalValue = onlyNums;
    }
    if (type === "delivery")
      setDeliveryAddress((prev) => ({ ...prev, [name]: finalValue }));
    else setBillingAddress((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "number") {
      const rawValue = value.replace(/\D/g, "");
      if (rawValue.length > 16) return;
      finalValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }
    if (name === "cvv") {
      const rawValue = value.replace(/\D/g, "");
      if (rawValue.length > 3) return;
      finalValue = rawValue;
    }
    setCardDetails({ ...cardDetails, [name]: finalValue });
  };

  const handleExpiryChange = (type: "month" | "year", value: string) => {
    const parts = cardDetails.expiry.split("/");
    const currentMonth = parts[0] || "";
    const currentYear = parts[1] || "";
    let newExpiry = "";
    if (type === "month") newExpiry = `${value}/${currentYear}`;
    else newExpiry = `${currentMonth}/${value}`;
    setCardDetails({ ...cardDetails, expiry: newExpiry });
  };

  const handleInitiateOrder = () => {
    // Validare simplă
    if (
      deliveryMethod === MetodaLivrare.HOME_DELIVERY &&
      (!deliveryAddress.stradaNumeNumar || !deliveryAddress.telefon)
    ) {
      setSnackbarMessage("Te rugăm să completezi adresa de livrare.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // --- LOGICA DE TRIMITERE COMANDĂ ---
  const handleConfirmOrder = async () => {
    // 1. Verificare Auth: Ne asigurăm că avem un user valid
    if (!user || !user.id) {
      setSnackbarMessage(
        "Trebuie să fii autentificat ca și CLIENT pentru a plasa o comandă."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setIsConfirmModalOpen(false);
      return;
    }

    setIsConfirmModalOpen(false);
    setLoading(true);

    try {
      console.log("Plasare comandă pentru User ID:", user.id);

      // 2. Construim payload-ul pentru Backend
      // Trimitem doar ce acceptă backend-ul acum (clientId, produse)

      const orderPayload: CreateComandaRequest = {
        clientId: Number(user.id),
        comandaProduseList: items.map((item) => ({
          produsId: Number(item.id),
          cantitate: item.quantity,
          pretUnitar: item.price,
        })),
        metodaLivrare: deliveryMethod,
        metodaPlata: paymentMethod,
        adresaFacturare: billingAddress,
        adresaLivrare: deliveryAddress,
        observatii: observations,
      };

      // 3. Apelăm API-ul
      await ordersApi.createOrder(orderPayload);

      // 4. Succes
      setLoading(false);
      setSnackbarMessage(
        "Comanda a fost înregistrată cu succes! Vei fi redirecționat..."
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // 5. Golim coșul
      clearCart();

      // 6. Redirecționare după 5 secunde
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error: any) {
      console.error("Eroare la plasarea comenzii:", error);
      setLoading(false);

      let errorMsg = "A apărut o eroare la salvarea comenzii.";

      // Încercăm să extragem un mesaj mai clar de la server
      if (error.response) {
        if (error.response.status === 404) {
          errorMsg = `Eroare: Contul tău (ID: ${user.id}) nu este găsit în baza de date a clienților.`;
        } else if (
          error.response.data &&
          typeof error.response.data === "string"
        ) {
          errorMsg = `Eroare server: ${error.response.data}`;
        }
      }

      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // --- Helper Render Address ---
  const renderAddressFields = (data: Adresa, type: "delivery" | "billing") => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={tr.fields.fullName}
          name="numeComplet"
          value={data.numeComplet}
          onChange={(e: any) => handleAddressChange(e, type)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={tr.fields.phone}
          name="telefon"
          value={data.telefon}
          onChange={(e: any) => handleAddressChange(e, type)}
          placeholder="07xxxxxxxx"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={tr.fields.street}
          name="stradaNumeNumar"
          value={data.stradaNumeNumar}
          onChange={(e: any) => handleAddressChange(e, type)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={tr.fields.city}
          name="localitate"
          value={data.localitate}
          onChange={(e: any) => handleAddressChange(e, type)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <CustomTextField
          label={tr.fields.county}
          name="judet"
          value={data.judet}
          onChange={(e: any) => handleAddressChange(e, type)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <CustomTextField
          label={tr.fields.zip}
          name="codPostal"
          value={data.codPostal}
          onChange={(e: any) => handleAddressChange(e, type)}
        />
      </Grid>
    </Grid>
  );

  const selectedMonth = cardDetails.expiry.split("/")[0] || "";
  const selectedYear = cardDetails.expiry.split("/")[1] || "";

  return (
    <Container maxWidth="md" sx={{ py: 4, color: colors.white1 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
          color: colors.lightGreen1,
        }}
      >
        {tr.title}
      </Typography>

      <Stack spacing={3}>
        {/* 1. LIVRARE */}
        <Paper
          sx={{
            p: 3,
            bgcolor: colors.darkGreen1,
            border: `1px solid ${colors.lightGreen1Transparent}`,
            borderRadius: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <LocationOnIcon sx={{ color: colors.lightGreen1 }} />
            <Typography variant="h5" color={colors.white1}>
              {tr.sections.delivery}
            </Typography>
          </Box>
          {renderAddressFields(deliveryAddress, "delivery")}
        </Paper>

        {/* 2. METODA LIVRARE */}
        <Paper
          sx={{
            p: 3,
            bgcolor: colors.darkGreen1,
            border: `1px solid ${colors.lightGreen1Transparent}`,
            borderRadius: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocalShippingIcon sx={{ color: colors.lightGreen1 }} />
            <Typography variant="h5" color={colors.white1}>
              {tr.sections.deliveryMethod}
            </Typography>
          </Box>
          <RadioGroup
            row
            value={deliveryMethod}
            onChange={(e) =>
              setDeliveryMethod(Number(e.target.value) as MetodaLivrare)
            }
          >
            <FormControlLabel
              value={MetodaLivrare.HOME_DELIVERY}
              control={
                <Radio
                  sx={{
                    color: colors.lightGreen1,
                    "&.Mui-checked": { color: colors.lightGreen1 },
                  }}
                />
              }
              label={tr.deliveryMethods.courier}
              sx={{ color: colors.white1, mr: 4 }}
            />
            <FormControlLabel
              value={MetodaLivrare.SELF_PICKUP}
              control={
                <Radio
                  sx={{
                    color: colors.lightGreen1,
                    "&.Mui-checked": { color: colors.lightGreen1 },
                  }}
                />
              }
              label={tr.deliveryMethods.pickup}
              sx={{ color: colors.white1 }}
            />
          </RadioGroup>
        </Paper>

        {/* 3. FACTURARE */}
        <Paper
          sx={{
            p: 3,
            bgcolor: colors.darkGreen1,
            border: `1px solid ${colors.lightGreen1Transparent}`,
            borderRadius: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PaymentIcon sx={{ color: colors.lightGreen1 }} />
            <Typography variant="h6" color={colors.white1}>
              {tr.sections.billing}
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={billingSameAsDelivery}
                onChange={(e) => setBillingSameAsDelivery(e.target.checked)}
                sx={{
                  color: colors.lightGreen1,
                  "&.Mui-checked": { color: colors.lightGreen1 },
                }}
              />
            }
            label={tr.fields.sameAsDelivery}
            sx={{ mb: 2, color: colors.white2 }}
          />
          {!billingSameAsDelivery &&
            renderAddressFields(billingAddress, "billing")}
        </Paper>

        {/* 4. PLATA */}
        <Paper
          sx={{
            p: 3,
            bgcolor: colors.darkGreen1,
            border: `1px solid ${colors.lightGreen1Transparent}`,
            borderRadius: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <PaymentIcon sx={{ color: colors.lightGreen1 }} />
            <Typography variant="h5" color={colors.white1}>
              {tr.sections.payment}
            </Typography>
          </Box>

          <RadioGroup
            row
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(Number(e.target.value) as MetodaPlata)
            }
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value={MetodaPlata.CARD}
              control={
                <Radio
                  sx={{
                    color: colors.lightGreen1,
                    "&.Mui-checked": { color: colors.lightGreen1 },
                  }}
                />
              }
              label={tr.paymentMethods.card}
              sx={{ color: colors.white1, mr: 4 }}
            />
            <FormControlLabel
              value={MetodaPlata.RAMBURS}
              control={
                <Radio
                  sx={{
                    color: colors.lightGreen1,
                    "&.Mui-checked": { color: colors.lightGreen1 },
                  }}
                />
              }
              label={tr.paymentMethods.cash}
              sx={{ color: colors.white1 }}
            />
          </RadioGroup>

          {paymentMethod === MetodaPlata.CARD && (
            <Box
              sx={{
                p: 3,
                border: `1px dashed ${colors.lightGreen1}`,
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: colors.lightGreen1,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LockIcon fontSize="small" /> {tr.sections.cardDetails}
              </Typography>
              <Stack spacing={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      label={tr.card.number}
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      placeholder="0000 0000 0000 0000"
                      startIcon={<CreditCardIcon />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      label={tr.card.name}
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <CustomTextField
                      select
                      label="Luna"
                      name="expiryMonth"
                      value={selectedMonth}
                      onChange={(e: any) =>
                        handleExpiryChange("month", e.target.value)
                      }
                    >
                      {months.map((m) => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      select
                      label="An"
                      name="expiryYear"
                      value={selectedYear}
                      onChange={(e: any) =>
                        handleExpiryChange("year", e.target.value)
                      }
                    >
                      {years.map((y) => (
                        <MenuItem key={y} value={y}>
                          {y}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label={tr.card.cvv}
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      type="text"
                      maxLength={3}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          )}

          <CustomTextField
            label={tr.fields.observations}
            name="observations"
            value={observations}
            onChange={(e: any) => setObservations(e.target.value)}
            multiline
            rows={2}
          />
        </Paper>

        {/* 5. SUMAR */}
        <Paper
          sx={{
            p: 4,
            bgcolor: colors.darkGreen2,
            borderTop: `4px solid ${colors.lightGreen1}`,
            textAlign: "center",
            borderRadius: "0 0 1rem 1rem",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            {tr.sections.orderSummary}
          </Typography>
          <Box sx={{ maxWidth: "500px", mx: "auto", mb: 3 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    color={colors.white1}
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.quantity} x {item.title}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {(item.price * item.quantity).toFixed(2)} RON
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.lightGreen1, opacity: 0.8 }}
                  >
                    ({item.price.toFixed(2)} RON / buc)
                  </Typography>
                </Box>
              </Box>
            ))}
            <Divider sx={{ bgcolor: colors.lightGreen1Transparent, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color={colors.white2}>
                {tr.summary.subtotal}
              </Typography>
              <Typography>{subtotal.toFixed(2)} RON</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color={colors.white2}>
                {tr.summary.shipping}
              </Typography>
              <Typography>
                {shippingCost === 0
                  ? "Gratuit"
                  : `${shippingCost.toFixed(2)} RON`}
              </Typography>
            </Box>
            <Divider sx={{ bgcolor: colors.lightGreen1Transparent, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                color={colors.lightGreen1}
                fontWeight="bold"
              >
                {tr.summary.total}
              </Typography>
              <Typography
                variant="h5"
                color={colors.lightGreen1}
                fontWeight="bold"
              >
                {total.toFixed(2)} RON
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={loading || items.length === 0}
            onClick={handleInitiateOrder}
            sx={{
              maxWidth: "500px",
              bgcolor: colors.lightGreen1,
              color: colors.darkGreen2,
              fontWeight: "bold",
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                bgcolor: colors.lightGreen2,
                transform: "scale(1.02)",
              },
              transition: "all 0.2s",
            }}
          >
            {loading ? "Se procesează..." : tr.button}
          </Button>
        </Paper>
      </Stack>

      <PaymentConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmOrder}
        amount={total.toFixed(2)}
      />

      {/* --- TOAST NOTIFICATION --- */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000} // Se închide automat după 5 secunde
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontSize: "1rem", alignItems: "center" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default CheckoutPage;
