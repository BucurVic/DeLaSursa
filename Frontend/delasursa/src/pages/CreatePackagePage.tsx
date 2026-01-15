import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { colors } from "../theme";
import { produseApi } from "../api/produseApi";
import { pacheteApi } from "../api/pacheteApi";
import type { Produs } from "../types/Produs";
import { useNotify } from "../components/NotifyProvider.tsx";

type ProdusSelectat = {
  produs: Produs;
  cantitate: number;
};

export default function CreatePackagePage() {
  const [pachetName, setPachetName] = useState("");
  const [imagine, setImagine] = useState<File | null>(null);
  const [produse, setProduse] = useState<Produs[]>([]);
  const [produseSelectate, setProduseSelectate] = useState<ProdusSelectat[]>(
    [],
  );

  const notify = useNotify();

  useEffect(() => {
    produseApi
      .getAllProducator()
      .then((res) => setProduse(res.data))
      .catch((err) => console.error("Eroare la încărcarea produselor:", err));
  }, []);

  const setCantitate = (produsId: number, cant: number) => {
    setProduseSelectate((prev) => {
      const produsSelectat = prev.find((p) => p.produs.id === produsId);
      if (produsSelectat) {
        if (cant <= 0) {
          return prev.filter((p) => p.produs.id !== produsId);
        }
        return prev.map((p) =>
          p.produs.id === produsId ? { ...p, cantitate: cant } : p,
        );
      } else {
        if (cant > 0) {
          const produs = produse.find((p) => p.id === produsId);
          if (!produs) return prev;
          return [...prev, { produs, cantitate: cant }];
        }
        return prev;
      }
    });
  };

  const totalPrice = produseSelectate.reduce(
    (acc, p) => acc + p.produs.pret * p.cantitate,
    0,
  );

  const handleSavePachet = async () => {
    if (!pachetName || produseSelectate.length === 0) {
      notify("Completează toate câmpurile și adaugă cel puțin un produs.");
      return;
    }

    const payload = {
      nume: pachetName,
      imagine: imagine,
      produse: produseSelectate.map((p) => ({
        idProdus: p.produs.id,
        cantitate: p.cantitate,
        pretUnitar: p.produs.pret,
      })),
    };

    try {
      const response = await pacheteApi.create(payload);
      alert(`Pachet creat cu succes! ID: ${response.data.id}`);
      setPachetName("");
      setImagine(null);
      setProduseSelectate([]);
    } catch (err) {
      console.error("Eroare la crearea pachetului:", err);
      alert("Eroare la crearea pachetului. Vezi consola.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.darkGreen1,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.darkGreen2,
          borderRadius: "0.8rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.25)",
          px: "2rem",
          py: "2.5rem",
        }}
      >
        <Typography variant="h3" sx={{ color: colors.white1, mb: 3 }}>
          Creează un pachet nou
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            label="Nume pachet"
            value={pachetName}
            onChange={(e) => setPachetName(e.target.value)}
            variant="filled"
            sx={{ backgroundColor: colors.darkGreen1, flex: 1 }}
          />
          <Button variant="outlined" component="label">
            Alege imagine
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImagine(e.target.files?.[0] || null)}
            />
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 4, justifyContent: "center" }}>
          {imagine && (
            <Box
              sx={{
                border: `2px solid ${colors.lightGreen1}`,
                borderRadius: "0.5rem",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={URL.createObjectURL(imagine)}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>

        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {produse.map((p) => {
            const selected = produseSelectate.find(
              (ps) => ps.produs.id === p.id,
            );
            const cantitate = selected?.cantitate ?? 0;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={p.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card sx={{ backgroundColor: colors.darkGreen2 }}>
                  {p.produsImagine && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={p.produsImagine}
                      alt={p.produsName}
                    />
                  )}
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{ color: colors.white1, fontWeight: "bold" }}
                    >
                      {p.produsName}
                    </Typography>
                    <Typography sx={{ color: colors.lightGreen1 }}>
                      Preț: {p.pret} RON / {p.unitate_masura}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          setCantitate(p.id, cantitate > 0 ? cantitate - 1 : 0)
                        }
                        sx={{
                          color: colors.white1,
                          border: `1px solid ${colors.lightGreen1}`,
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ color: colors.white1 }}>
                        {cantitate}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setCantitate(p.id, cantitate + 1)}
                        sx={{
                          color: colors.white1,
                          border: `1px solid ${colors.lightGreen1}`,
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>

                      {cantitate > 0 && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => setCantitate(p.id, 0)}
                          sx={{ ml: "auto" }}
                        >
                          Șterge
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: colors.white1, fontWeight: "bold" }}>
            Preț total: {totalPrice.toFixed(2)} RON
          </Typography>
          <Button variant="contained" onClick={handleSavePachet}>
            Salvează pachet
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
