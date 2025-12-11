import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Avatar,
    Alert,
    CircularProgress
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importăm contextul

const EditAccountPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Folosim token-ul direct din context, e mai sigur decât localStorage manual
    const { token } = useContext(AuthContext);

    // Stări pentru date
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Stări pentru UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    // 1. Încărcăm datele utilizatorului
    useEffect(() => {
        const fetchUserData = async () => {
            // Dacă nu avem token în context, nu facem nimic (ProtectedRoute ne va scoate oricum)
            if (!token) return;

            try {
                const response = await fetch("http://localhost:8080/api/account/client", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Eroare la încărcarea datelor.");
                }

                const data = await response.json();
                
                // Populăm câmpurile
                setNume(data.nume || "");
                setPrenume(data.prenume || "");
                setEmail(data.email || "");
                setPhone(data.telefon || "");
                
            } catch (err) {
                console.error(err);
                setError("Nu am putut încărca datele profilului.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    // Gestionare upload poză (Vizual momentan)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const previewURL = URL.createObjectURL(file);
        setAvatar(previewURL);
    };

    // 2. Funcția de Salvare (PUT)
    const handleSave = async () => {
        setError(null);
        setSuccessMsg(null);

        try {
            const payload = {
                nume: nume,
                prenume: prenume,
                email: email,
                telefon: phone
            };

            const response = await fetch("http://localhost:8080/api/account/client", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Eroare la actualizare.");
            }

            setSuccessMsg("Datele au fost actualizate cu succes!");

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Eroare la actualizarea datelor.");
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ mt: 4, px: 2, maxWidth: "600px", mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Editează Datele Contului
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Informații personale</Typography>
                    <Divider sx={{ mb: 2 }} />

                    {/* Secțiunea Avatar */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Avatar
                            src={avatar}
                            sx={{ width: 80, height: 80, bgcolor: "#ddd", fontSize: 40 }}
                        >
                            {!avatar && <PersonIcon fontSize="inherit" />}
                        </Avatar>

                        <Button variant="outlined" component="label">
                            Alege poză
                            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                        </Button>
                    </Box>

                    {/* Câmpurile Nume și Prenume */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            label="Nume"
                            fullWidth
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                        />
                        <TextField
                            label="Prenume"
                            fullWidth
                            value={prenume}
                            onChange={(e) => setPrenume(e.target.value)}
                        />
                    </Box>

                    <TextField
                        label="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText="Atenție: Modificarea email-ului va schimba datele de autentificare."
                    />

                    <TextField
                        label="Telefon"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSave}
                    >
                        Salvează modificările
                    </Button>

                    <Button
                        variant="text"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate(-1)}
                    >
                        Înapoi
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditAccountPage;