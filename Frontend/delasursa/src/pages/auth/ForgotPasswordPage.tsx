import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../../theme/colors.ts";
import { textResources } from "../../theme/textResources.ts";
import HandshakeIcon from "@mui/icons-material/Handshake"; // Ca placeholder pentru logo

interface ForgotPasswordPageProps {
  onBack?: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const response = await fetch(
        "http://localhost:8080/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send reset email.");
      }

      setStatus("success");
      setMessage(
        "An email has been sent to your address with reset instructions."
      );
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: colors.darkGreen1,
        color: colors.white1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        fontFamily: '"Manrope", sans-serif',
      }}
    >
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
        {onBack && (
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
              "&:hover": { backgroundColor: colors.lightGreen1Transparent },
            }}
            onClick={onBack}
          >
            <ArrowBackIcon sx={{ color: colors.white1, fontSize: "1.6rem" }} />
          </Box>
        )}

        {/* Logo */}
        <Box sx={{ mt: 4, mb: 3 }}>
          <HandshakeIcon sx={{ fontSize: 50, color: "#5FEE95" }} />
        </Box>

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
          {textResources.forgotPasswordPage.title}
        </Typography>

        {/* Subtitle */}
        <Typography variant="body2" sx={{ mb: 4, color: colors.white2 }}>
          {textResources.forgotPasswordPage.rememberPassword}{" "}
          <Link
            href="/login"
            underline="always"
            sx={{
              color: colors.lightGreen2,
              fontWeight: 600,
              textDecorationColor: colors.lightGreen2,
              textUnderlineOffset: "2px",
              transition: "color 0.2s ease",
              "&:hover": { color: "#42a5f5", textDecorationColor: "#42a5f5" },
            }}
          >
            {textResources.forgotPasswordPage.loginLink}
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
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.white1,
                  fontWeight: 600,
                  mb: 0.8,
                  fontSize: "0.9rem",
                }}
              >
                {textResources.forgotPasswordPage.emailLabel}
              </Typography>
              <TextField
                fullWidth
                placeholder={textResources.forgotPasswordPage.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    color: colors.white1,
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    "& .MuiOutlinedInput-input": { py: 1.5 },
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

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={status === "loading"}
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
              {status === "loading"
                ? "SENDING..."
                : textResources.forgotPasswordPage.submitButton.toUpperCase()}
            </Button>
          </form>

          {/* Message */}
          {message && (
            <Typography
              sx={{
                mt: 2,
                color: status === "success" ? colors.lightGreen2 : "#f44336",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPasswordPage;
