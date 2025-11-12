import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { colors } from "../../theme/colors";
import { useSearchParams, useNavigate } from "react-router-dom";

const EmailConfirmationPage: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (token) {
      fetch(`http://localhost:8080/api/verify-email?token=${token}`)
        .then(async (res) => {
          if (!res.ok) {
            const errMsg = await res.text();
            throw new Error(errMsg || "Verification failed");
          }

          setStatus("success");
          setMessage("Email verified successfully!");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message || "An error occurred during verification.");
        });
    } else {
      setStatus("error");
      setMessage("No verification token provided.");
    }
  }, [token]);
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
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: colors.white1,
              fontWeight: 800,
              mb: 2,
            }}
          >
            {status === "loading"
              ? "Verifying..."
              : status === "success"
              ? "Email Verified!"
              : "Verification Failed"}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: colors.white2 }}>
            {message}
          </Typography>

          <Button
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
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmailConfirmationPage;
