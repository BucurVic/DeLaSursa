import React, { useContext, useEffect } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthApi } from "../../api/authApi";
import logoSrc from "../../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const confirmationPasswordApi = AuthApi.confirmationPassword;

function ResetPasswordPage() {
  const { passwordToken } = useParams();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMismatch(value !== confirmPassword && confirmPassword !== "");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMismatch(value !== password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const textFieldStyles = {
    "& .MuiInput-root": {
      backgroundColor: "#13271E",
      color: "#F2F2F2",
      padding: "8px 12px",
      borderRadius: "8px",
      border: "2px solid rgba(95, 238, 149, 0.3)",
      marginTop: "8px",
      transition: "border-color 0.2s ease-in-out",

      "&::before, &::after": {
        display: "none",
      },
      "&:hover:not(.Mui-focused)": {
        borderColor: "#5FEE95 !important",
      },
      "&.Mui-focused": {
        borderColor: "#5FEE95",
      },
    },
    "& .MuiInputBase-input": {
      padding: 0,
      "&::placeholder": {
        color: "#BEBEBE",
        opacity: 0.7,
      },
    },
  };

  const labelStyles = {
    color: "#BEBEBE",
    mb: 0,
    fontSize: "0.875rem",
    textAlign: "left",
  };

  async function handleClick(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (passwordToken && confirmPassword) {
      try {
        const response = await confirmationPasswordApi({
          token: passwordToken,
          password: confirmPassword,
        });
        setMessage(response.data);
        setIsError(false);
        setPassword("");
        setConfirmPassword("");
      } catch (error: any) {
        setMessage(error.response?.data || "An error occurred");
        setIsError(true);
      }
    }
  }

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
      <Box
        sx={{
          bgcolor: "#13271E",
          p: { xs: 3, md: 4 },
          pt: 6,
          pb: 6,
          borderRadius: "12px",
          boxShadow: 24,
          maxWidth: "420px",
          width: "100%",
          color: "#F2F2F2",
          position: "relative",
        }}
      >
        <IconButton
          sx={{ color: "#F2F2F2", position: "absolute", top: 24, left: 24 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            component="img"
            src={logoSrc}
            alt="DeLaSursa Logo"
            sx={{ width: 50, height: 50 }}
          />

          <Typography
            component="h1"
            sx={{ fontSize: "2.25rem", fontWeight: 800, mt: 2 }}
          >
            Resetează parola
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Parolă nouă</Typography>
            <TextField
              fullWidth
              required
              id="parola-noua"
              type="password"
              placeholder="Introdu parola nouă"
              variant="standard"
              margin="none"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Confirmare parolă nouă</Typography>
            <TextField
              fullWidth
              required
              id="confirmare-parola-noua"
              type="password"
              placeholder="Confirmă parola nouă"
              variant="standard"
              margin="none"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{ disableUnderline: true }}
              sx={textFieldStyles}
            />
            {passwordMismatch && (
              <Typography
                sx={{
                  color: "#FF6B6B",
                  fontSize: "0.875rem",
                  mt: 1,
                  fontWeight: 500,
                }}
              >
                Parolele nu se potrivesc
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            onClick={handleClick}
            variant="contained"
            disabled={passwordMismatch || !password || !confirmPassword}
            sx={{
              backgroundColor: "#5FEE95",
              color: "#0C1A14",
              fontWeight: "bold",
              fontSize: "1rem",
              py: "12px",
              mt: 4,
              borderRadius: "8px",
              "&:hover:not(:disabled)": {
                backgroundColor: "#4ADE80",
              },
              "&:disabled": {
                backgroundColor: "#999999",
                color: "#666666",
                cursor: "not-allowed",
              },
            }}
          >
            RESETARE
          </Button>
          {message && (
            <Typography
              sx={{
                mt: 2,
                color: isError ? "#FF6B6B" : "#5FEE95",
                fontWeight: 600,
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;
