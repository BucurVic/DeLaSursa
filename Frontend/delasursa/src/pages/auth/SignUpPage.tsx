import React, { useContext, useEffect, useState } from "react";

// Importuri MUI
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  Typography,
} from "@mui/material";

// Importuri Iconițe MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HandshakeIcon from "@mui/icons-material/Handshake"; // Ca placeholder pentru logo
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

// Componenta principală a paginii de înregistrare
function SignUpPage() {
  // --- STILURI MODIFICATE CONFORM ULTIMEI CERINȚE ---
  const textFieldStyles = {
    // Țintim rădăcina input-ului "standard"
    "& .MuiInput-root": {
      // 1. FUNDALUL ESTE CULOAREA CARDULUI
      backgroundColor: "#13271E", // darkGreen1
      color: "#F2F2F2",
      padding: "8px 12px",
      borderRadius: "8px",
      // 2. BORDURA STANDARD ESTE ACUM VERDE TRANSPARENT
      border: "2px solid rgba(95, 238, 149, 0.3)", // lightGreen1Transparent
      marginTop: "8px",
      transition: "border-color 0.2s ease-in-out", // Adăugăm o tranziție

      // Ascundem linia de jos specifică "standard"
      "&::before, &::after": {
        display: "none",
      },

      // 3. LA HOVER/FOCUS, FOLOSIM VERDELE SOLID
      "&:hover:not(.Mui-focused)": {
        borderColor: "#5FEE95 !important", // lightGreen1
      },
      "&.Mui-focused": {
        borderColor: "#5FEE95", // lightGreen1
      },
    },
    // Țintim elementul <input> din interior
    "& .MuiInputBase-input": {
      padding: 0,
      "&::placeholder": {
        color: "#BEBEBE",
        opacity: 0.7,
      },
    },
  };

  // 4. ETICHETA DEASUPRA, LA STÂNGA
  const labelStyles = {
    color: "#BEBEBE",
    mb: 0,
    fontSize: "0.875rem",
    textAlign: "left",
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { register, authenticationError, isRegistering, isAuthenticated } =
    useContext(AuthContext);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    console.log("Buton appasat");
    if (confirmedPassword !== password) {
      setErrorMessage("Parolele trebuie sa coincida!");
      return;
    }

    if (!register) return;

    await register({ username, email, password });
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Cardul de înregistrare */}
      <Box
        sx={{
          bgcolor: "#13271E", // darkGreen1
          p: { xs: 3, md: 4 },
          borderRadius: "12px",
          boxShadow: 24,
          maxWidth: "600px", // Lățimea setată la 600px
          width: "100%",
          color: "#F2F2F2", // white1
          position: "relative",
        }}
      >
        {/* Butonul de întoarcere (Back) */}
        <IconButton
          sx={{ color: "#F2F2F2", position: "absolute", top: 24, left: 24 }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Secțiunea de antet (Logo, Titlu, Subtitlu) */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* Logo */}
          <HandshakeIcon sx={{ fontSize: 50, color: "#5FEE95" }} />

          <Typography
            component="h1"
            sx={{ fontSize: "2.25rem", fontWeight: 800, mt: 2 }}
          >
            Înregistrare
          </Typography>
          <Typography sx={{ color: "#BEBEBE", mt: 1 }}>
            Ai deja cont?{" "}
            <Link href="/login" sx={{ color: "#4ADE80", fontWeight: "bold" }}>
              Autentifică-te!
            </Link>
          </Typography>
        </Box>

        {/* Formularul */}
        <Box component="form" noValidate autoComplete="off">
          {/* Grid pentru câmpurile de input */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: "16px 24px", // Spațiere între rânduri și coloane
            }}
          >
            {/* --- Câmp: Nume complet --- */}
            <Box>
              <Typography sx={labelStyles}>Nume complet</Typography>
              <TextField
                fullWidth
                required
                id="nume-complet"
                placeholder="Introdu numele"
                variant="standard"
                margin="none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>

            {/* --- Câmp: Email --- */}
            <Box>
              <Typography sx={labelStyles}>Email</Typography>
              <TextField
                fullWidth
                required
                id="email"
                type="email"
                placeholder="Introdu email-ul"
                variant="standard"
                margin="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>

            {/* --- Câmp: Parolă --- */}
            <Box>
              <Typography sx={labelStyles}>Parolă</Typography>
              <TextField
                fullWidth
                required
                id="parola"
                type="password"
                placeholder="Introdu parola"
                variant="standard"
                margin="none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>

            {/* --- Câmp: Confirmare parolă --- */}
            <Box>
              <Typography sx={labelStyles}>Confirmare parolă</Typography>
              <TextField
                fullWidth
                required
                id="confirmare-parola"
                type="password"
                placeholder="Confirmă parola"
                variant="standard"
                margin="none"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          {/* Checkbox: Termeni și condiții */}
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "#BEBEBE",
                  "&.Mui-checked": {
                    color: "#5FEE95",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: "#BEBEBE" }}>
                Sunt de acord cu{" "}
                <Link href="/termeni" sx={{ color: "#4ADE80" }}>
                  termenii și condițiile
                </Link>
              </Typography>
            }
            sx={{ mt: 2, display: "flex", alignItems: "center" }}
          />

          {(authenticationError || errorMessage) && (
            <Typography>
              {authenticationError?.message ?? errorMessage}
            </Typography>
          )}
          {/* Butonul de înregistrare */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#5FEE95",
              color: "#0C1A14",
              fontWeight: "bold",
              fontSize: "1rem",
              py: "12px",
              mt: 3,
              "&:hover": {
                backgroundColor: "#4ADE80",
              },
            }}
            onClick={handleRegister}
          >
            Înregistrare
          </Button>
        </Box>
      </Box>
      {isRegistering && <LoadingSpinner />}
    </Box>
  );
}

export default SignUpPage;
