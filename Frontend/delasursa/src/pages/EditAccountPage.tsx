import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Avatar
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const mockUser = {
    name: "Nume Prenume",
    email: "client1@example.com",
    phone: "0722 123 456",
    avatar: undefined
};

const EditAccountPage: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState(mockUser.name);
    const [email, setEmail] = useState(mockUser.email);
    const [phone, setPhone] = useState(mockUser.phone);

    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setAvatar(previewURL);

    };

    return (
        <Box sx={{ mt: 4, px: 2, maxWidth: "600px", mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Editează Datele Contului
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Informații personale</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Avatar
                            src={avatar}
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: "#ddd",
                                fontSize: 40
                            }}
                        >
                            {!avatar && <PersonIcon fontSize="inherit" />}
                        </Avatar>

                        <Button variant="outlined" component="label">
                            Alege poză
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Box>

                    <TextField
                        label="Nume complet"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onClick={() => alert("Modificarile au fost salvate (mock).")}
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
