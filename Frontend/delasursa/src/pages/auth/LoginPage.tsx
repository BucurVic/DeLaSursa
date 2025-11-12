import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { colors } from "../../theme/colors.ts";
import { textResources } from "../../theme/textResources.ts";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake"; // Ca placeholder pentru logo
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import logoSrc from '../../assets/logo.png'; 


const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { login, authenticationError, isAuthenticated, isAuthenticating } =
    useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("test");
    e.preventDefault();
    if (!login) return;
    await login({email, password });
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.darkGreen1,
        color: colors.white1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        fontFamily: '"Manrope", sans-serif',
        overflow: "auto",
      }}
    >
      {/* Card */}
      <Card
        sx={{
          position: "relative",
          backgroundColor: colors.darkGreen2,
          borderRadius: "1.25rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: 420,
          p: 3,
          textAlign: "center",
        }}
      >
        {/* {onBack && (
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              backgroundColor: colors.darkGreen1,
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: colors.lightGreen1Transparent,
              },
            }}
            onClick={onBack}
          >
            <ArrowBackIcon
              sx={{
                color: colors.white1,
                fontSize: "1.6rem",
              }}
            />
          </Box>
        )} */}
        {/* Logo */}
        <Box
          component="img"
          src={logoSrc}
          alt="Logo"
          sx={{
            height: "70px", // Poți ajusta această înălțime
            width: "auto",   // Lățimea se va scala automat
            mb: 1.5,         // Adaugă o margine dedesubt, înainte de titlu
          }}
        />
        {/* Title */}
        <Typography
          sx={{
            color: colors.white1,
            fontWeight: 800,
            fontSize: "2.25rem",
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {textResources.loginPage.title}
        </Typography>
        {/* Subtitle */}
        <Typography variant="body2" sx={{ mb: 4, color: colors.white2 }}>
          {textResources.loginPage.noAccount}{" "}
          <Link
            href="/inregistrare"
            underline="always"
            sx={{
              color: colors.lightGreen2,
              fontWeight: 600,
              textDecorationColor: colors.lightGreen2,
              textUnderlineOffset: "2px",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#42a5f5",
                textDecorationColor: "#42a5f5",
              },
            }}
          >
            {textResources.loginPage.registerLink}
          </Link>
        </Typography>
        {/* Form */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            px: 2,
            pt: 0,
            textAlign: "left",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.white1,
                  fontWeight: 600,
                  mb: 0.8,
                  fontSize: "0.9rem",
                }}
              >
                {textResources.loginPage.emailLabel}
              </Typography>
              <TextField
                fullWidth
                placeholder={textResources.loginPage.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    color: colors.white1,
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    "& .MuiOutlinedInput-input": {
                      py: 1.5,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1Transparent,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1,
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: colors.white2,
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.white1,
                  fontWeight: 600,
                  mb: 0.8,
                  fontSize: "0.9rem",
                }}
              >
                {textResources.loginPage.passwordLabel}
              </Typography>
              <TextField
                fullWidth
                placeholder={textResources.loginPage.passwordPlaceholder}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    color: colors.white1,
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    "& .MuiOutlinedInput-input": {
                      py: 1.5,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1Transparent,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.lightGreen1,
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: colors.white2,
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>

            {/* Remember + Forgot */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1.25,
                mb: 2.25,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    sx={{
                      color: colors.lightGreen1Transparent,
                      "&.Mui-checked": { color: colors.lightGreen1 },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: colors.white1 }}>
                    {textResources.loginPage.rememberMe}
                  </Typography>
                }
              />

              <Link
                href="/resetare-parola"
                underline="always"
                sx={{
                  color: colors.lightGreen2,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecorationColor: colors.lightGreen2,
                  textUnderlineOffset: "2px",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#42a5f5",
                    textDecorationColor: "#42a5f5",
                  },
                }}
              >
                {textResources.loginPage.forgotPassword}
              </Link>
            </Box>

            {/* Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: colors.lightGreen1,
                color: colors.darkGreen2,
                fontWeight: 800,
                letterSpacing: "0.02em",
                borderRadius: "1rem",
                py: 1.6,
                boxShadow: "0 6px 0 rgba(0,0,0,0.25)",
                "&:hover": { backgroundColor: colors.lightGreen2 },
              }}
            >
              {textResources.loginPage.submitButton.toUpperCase()}
            </Button>
          </form>
        </CardContent>
      </Card>
      {authenticationError && (
        <Typography>{authenticationError.message}</Typography>
      )}
      {isAuthenticating && <LoadingSpinner />}
    </Box>
  );
};

export default LoginPage;
